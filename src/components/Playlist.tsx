import { useState, useMemo } from 'react';
import { useMusic } from '@/i18n/MusicContext';
import { useLang } from '@/i18n/LanguageContext';
import { tracks as allTracks, playlistGenres, type Track } from '@/data/playlist';
import { Play, Pause, Music, ExternalLink, Heart } from 'lucide-react';

type FilterType = 'ALL' | 'FAVORITES' | 'RECENT' | 'GENRE';

export default function Playlist() {
  const { currentTrack, currentIndex, selectTrack, playState, toggle, play } = useMusic();
  const { t, rtl } = useLang();
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [genre, setGenre] = useState('ALL');

  const filteredTracks = useMemo(() => {
    let result = [...allTracks];
    if (filter === 'FAVORITES') {
      result = result.filter((tr) => tr.isFavorite);
    } else if (filter === 'RECENT') {
      result = result.sort((a, b) => b.addedAt - a.addedAt);
    } else if (filter === 'GENRE' && genre !== 'ALL') {
      result = result.filter((tr) => tr.genre === genre);
    }
    return result;
  }, [filter, genre]);

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'ALL', label: t.playlist.all },
    { key: 'FAVORITES', label: t.playlist.favorites },
    { key: 'RECENT', label: t.playlist.recent },
    { key: 'GENRE', label: t.playlist.genre },
  ];

  const handleTrackClick = (track: Track) => {
    const idx = allTracks.findIndex((tr) => tr.id === track.id);
    if (idx === currentIndex) {
      toggle();
    } else {
      selectTrack(idx);
    }
  };

  const isCurrentTrack = (track: Track) => track.id === currentTrack?.id;
  const isThisPlaying = (track: Track) => isCurrentTrack(track) && playState === 'playing';

  return (
    <section id="playlist" className="relative px-4 sm:px-6 py-20 sm:py-28" aria-label={t.playlist.title}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-cyber-accent font-mono text-sm">[04]</span>
          <h2 className="section-label">{t.playlist.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Now Playing panel */}
          <div className="glass-panel p-6 animate-fade-in">
            <div className="font-mono text-xs text-cyber-text-dim mb-4 tracking-widest">
              ♪ {t.playlist.nowPlaying}
            </div>

            {currentTrack ? (
              <div>
                {/* Cover art or placeholder */}
                <div className="w-full aspect-square max-w-[200px] mx-auto mb-4 border border-cyber-border flex items-center justify-center bg-cyber-panel/50">
                  {currentTrack.cover ? (
                    <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Music className="w-12 h-12 text-cyber-accent-dim" />
                  )}
                </div>

                <div className="text-center mb-3">
                  <div className="font-display font-semibold text-sm text-cyber-text truncate">
                    {currentTrack.title}
                  </div>
                  <div className="font-mono text-xs text-cyber-text-dim truncate">
                    {currentTrack.artist}
                  </div>
                  {currentTrack.album && (
                    <div className="font-mono text-[10px] text-cyber-text-dim truncate mt-0.5">
                      {currentTrack.album}
                    </div>
                  )}
                </div>

                {/* Play indicator */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <button
                    onClick={toggle}
                    className="btn-cyber flex items-center gap-2"
                    aria-label={playState === 'playing' ? t.controls.pause : t.controls.play}
                  >
                    {playState === 'playing' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {playState === 'playing' ? t.controls.pause : t.controls.play}
                  </button>
                </div>

                {/* Ambient synth note */}
                <div className="text-center font-mono text-[10px] text-cyber-text-dim">
                  ♫ Ambient synthesis — no audio file needed
                </div>

                {/* External links */}
                {currentTrack.links && currentTrack.links.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-cyber-border flex flex-wrap justify-center gap-2">
                    {currentTrack.links.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 border border-cyber-border text-cyber-accent-dim hover:text-cyber-accent hover:border-cyber-accent transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 font-mono text-xs text-cyber-text-dim">
                {t.playlist.noTracks}
              </div>
            )}
          </div>

          {/* Track list */}
          <div className="lg:col-span-2 glass-panel p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-cyber-border">
              {filterButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setFilter(btn.key)}
                  className={`px-2.5 py-1 text-[10px] font-mono tracking-widest border transition-all ${
                    filter === btn.key
                      ? 'border-cyber-accent text-cyber-accent bg-cyber-accent/5'
                      : 'border-cyber-border text-cyber-text-dim hover:text-cyber-accent-dim'
                  }`}
                  aria-pressed={filter === btn.key}
                >
                  {btn.label}
                </button>
              ))}

              {filter === 'GENRE' && (
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="px-2 py-1 text-[10px] font-mono border border-cyber-border bg-cyber-panel text-cyber-text focus:border-cyber-accent outline-none"
                  aria-label={t.playlist.genre}
                >
                  {playlistGenres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Track list */}
            <ul className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredTracks.length === 0 ? (
                <li className="text-center py-8 font-mono text-xs text-cyber-text-dim">
                  {t.playlist.noTracks}
                </li>
              ) : (
                filteredTracks.map((track) => {
                  const playing = isThisPlaying(track);
                  const isCurrent = isCurrentTrack(track);
                  return (
                    <li
                      key={track.id}
                      className={`flex items-center gap-3 p-2.5 border transition-all cursor-pointer group ${
                        isCurrent
                          ? 'border-cyber-accent/40 bg-cyber-accent/5'
                          : 'border-transparent hover:border-cyber-border hover:bg-cyber-panel/50'
                      }`}
                      onClick={() => handleTrackClick(track)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleTrackClick(track);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${t.controls.play}: ${track.title} — ${track.artist}`}
                    >
                      {/* Play/Pause icon */}
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-cyber-border text-cyber-accent group-hover:border-cyber-accent transition-all flex-shrink-0"
                        aria-label={playing ? t.controls.pause : t.controls.play}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackClick(track);
                        }}
                      >
                        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>

                      {/* Track info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-sm truncate ${isCurrent ? 'text-cyber-accent' : 'text-cyber-text'}`}>
                            {track.title}
                          </span>
                          {track.isFavorite && (
                            <Heart className="w-3 h-3 text-cyber-red flex-shrink-0" fill="currentColor" />
                          )}
                          {playing && (
                            <span className="flex items-end gap-0.5 flex-shrink-0">
                              <span className="w-0.5 h-2 bg-cyber-accent animate-pulse" />
                              <span className="w-0.5 h-3 bg-cyber-accent animate-pulse" style={{ animationDelay: '0.15s' }} />
                              <span className="w-0.5 h-1.5 bg-cyber-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-cyber-text-dim truncate">
                          {track.artist}
                          {track.album ? ` — ${track.album}` : ''}
                        </div>
                      </div>

                      {/* Genre tag */}
                      <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 border border-cyber-border text-cyber-text-dim flex-shrink-0">
                        {track.genre}
                      </span>

                      {/* External links */}
                      {track.links && track.links.length > 0 && (
                        <div className="hidden sm:flex gap-1 flex-shrink-0">
                          {track.links.map((link) => (
                            <a
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[9px] font-mono px-1.5 py-0.5 border border-cyber-border text-cyber-accent-dim hover:text-cyber-accent hover:border-cyber-accent transition-all"
                            >
                              {link.platform}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Placeholder tag */}
                      {track.isPlaceholder && (
                        <span className="text-[9px] font-mono text-cyber-amber flex-shrink-0">
                          {t.playlist.placeholder}
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>

            {/* Hint */}
            <p className={`mt-4 pt-3 border-t border-cyber-border font-mono text-[10px] text-cyber-text-dim ${rtl ? 'text-right' : 'text-left'}`}>
              // {t.playlist.addTracksHere}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

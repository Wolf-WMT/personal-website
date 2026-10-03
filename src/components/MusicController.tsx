import { useMusic } from '@/i18n/MusicContext';
import { useLang } from '@/i18n/LanguageContext';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music as MusicIcon } from 'lucide-react';
import { useState } from 'react';

export default function MusicController() {
  const { playState, toggle, toggleMute, muted, volume, setVolume, next, prev, currentTrack, enabled } = useMusic();
  const { t } = useLang();
  const [showVolume, setShowVolume] = useState(false);

  const isPlaying = playState === 'playing';

  return (
    <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
      {/* Music toggle indicator */}
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 px-2 py-1 border border-cyber-border hover:border-cyber-accent transition-all text-cyber-text-dim hover:text-cyber-accent"
        aria-label={isPlaying ? t.controls.pause : t.controls.play}
        title={isPlaying ? t.controls.pause : t.controls.play}
      >
        <MusicIcon className="w-3.5 h-3.5" />
        <span className={`hidden sm:inline ${isPlaying ? 'text-cyber-green' : ''}`}>
          {isPlaying ? t.controls.musicOn : t.controls.musicOff}
        </span>
      </button>

      {/* Expanded controls - only show when enabled or playing */}
      {(enabled || isPlaying) && (
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="p-1 text-cyber-text-dim hover:text-cyber-accent transition-colors"
            aria-label={t.controls.prev}
            title={t.controls.prev}
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggle}
            className="p-1 text-cyber-accent hover:glow-text transition-all"
            aria-label={isPlaying ? t.controls.pause : t.controls.play}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={next}
            className="p-1 text-cyber-text-dim hover:text-cyber-accent transition-colors"
            aria-label={t.controls.next}
            title={t.controls.next}
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Mute + Volume */}
          <div
            className="flex items-center gap-1"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            <button
              onClick={toggleMute}
              className="p-1 text-cyber-text-dim hover:text-cyber-accent transition-colors"
              aria-label={muted ? t.controls.unmute : t.controls.mute}
              title={muted ? t.controls.unmute : t.controls.mute}
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {showVolume && (
              <div className="absolute top-full mt-1 right-0 bg-cyber-panel border border-cyber-border p-2 z-[10001]">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 accent-cyber-accent"
                  aria-label={t.controls.volume}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Track name on larger screens */}
      {currentTrack && isPlaying && (
        <span className="hidden lg:inline text-[10px] text-cyber-text-dim max-w-[120px] truncate">
          ♫ {currentTrack.title}
        </span>
      )}
    </div>
  );
}

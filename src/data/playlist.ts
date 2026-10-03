export interface ExternalLink {
  platform: 'YouTube' | 'Spotify' | 'SoundCloud' | 'AppleMusic';
  url: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre: string;
  audio?: string;
  cover?: string;
  isPlaceholder: boolean;
  isFavorite: boolean;
  addedAt: number;
  links?: ExternalLink[];
}

export const playlistGenres = ['ALL', 'Ambient', 'Synthwave', 'Darkwave', 'Darksynth', 'Cyberpunk'];

// ═══ EDIT YOUR PLAYLIST HERE ═══
// Replace placeholder tracks with your real favorite songs.
// For each track you can add:
//   - title, artist, album, genre
//   - audio: path to an audio file (e.g. "/music/track.mp3")
//   - cover: path to cover art (e.g. "/music/cover.jpg")
//   - links: external links to YouTube, Spotify, SoundCloud, Apple Music
//   - isFavorite: mark as a favorite
// Set isPlaceholder to false once you add a real song.
export const tracks: Track[] = [
  {
    id: 't01',
    title: '[Track Name]',
    artist: '[Artist Name]',
    album: '[Album Name]',
    genre: 'Ambient',
    isPlaceholder: true,
    isFavorite: false,
    addedAt: Date.now() - 50000,
  },
  {
    id: 't02',
    title: '[Track Name]',
    artist: '[Artist Name]',
    album: '[Album Name]',
    genre: 'Synthwave',
    isPlaceholder: true,
    isFavorite: false,
    addedAt: Date.now() - 40000,
  },
  {
    id: 't03',
    title: '[Track Name]',
    artist: '[Artist Name]',
    album: '[Album Name]',
    genre: 'Darkwave',
    isPlaceholder: true,
    isFavorite: false,
    addedAt: Date.now() - 30000,
  },
  {
    id: 't04',
    title: '[Track Name]',
    artist: '[Artist Name]',
    album: '[Album Name]',
    genre: 'Darksynth',
    isPlaceholder: true,
    isFavorite: false,
    addedAt: Date.now() - 20000,
  },
];

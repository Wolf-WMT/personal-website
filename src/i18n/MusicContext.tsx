import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { tracks as defaultTracks, type Track } from '@/data/playlist';

type PlayState = 'stopped' | 'playing' | 'paused';

interface MusicContextValue {
  tracks: Track[];
  currentTrack: Track | null;
  currentIndex: number;
  playState: PlayState;
  volume: number;
  muted: boolean;
  enabled: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  selectTrack: (index: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  enable: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

// Ambient synth presets — each generates a distinct atmospheric tone using oscillators
interface Preset {
  freqs: number[];
  type: OscillatorType;
  lfoFreq: number;
  filterFreq: number;
}

const PRESETS: Preset[] = [
  { freqs: [55, 82.5, 110], type: 'sine', lfoFreq: 0.08, filterFreq: 400 },
  { freqs: [73.42, 110, 146.83], type: 'triangle', lfoFreq: 0.12, filterFreq: 600 },
  { freqs: [65.41, 98, 130.81], type: 'sine', lfoFreq: 0.05, filterFreq: 350 },
  { freqs: [49, 73.42, 98], type: 'sawtooth', lfoFreq: 0.15, filterFreq: 200 },
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const tracks = defaultTracks;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playState, setPlayState] = useState<PlayState>('stopped');
  const [volume, setVolumeState] = useState(0.3);
  const [muted, setMuted] = useState(false);

  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('music-enabled') === 'true';
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Real MP3 audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentIndex] ?? null;

  const cleanupNodes = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });

    oscillatorsRef.current = [];

    if (lfoRef.current) {
      try {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
      } catch {
        // Already stopped
      }

      lfoRef.current = null;
    }

    if (lfoGainRef.current) {
      try {
        lfoGainRef.current.disconnect();
      } catch {
        // Already disconnected
      }

      lfoGainRef.current = null;
    }
  }, []);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return audioCtxRef.current;

    const Ctx =
      window.AudioContext ||
      (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;

    const ctx = new Ctx();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = muted ? 0 : volume;
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = PRESETS[0].filterFreq;
    filter.connect(masterGain);
    filterRef.current = filter;

    return ctx;
  }, [muted, volume]);

  const startSynth = useCallback(
    (presetIndex: number) => {
      const ctx = initAudio();

      if (!ctx || !filterRef.current || !masterGainRef.current) return;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      cleanupNodes();

      const preset = PRESETS[presetIndex % PRESETS.length];

      const lfo = ctx.createOscillator();
      lfo.frequency.value = preset.lfoFreq;

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 30;

      lfo.connect(lfoGain);

      lfoRef.current = lfo;
      lfoGainRef.current = lfoGain;

      lfoGain.connect(filterRef.current.frequency);

      preset.freqs.forEach((freq) => {
        const osc = ctx.createOscillator();

        osc.type = preset.type;
        osc.frequency.value = freq;

        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.15 / preset.freqs.length;

        osc.connect(oscGain);
        oscGain.connect(filterRef.current!);

        osc.start();

        oscillatorsRef.current.push(osc);
      });

      lfo.start();
    },
    [cleanupNodes, initAudio]
  );

  const stopSynth = useCallback(() => {
    cleanupNodes();
  }, [cleanupNodes]);

  // Stop real MP3 audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Play a real audio file
  const playAudio = useCallback(
    (trackIndex: number) => {
      const track = tracks[trackIndex];

      if (!track?.audio) {
        startSynth(trackIndex);
        return;
      }

      // Stop synth if it was playing
      stopSynth();

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;

      audio.pause();
      audio.src = track.audio;
      audio.currentTime = 0;
      audio.volume = muted ? 0 : volume;

      audio.onended = () => {
        setPlayState('stopped');
      };

      audio.onerror = () => {
        console.error('Could not load audio:', track.audio);
        setPlayState('stopped');
      };

      audio
        .play()
        .then(() => {
          setPlayState('playing');
        })
        .catch((error) => {
          console.error('Audio playback failed:', error);
          setPlayState('paused');
        });
    },
    [tracks, muted, volume, startSynth, stopSynth]
  );

  const updateVolume = useCallback(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        muted ? 0 : volume,
        audioCtxRef.current.currentTime,
        0.1
      );
    }

    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [muted, volume]);

  const play = useCallback(() => {
    setEnabled(true);
    localStorage.setItem('music-enabled', 'true');

    const track = tracks[currentIndex];

    if (track?.audio) {
      playAudio(currentIndex);
    } else {
      startSynth(currentIndex);
      setPlayState('playing');
    }
  }, [currentIndex, tracks, playAudio, startSynth]);

  const pause = useCallback(() => {
    stopSynth();

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setPlayState('paused');
  }, [stopSynth]);

  const toggle = useCallback(() => {
    if (playState === 'playing') {
      pause();
    } else {
      play();
    }
  }, [playState, pause, play]);

  const next = useCallback(() => {
    const newIdx = (currentIndex + 1) % tracks.length;

    stopSynth();
    stopAudio();

    setCurrentIndex(newIdx);

    if (playState === 'playing') {
      playAudio(newIdx);
    }
  }, [
    currentIndex,
    tracks.length,
    playState,
    stopSynth,
    stopAudio,
    playAudio,
  ]);

  const prev = useCallback(() => {
    const newIdx = (currentIndex - 1 + tracks.length) % tracks.length;

    stopSynth();
    stopAudio();

    setCurrentIndex(newIdx);

    if (playState === 'playing') {
      playAudio(newIdx);
    }
  }, [
    currentIndex,
    tracks.length,
    playState,
    stopSynth,
    stopAudio,
    playAudio,
  ]);

  const selectTrack = useCallback(
    (index: number) => {
      if (index < 0 || index >= tracks.length) return;

      stopSynth();
      stopAudio();

      setCurrentIndex(index);
      setEnabled(true);

      localStorage.setItem('music-enabled', 'true');

      playAudio(index);
    },
    [tracks.length, stopSynth, stopAudio, playAudio]
  );

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));

    setVolumeState(clamped);
    localStorage.setItem('music-volume', String(clamped));
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;

      localStorage.setItem('music-muted', String(next));

      return next;
    });
  }, []);

  const enable = useCallback(() => {
    setEnabled(true);
    localStorage.setItem('music-enabled', 'true');
  }, []);

  // Load saved preferences
  useEffect(() => {
    const savedVol = localStorage.getItem('music-volume');
    const savedMuted = localStorage.getItem('music-muted');

    if (savedVol) {
      const parsedVolume = parseFloat(savedVol);

      if (!Number.isNaN(parsedVolume)) {
        setVolumeState(Math.max(0, Math.min(1, parsedVolume)));
      }
    }

    if (savedMuted === 'true') {
      setMuted(true);
    }
  }, []);

  // Update volume when it changes
  useEffect(() => {
    updateVolume();
  }, [volume, muted, updateVolume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupNodes();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }

      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {
          // Already closed
        }
      }
    };
  }, [cleanupNodes]);

  // If disabled, stop playing
  useEffect(() => {
    if (!enabled && playState === 'playing') {
      stopSynth();
      stopAudio();
      setPlayState('stopped');
    }
  }, [enabled, playState, stopSynth, stopAudio]);

  return (
    <MusicContext.Provider
      value={{
        tracks,
        currentTrack,
        currentIndex,
        playState,
        volume,
        muted,
        enabled,
        play,
        pause,
        toggle,
        next,
        prev,
        selectTrack,
        setVolume,
        toggleMute,
        enable,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);

  if (!ctx) {
    throw new Error('useMusic must be used within MusicProvider');
  }

  return ctx;
}
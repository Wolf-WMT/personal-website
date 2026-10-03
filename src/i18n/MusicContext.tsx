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

  const currentTrack = tracks[currentIndex] ?? null;

  const cleanupNodes = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try { osc.stop(); osc.disconnect(); } catch { /* already stopped */ }
    });
    oscillatorsRef.current = [];
    if (lfoRef.current) {
      try { lfoRef.current.stop(); lfoRef.current.disconnect(); } catch { /* */ }
      lfoRef.current = null;
    }
    if (lfoGainRef.current) {
      try { lfoGainRef.current.disconnect(); } catch { /* */ }
      lfoGainRef.current = null;
    }
  }, []);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return audioCtxRef.current;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  const startSynth = useCallback((presetIndex: number) => {
    const ctx = initAudio();
    if (!ctx || !filterRef.current || !masterGainRef.current) return;
    if (ctx.state === 'suspended') ctx.resume();

    cleanupNodes();

    const preset = PRESETS[presetIndex % PRESETS.length];

    const lfo = ctx.createOscillator();
    lfo.frequency.value = preset.lfoFreq;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 30;
    lfo.connect(lfoGain);
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;

    if (filterRef.current) {
      lfoGain.connect(filterRef.current.frequency);
    }

    preset.freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = preset.type;
      osc.frequency.value = freq;
      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.15 / preset.freqs.length;
      osc.connect(oscGain);
      if (filterRef.current) oscGain.connect(filterRef.current);
      osc.start();
      oscillatorsRef.current.push(osc);
    });

    lfo.start();
  }, [cleanupNodes, initAudio]);

  const stopSynth = useCallback(() => {
    cleanupNodes();
  }, [cleanupNodes]);

  const updateVolume = useCallback(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        muted ? 0 : volume,
        audioCtxRef.current.currentTime,
        0.1
      );
    }
  }, [muted, volume]);

  const play = useCallback(() => {
    setEnabled(true);
    localStorage.setItem('music-enabled', 'true');
    startSynth(currentIndex);
    setPlayState('playing');
  }, [currentIndex, startSynth]);

  const pause = useCallback(() => {
    stopSynth();
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
    setCurrentIndex(newIdx);
    if (playState === 'playing') {
      stopSynth();
      startSynth(newIdx);
    }
  }, [currentIndex, tracks.length, playState, stopSynth, startSynth]);

  const prev = useCallback(() => {
    const newIdx = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentIndex(newIdx);
    if (playState === 'playing') {
      stopSynth();
      startSynth(newIdx);
    }
  }, [currentIndex, tracks.length, playState, stopSynth, startSynth]);

  const selectTrack = useCallback((index: number) => {
    if (index < 0 || index >= tracks.length) return;
    setCurrentIndex(index);
    stopSynth();
    startSynth(index);
    setPlayState('playing');
    setEnabled(true);
    localStorage.setItem('music-enabled', 'true');
  }, [tracks.length, stopSynth, startSynth]);

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
    if (savedVol) setVolumeState(parseFloat(savedVol));
    if (savedMuted === 'true') setMuted(true);
  }, []);

  // Update volume when it changes
  useEffect(() => {
    updateVolume();
  }, [volume, muted, updateVolume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupNodes();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch { /* */ }
      }
    };
  }, [cleanupNodes]);

  // If disabled, stop playing
  useEffect(() => {
    if (!enabled && playState === 'playing') {
      stopSynth();
      setPlayState('stopped');
    }
  }, [enabled, playState, stopSynth]);

  return (
    <MusicContext.Provider value={{
      tracks, currentTrack, currentIndex, playState, volume, muted, enabled,
      play, pause, toggle, next, prev, selectTrack, setVolume, toggleMute, enable,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}

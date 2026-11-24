// Web Audio API tactile touch sound generator
import { useAppStore } from '@/context/store';

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export type SoundType = 'tap' | 'pop' | 'toggle' | 'success' | 'error';

/**
 * Synthesizes a clean, pleasant, low-latency tactile audio feedback.
 * Uses Web Audio API with zero external audio assets.
 */
export function playTouchSound(type: SoundType = 'tap') {
  try {
    const isEnabled = useAppStore.getState().soundEnabled;
    if (isEnabled === false) return;

    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'tap' || type === 'toggle') {
      // Crisp mechanical touch click (short, satisfying, subtle)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.028);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === 'pop') {
      // Light playful pop sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.025);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.045);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.048);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      // Celebratory culinary chime (harmonic triad C5 - E5 - G5)
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.055;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.14, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.25);
      });
    } else if (type === 'error') {
      // Gentle warning thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.11);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch {
    // Ignore audio errors gracefully if disabled by device policy
  }
}

/**
 * Attaches a global listener to window that triggers the touch sound
 * on EVERY interactive click/tap across the entire application.
 */
export function initTouchSoundListener() {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e: MouseEvent | TouchEvent | PointerEvent) => {
    const target = e.target as HTMLElement | SVGElement | null;
    if (!target) return;

    // Check if clicked element or any ancestor is interactive
    const interactive = target.closest(
      'button, a, input, select, textarea, [role="button"], [role="tab"], [role="switch"], [role="radio"], [role="checkbox"], .cursor-pointer, .card-hover, label, g[style*="cursor: pointer"], g[style*="cursor:pointer"], svg[style*="cursor: pointer"]'
    );

    if (interactive) {
      playTouchSound('tap');
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  };
}

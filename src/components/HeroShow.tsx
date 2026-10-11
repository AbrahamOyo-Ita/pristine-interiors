'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Cinematic hero background: short interior clips play one after another and
 * crossfade smoothly when a clip ends. A static image sits underneath as the
 * instant paint layer and as the fallback when video is unavailable or the
 * visitor prefers reduced motion. Clips: Pexels free license.
 */
const CLIPS = [
  { src: '/videos/hero-dining.mp4' },
  { src: '/videos/hero-bedroom.mp4' },
  { src: '/videos/hero-living.mp4' },
];

export default function HeroShow() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const refs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const video = refs.current[active];
    if (!video) return;
    if (video.currentTime > 0.1) video.currentTime = 0;
    video
      .play()
      .then(() => setStarted(true))
      .catch(() => setStarted(false));
    // Start buffering the next clip only when the current one starts,
    // so the browser never downloads the whole rotation up front.
    const next = refs.current[(active + 1) % CLIPS.length];
    if (next && next.preload !== 'auto') {
      next.preload = 'auto';
      next.load();
    }
  }, [active, reduced]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/images/living-luxury.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {!reduced
        ? CLIPS.map((clip, i) => (
            <video
              key={clip.src}
              ref={(el) => {
                refs.current[i] = el;
              }}
              src={clip.src}
              muted
              playsInline
              preload={i === 0 ? 'auto' : 'metadata'}
              onEnded={() => setActive((a) => (a + 1) % CLIPS.length)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
                i === active && started ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        : null}
    </div>
  );
}

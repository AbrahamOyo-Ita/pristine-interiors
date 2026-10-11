'use client';

import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

/**
 * Full-width cinematic band: a still interior with a centered play button,
 * exactly like the reference layout. The button really works: it plays the
 * studio showreel clip (muted, looping) and toggles back to pause.
 */
export default function ShowreelBand({ videoSrc, posterSrc }: { videoSrc: string; posterSrc: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-ink" aria-label="Studio showreel">
      <video
        ref={ref}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className={`absolute inset-0 transition-colors duration-700 ${playing ? 'bg-ink/10' : 'bg-ink/25'}`} aria-hidden="true" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause showreel video' : 'Play showreel video'}
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-soft transition-transform duration-300 hover:scale-105"
      >
        {playing ? <Pause className="h-6 w-6" aria-hidden="true" /> : <Play className="ml-1 h-6 w-6" aria-hidden="true" />}
      </button>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const safe = Math.min(index, images.length - 1);

  return (
    <div>
      <div className="relative overflow-hidden rounded-[24px]">
        <Image
          src={images[safe]}
          alt={`${alt}, photo ${safe + 1} of ${images.length}`}
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] w-full object-cover"
          priority
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-3" role="group" aria-label={`${alt} gallery thumbnails`}>
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === safe}
              className={`relative overflow-hidden rounded-[12px] transition-opacity ${
                i === safe ? 'ring-2 ring-bronze' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" width={160} height={120} className="aspect-[4/3] w-20 object-cover sm:w-24" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

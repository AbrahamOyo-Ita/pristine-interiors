import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'public', 'images');
const MAX_W = 2000;

for (const f of fs.readdirSync(DIR).sort()) {
  const p = path.join(DIR, f);
  const ext = path.extname(f).toLowerCase();
  const base = path.basename(f, path.extname(f));
  let meta;
  try {
    meta = await sharp(p).metadata();
  } catch (e) {
    console.log(`SKIP ${f} (${e.message})`);
    continue;
  }
  const size = fs.statSync(p).size;

  if (ext === '.png') {
    const out = meta.hasAlpha ? `${base}.webp` : `${base}.jpg`;
    const pipe = sharp(p).resize({ width: MAX_W, withoutEnlargement: true });
    if (meta.hasAlpha) await pipe.webp({ quality: 82 }).toFile(path.join(DIR, out));
    else await pipe.jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(DIR, out));
    fs.unlinkSync(p);
    console.log(`CONVERT ${f} -> ${out} (${(size / 1024) | 0}KB -> ${(fs.statSync(path.join(DIR, out)).size / 1024) | 0}KB)`);
  } else if (ext === '.jpg' || ext === '.jpeg') {
    if (size > 250_000 || (meta.width ?? 0) > MAX_W) {
      const tmp = `${p}.tmp`;
      await sharp(p).resize({ width: MAX_W, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(tmp);
      fs.renameSync(tmp, p);
      console.log(`RE-ENCODE ${f} (${(size / 1024) | 0}KB -> ${(fs.statSync(p).size / 1024) | 0}KB)`);
    }
  } else if (ext === '.webp') {
    if (size > 300_000 || (meta.width ?? 0) > MAX_W) {
      const tmp = `${p}.tmp`;
      await sharp(p).resize({ width: MAX_W, withoutEnlargement: true }).webp({ quality: 80 }).toFile(tmp);
      fs.renameSync(tmp, p);
      console.log(`RE-ENCODE ${f} (${(size / 1024) | 0}KB -> ${(fs.statSync(p).size / 1024) | 0}KB)`);
    }
  }
}
console.log('DONE');

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

async function convertImages() {
  const files = fs.readdirSync(publicDir);
  const images = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

  for (const img of images) {
    const inputPath = path.join(publicDir, img);
    const parsed = path.parse(img);
    const outputPath = path.join(publicDir, `${parsed.name}.webp`);

    console.log(`Converting ${img} to ${parsed.name}.webp...`);
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      console.log(`Successfully converted ${img}`);
    } catch (err) {
      console.error(`Failed to convert ${img}:`, err);
    }
  }
}

convertImages();

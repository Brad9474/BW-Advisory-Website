import { useEffect, useRef } from 'react';

const ShieldLogo = ({ className = 'w-10 h-10' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = '/shield.webp';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const { width, height } = canvas;
      const imageData = ctx.getImageData(0, 0, width, height);
      const d = imageData.data;

      // Flood-fill the white background from the canvas edges inward, rather
      // than a global brightness threshold — a global threshold also strips
      // the shield artwork's own bright chrome highlights, which is what was
      // making it look broken at small sizes. Flood-fill only removes
      // background connected to the border, leaving interior highlights intact.
      const isBg = (i) => d[i] > 248 && d[i + 1] > 248 && d[i + 2] > 248;
      const visited = new Uint8Array(width * height);
      const stack = [];
      for (let x = 0; x < width; x++) { stack.push(x, 0, x, height - 1); }
      for (let y = 0; y < height; y++) { stack.push(0, y, width - 1, y); }

      while (stack.length) {
        const y = stack.pop();
        const x = stack.pop();
        if (x < 0 || y < 0 || x >= width || y >= height) continue;
        const p = y * width + x;
        if (visited[p]) continue;
        visited[p] = 1;
        const i = p * 4;
        if (!isBg(i)) continue;
        d[i + 3] = 0;
        stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`object-contain ${className}`}
    />
  );
};

export default ShieldLogo;

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

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 220 && d[i + 1] > 220 && d[i + 2] > 220) {
          const avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
          d[i + 3] = avg > 245 ? 0 : Math.max(0, 255 - (avg - 220) * 8);
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`object-contain ${className}`}
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
};

export default ShieldLogo;

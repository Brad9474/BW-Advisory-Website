import { useEffect, useRef, useState } from 'react';

const TransparentShield = () => {
  const canvasRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    setIsAnimating(false);
    lastX.current = e.clientX;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    setRotationY(prev => prev + deltaX * 1.5);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    setIsAnimating(true);
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    e.target.releasePointerCapture(e.pointerId);
    setRotationY(prev => Math.round(prev / 360) * 360);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let startTime;
    let originalCanvas = document.createElement('canvas');

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = '/shield.webp';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      originalCanvas.width = img.width;
      originalCanvas.height = img.height;

      const oCtx = originalCanvas.getContext('2d');
      oCtx.drawImage(img, 0, 0);

      const imageData = oCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (avg > 245) data[i + 3] = 0;
          else data[i + 3] = Math.max(0, 255 - (avg - 220) * 8);
        }
      }
      oCtx.putImageData(imageData, 0, 0);

      const animate = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = (elapsed % 3000) / 3000;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(originalCanvas, 0, 0);
        ctx.globalCompositeOperation = 'source-atop';

        ctx.save();
        const sweepX = -canvas.width + (progress * canvas.width * 3);
        ctx.translate(sweepX, 0);
        ctx.transform(1, 0, Math.tan(-20 * Math.PI / 180), 1, 0, 0);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width * 0.5, 0);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.7)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(-200, 0, canvas.width * 0.5 + 400, canvas.height);
        ctx.restore();

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="shield-elem w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(27,110,194,0.3)] touch-none"
      style={{
        transform: `rotateY(${rotationY}deg)`,
        cursor: 'grab',
        transition: isAnimating ? 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
};

export default TransparentShield;

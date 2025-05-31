import { useEffect, useRef } from 'react';
import { Fragment, fragments } from '../data';

const parseCoords = (path: string): { x: number; y: number }[] => {
  const coords = path.match(/[\d.]+/g)?.map(Number) || [];
  const points = [];
  for (let i = 0; i < coords.length; i += 2) {
    points.push({ x: coords[i], y: coords[i + 1] });
  }
  return points;
}

const getBounds = (coords: { x: number; y: number }[]) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  coords.forEach(point => {
    if (point.x < minX) minX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.x > maxX) maxX = point.x;
    if (point.y > maxY) maxY = point.y;
  });

  return {
    minX,
    minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

const calculateSvgMinMax = (fragments: Fragment[]) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  fragments.forEach(fragment => {
    const points = parseCoords(fragment.d.end);
    points.forEach(point => {
      if (point.x < minX) minX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.x > maxX) maxX = point.x;
      if (point.y > maxY) maxY = point.y;
    })
  })

  return {
    minX, minY, maxX, maxY,
  };
}

const adjustEndPath = (endPath: string, offsetX: number, offsetY: number) => {
  return endPath
    .replace(/M([\d.]+) ([\d.]+)/g, (_, x, y) => {
      const newX = parseFloat(x) + offsetX;
      const newY = parseFloat(y) + offsetY;
      return `M${newX.toFixed(4)} ${newY.toFixed(4)}`;
    })
    .replace(/L([\d.]+) ([\d.]+)/g, (_, x, y) => {
      const newX = parseFloat(x) + offsetX;
      const newY = parseFloat(y) + offsetY;
      return `L${newX.toFixed(4)} ${newY.toFixed(4)}`;
    })
    .replace(/Z/g, "Z");
}

const updateEndPosition = (fragments: Fragment[], offsetX: number, offsetY: number) => {
  return fragments.map((fragment) => {
    return {
      ...fragment,
      d: {
        ...fragment.d,
        end: adjustEndPath(fragment.d.end, offsetX, offsetY),
      },
    };
  })
}

const calculateOffset = (width: number, height: number, { minX, minY, maxX, maxY }: { minX: number, minY: number, maxX: number, maxY: number }) => {
  const compWidth = maxX - minX;
  const compHeight = maxY - minY;

  const compCenterX = minX + compWidth / 2;
  const compCenterY = minY + compHeight / 2;

  const svgCenterX = width / 2;
  const svgCenterY = height / 2;

  const offsetX = svgCenterX - compCenterX;
  const offsetY = svgCenterY - compCenterY;

  return { offsetX, offsetY };
}

function Animation3() {
  const SVG_WIDTH = 1920;
  const SVG_HEIGHT = 1080;
  const FONT_SIZE = 172;
  const ASPECT_RATIO = SVG_WIDTH / SVG_HEIGHT;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const minMax = calculateSvgMinMax(fragments);
  const { offsetX, offsetY } = calculateOffset(SVG_WIDTH, SVG_HEIGHT, minMax);
  const transformedFragments = updateEndPosition(fragments, offsetX, offsetY);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      let newWidth = parentWidth;
      let newHeight = parentWidth / ASPECT_RATIO;

      if (newHeight > parentHeight) {
        newHeight = parentHeight;
        newWidth = parentHeight * ASPECT_RATIO;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(newWidth / SVG_WIDTH, newHeight / SVG_HEIGHT);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [])

  function calculateProgress(elapsed: number, start: number, duration: number): number {
    return elapsed > start ? Math.min((elapsed - start) / duration, 1) : 0;
  }

  // Функція easing для плавного сповільнення
  function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = transformedFragments.map(fragment => {
      const img = new Image();
      img.src = fragment.img;
      return img;
    });

    const heartImg = new Image();
    heartImg.src = "heart_svg.svg";

    let imagesLoaded = 0;
    const totalImages = images.length + 1;

    const onImageLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        startAnimation();
      }
    };

    images.forEach(img => {
      img.onload = onImageLoad;
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        onImageLoad();
      };
    });

    heartImg.onload = onImageLoad;
    heartImg.onerror = () => {
      console.error("Failed to load heart_svg.svg");
      onImageLoad();
    };

    const startAnimation = () => {
      let startTime: number | null = null;
      const animationParams = {
        moveDuration: 3000, // Тривалість переміщення фрагментів (3 секунди)
        fadeDuration: 2000, // Тривалість переходу від зображення до кольору (2 секунди)
        fragmentFadeDuration: 2000, // Тривалість зникнення фрагментів (2 секунди)
        textFadeDuration: 1200, // Тривалість появи тексту та сердечка (1.2 секунди)
        heartDelay: 500, // Затримка появи сердечка після початку появи тексту (0.5 секунди)
        fragmentFadeStart: 4000, // Час початку зникнення фрагментів (4 секунди = moveDuration + fadeDuration * 0.5)
      };

      const drawFragment = (
        ctx: CanvasRenderingContext2D,
        fragment: Fragment,
        img: HTMLImageElement,
        moveProgress: number,
        fadeProgress: number,
        fragmentFadeProgress: number
      ) => {
        if (!img.complete || img.naturalHeight === 0) return;

        const startCoords = parseCoords(fragment.d.start);
        const endCoords = parseCoords(fragment.d.end);

        const currentCoords = startCoords.map((point, i) => ({
          x: point.x + (endCoords[i].x - point.x) * moveProgress,
          y: point.y + (endCoords[i].y - point.y) * moveProgress,
        }));

        ctx.beginPath();
        ctx.moveTo(currentCoords[0].x, currentCoords[0].y);
        currentCoords.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.closePath();

        ctx.save();
        ctx.clip();

        const bounds = getBounds(currentCoords);
        const imgAspectRatio = img.naturalWidth / img.naturalHeight;
        const boundsAspectRatio = bounds.width / bounds.height;

        let drawWidth, drawHeight, offsetX, offsetY;
        if (imgAspectRatio > boundsAspectRatio) {
          drawHeight = bounds.height;
          drawWidth = bounds.height * imgAspectRatio;
          offsetX = bounds.minX - (drawWidth - bounds.width) / 2;
          offsetY = bounds.minY;
        } else {
          drawWidth = bounds.width;
          drawHeight = bounds.width / imgAspectRatio;
          offsetX = bounds.minX;
          offsetY = bounds.minY - (drawHeight - bounds.height) / 2;
        }

        ctx.globalAlpha = fadeProgress * (1 - fragmentFadeProgress);
        ctx.fillStyle = fragment.fill;
        ctx.fill();

        ctx.globalAlpha = (1 - fadeProgress) * (1 - fragmentFadeProgress);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        ctx.restore();
      };

      const drawTextAndHeart = (
        ctx: CanvasRenderingContext2D,
        textFadeProgress: number,
        heartFadeProgress: number
      ) => {
        ctx.save();

        const easedTextProgress = easeOutQuad(textFadeProgress);
        const fontSize = FONT_SIZE * (0.5 + easedTextProgress * 0.5);
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = SVG_WIDTH / 2;
        const centerY = SVG_HEIGHT / 2;

        ctx.fillStyle = `rgba(255, 255, 255, ${easedTextProgress})`;
        ctx.fillText('I', centerX - FONT_SIZE * 2 + FONT_SIZE / 6, centerY);
        ctx.fillText('my', centerX, centerY);

        ctx.fillStyle = `rgba(163, 107, 247, ${easedTextProgress})`;
        ctx.fillText('team', centerX + FONT_SIZE * 2 - FONT_SIZE / 6, centerY);

        if (heartFadeProgress > 0 && heartImg.complete) {
          const easedHeartProgress = easeOutQuad(heartFadeProgress);
          const heartSize = fontSize * 0.8;
          const heartAspectRatio = heartImg.naturalWidth / heartImg.naturalHeight;
          let heartWidth, heartHeight;

          if (heartAspectRatio > 1) {
            heartWidth = heartSize * heartAspectRatio;
            heartHeight = heartSize;
          } else {
            heartWidth = heartSize;
            heartHeight = heartSize / heartAspectRatio;
          }

          ctx.globalAlpha = easedHeartProgress;
          ctx.drawImage(
            heartImg,
            centerX - FONT_SIZE * 2 + FONT_SIZE / 3,
            centerY - heartHeight / 2,
            heartWidth,
            heartHeight
          );
        }

        ctx.restore();
      };

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const moveProgress = calculateProgress(elapsed, 0, animationParams.moveDuration);
        const fadeProgress = calculateProgress(elapsed, animationParams.moveDuration, animationParams.fadeDuration);
        const fragmentFadeProgress = calculateProgress(elapsed, animationParams.fragmentFadeStart, animationParams.fragmentFadeDuration);
        const textFadeProgress = calculateProgress(elapsed, animationParams.fragmentFadeStart, animationParams.textFadeDuration);
        const heartFadeProgress = calculateProgress(
          elapsed,
          animationParams.fragmentFadeStart + animationParams.heartDelay,
          animationParams.textFadeDuration - animationParams.heartDelay
        );

        ctx.clearRect(0, 0, SVG_WIDTH, SVG_HEIGHT);

        if (fragmentFadeProgress < 1) {
          transformedFragments.forEach((fragment, index) => {
            drawFragment(ctx, fragment, images[index], moveProgress, fadeProgress, fragmentFadeProgress);
          });
        }

        if (textFadeProgress > 0) {
          drawTextAndHeart(ctx, textFadeProgress, heartFadeProgress);
        }

        if (elapsed < animationParams.fragmentFadeStart + animationParams.textFadeDuration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ccc',
        backgroundImage: 'url("2867102.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
        }}
      />
    </div>
  );
}

export default Animation3;
import { motion } from "framer-motion";
import { fragments } from "../data";

function Animation2() {
  const SVG_WIDTH = 1920;
  const SVG_HEIGHT = 1080;

  // Find min/max coordinates for end paths
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  fragments.forEach(fragment => {
    const endCoords = fragment.d.end.match(/[\d.]+/g)?.map(Number) || [];
    for (let i = 0; i < endCoords.length; i += 2) {
      const x = endCoords[i];
      const y = endCoords[i + 1];
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  });

  // Calculate composition size
  const compWidth = maxX - minX;
  const compHeight = maxY - minY;

  // Composition center
  const compCenterX = minX + compWidth / 2;
  const compCenterY = minY + compHeight / 2;

  // SVG center
  const svgCenterX = SVG_WIDTH / 2;
  const svgCenterY = SVG_HEIGHT / 2;

  // Centering offset
  const offsetX = svgCenterX - compCenterX;
  const offsetY = svgCenterY - compCenterY;

  // Adjust SVG path coordinates
  function adjustEndPath(endPath: string, offsetX: number, offsetY: number) {
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

  // Get min coordinates from SVG path
  function getMinCoordinates(svgPath: string): { minX: number, minY: number } {
    const coordinates = svgPath.match(/M([\d.]+) ([\d.]+)|L([\d.]+) ([\d.]+)/g);
    let minX = Infinity;
    let minY = Infinity;

    if (!coordinates) return { minX: 0, minY: 0 };

    coordinates.forEach(coord => {
      const matches = coord.match(/([\d.]+) ([\d.]+)/);
      if (matches) {
        const x = parseFloat(matches[1]);
        const y = parseFloat(matches[2]);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
      }
    });

    return { minX, minY };
  }

  // Transform fragments with adjusted paths
  const transformedFragments = fragments.map((fragment) => {
    const { minX: minStartX, minY: minStartY } = getMinCoordinates(fragment.d.start);
    const adjustedEndPath = adjustEndPath(fragment.d.end, offsetX, offsetY);
    const { minX: minEndX, minY: minEndY } = getMinCoordinates(adjustedEndPath);

    return {
      ...fragment,
      d: {
        ...fragment.d,
        end: adjustedEndPath,
      },
      minStartX,
      minStartY,
      minEndX,
      minEndY,
    };
  });

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
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {transformedFragments.map((fragment) => (
            <pattern
              key={fragment.id}
              id={`imgPattern${fragment.id}`}
              patternUnits="userSpaceOnUse"
              width="200"
              height="200"
              x={fragment.minStartX % 200}
              y={fragment.minStartY % 200}
            >
              <image href={fragment.img} x={0} y={0} width="200" height="200" />
              {/* Animate image position */}
              <animate
                attributeName="x"
                from={0}
                to={fragment.minEndX - fragment.minStartX}
                dur="4s"
                begin="1s"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1"
                fill="freeze"
              />
              <animate
                attributeName="y"
                from={0}
                to={fragment.minEndY - fragment.minStartY}
                dur="4s"
                begin="1s"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1"
                fill="freeze"
              />
            </pattern>
          ))}
        </defs>

        {transformedFragments.map((fragment) => (
          <g key={fragment.id}>
            <motion.path
              d={fragment.d.start}
              fill={`url(#imgPattern${fragment.id})`}
              animate={{
                d: fragment.d.end,
                opacity: [1, 1, 0],
              }}
              transition={{
                d: {
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1,
                },
                opacity: {
                  duration: 0,
                  ease: "easeInOut",
                  times: [0, 0.8, 1],
                  delay: 6,
                },
              }}
            />
            <motion.path
              d={fragment.d.end}
              fill={fragment.fill}
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: [0, 1, 0] }}
              transition={{
                delay: 5,
                duration: 3,
                ease: "easeInOut",
                opacity: {
                  duration: 4,
                  ease: "easeInOut",
                  times: [0, 0.8, 1],
                  delay: 7,
                },
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default Animation2;
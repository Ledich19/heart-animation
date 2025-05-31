import { motion } from "framer-motion";
import { fragments } from "../data";

function Animation1() {
  const FONTSIZE = 172;
  const SVG_WIDTH = 1920;
  const SVG_HEIGHT = 1080;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  fragments.forEach(fragment => {
    const endCoords = fragment.d.end.match(/[\d.]+/g)?.map(Number);

    const allCoords = [...endCoords || []];
    for (let i = 0; i < allCoords.length; i += 2) {
      const x = allCoords[i];
      const y = allCoords[i + 1];

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  });

  const compWidth = maxX - minX;
  const compHeight = maxY - minY;

  const compCenterX = minX + compWidth / 2;
  const compCenterY = minY + compHeight / 2;

  const svgCenterX = SVG_WIDTH / 2;
  const svgCenterY = SVG_HEIGHT / 2; 
  const offsetX = svgCenterX - compCenterX;
  const offsetY = svgCenterY - compCenterY;

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

        if (x < minX) minX = x;
        if (y < minY) minY = y;
      }
    });

    return { minX, minY };
  }

  const transformedFragments = fragments.map((fragment) => {
    return {
      ...fragment,
      d: {
        ...fragment.d,
        end: adjustEndPath(fragment.d.end, offsetX, offsetY),
      },
      ...getMinCoordinates(fragment.d.start)
    };
  });


  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ccc',
      backgroundImage: 'url("2867102.jpg")',
    }}>

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
              x={fragment.minX % 200}
              y={fragment.minY % 200}
            >
              <image href={fragment.img} x={0} y={0} width="200" height="200" />
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


        {/* I lave my team animation */}
        <g transform={`translate(${svgCenterX}, ${svgCenterY})`}>

          <motion.text
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 6 }}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={FONTSIZE}
            fontFamily="Arial"
            x={-FONTSIZE * 2}
          >
            I
          </motion.text>

          <motion.image
            href="heart_svg.svg"
            width={FONTSIZE}
            height={FONTSIZE}
            x={-FONTSIZE * 2 + FONTSIZE / 4}
            y={-FONTSIZE / 2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 6.5 }}
          />

          <motion.text
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 6 }}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={FONTSIZE}
            fontFamily="Arial"
            x={FONTSIZE}
          >
            my<tspan fill="#A36BF7">team</tspan>
          </motion.text>
        </g>
        {/* I lave my team animation and*/}

      </svg>

    </div >
  );
}

export default Animation1;



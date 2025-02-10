import { motion } from "framer-motion";

interface Fragment {
  id: number;
  img: string;
  d: {
    start: string;
    end: string;
  };
  fill: string;
}

function Animation1() {
  const FONTSIZE = 172

  const fragments: Fragment[] = [
    {
      id: 1,
      img: "1.jpeg",
      d: {
        start: "M240 360 L240 180 L420 180 L420 360 Z",
        end: "M153.58 72.9284 L71.7647 72.152 L170.5 3.5001 L153.58 72.9284 Z",
      },
      fill: "#EDE2FF", // Остается без изменений, так как совпадает с предыдущим списком
    },
    {
      id: 2,
      img: "2.jpeg",
      d: {
        start: "M660 360 L840 360 L840 180 L660 180Z",
        end: "M159.001 73.5 L259.999 72 L176.501 2 L159.001 73.5 Z",
      },
      fill: "#BCB1FF", // Новый цвет из предыдущего списка
    },
    {
      id: 3,
      img: "3.jpeg",
      d: {

        start: "M1260 360 L1080 360 L1080 180 L1260 180Z",
        end: "M375.501 73 L275.501 73 L356.595 0 L375.501 73 Z",
      },
      fill: "#D3B0FF", // Новый цвет из предыдущего списка
    },
    {
      id: 4,
      img: "4.jpeg",
      d: {
        start: "M1500 180 L1680 180 L1680 360 L1500 360 Z",
        end: "M382.086 73.1859 L364.501 4.0141 L463.501 73.1858 L382.086 73.1859 Z",
      },
      fill: "#853AE5", // Новый цвет из предыдущего списка
    },
    {
      id: 5,
      img: "5.jpeg",
      d: {
        start: "M53.33 413.33 L233.33 413.33 L233.33 593.33 L53.33 593.33 Z",
        end: "M61.0001 80.5 L139.5 158.5 L0.0001 158.5 L61.0001 80.5 Z",
      },
      fill: "#C99EFF", // Новый цвет из предыдущего списка
    },
    {
      id: 6,
      img: "6.jpeg",
      d: {



        start: "M466.66 413.33 L286.66 413.33 L286.66 593.336 L466.66 593.33Z",
        end: "M152.001 78.5 L67.831 78.5 L145.001 156 L152.001 78.5 Z",
      },
      fill: "#E0B8FF", // Новый цвет из предыдущего списка
    },
    {
      id: 7,
      img: "7.jpeg",
      d: {
        start: "M520 413.33 L700 413.33 L700 593.33 L520 593.33 Z",
        end: "M157.501 78 L257.001 78 L151.501 155.5 L157.501 78 Z",
      },
      fill: "#BE9FFF", // Новый цвет из предыдущего списка
    },
    {
      id: 8,
      img: "8.jpeg",
      d: {
        start: "M933.33 413.33 L753.33 413.33 L753.33 593.33 L933.33 593.33Z",

        end: "M263.25 158.184 L263.25 81.1501 L157.501 158.184 L263.25 158.184 Z",
      },
      fill: "#D0B9FF", // Новый цвет из предыдущего списка
    },
    {
      id: 9,
      img: "9.jpeg",
      d: {
        start: "M986.66 413.33 L1166.66 413.33 L1166.66 593.33 L986.66 593.33 Z",

        end: "M270.751 159 L270.751 82 L376.501 159 L270.751 159 Z",
      },
      fill: "#F0DDFF", // Новый цвет из предыдущего списка
    },
    {
      id: 10,
      img: "10.jpeg",
      d: {
        start: "M1400 413.33 L1220 413.33 L1220 593.33 L1400 593.33Z",
        end: "M377.501 77.8 L276.501 77.8 L383.501 155.3 L377.501 77.8 Z",
      },
      fill: "#D3B0FF", // Новый цвет из предыдущего списка
    },
    {
      id: 11,
      img: "11.jpeg",
      d: {
        start:
          "M1453.33 413.33 L1453.33 593.33 L1633.33 593.33 L1633.33 413.33Z",
        end: "M382.046 78.4 L390.001 155.5 L465.501 78.4 L382.046 78.4 Z",
      },
      fill: "#A780FB", // Новый цвет из предыдущего списка
    },
    {
      id: 12,
      img: "12.jpeg",
      d: {
        start:
          "M1686.66 413.33 L1866.66 413.33 L1866.66 593.33 L1686.66 593.33 Z",
        end: "M395.001 158.5 L472.501 79.9998 L533.001 158.5 L395.001 158.5 Z",
      },
      fill: "#895BEB", // Остается без изменений, так как совпадает с предыдущим списком
    },
    {
      id: 13,
      img: "13.jpeg",
      d: {
        start: "M53.33 646.66 L233.33 646.66 L233.33 826.66 L53.33 826.66 Z",
        end: "M0 165 L141 165 L61.5 285 L0 165 Z",
      },
      fill: "#AA3FDC", // Новый цвет из предыдущего списка
    },
    {
      id: 14,
      img: "14.jpeg",
      d: {
        start: "M286.66 646.66 L466.66 646.66 L466.66 826.66 L286.66 826.66 Z",
        end: "M144.001 172.5 L144.001 295 L66.0001 289.155 L144.001 172.5 Z",
      },
      fill: "#A14CE4", // Новый цвет из предыдущего списка
    },
    {
      id: 15,
      img: "15.jpeg",
      d: {
        start: "M520 646.66 L520 826.66 L700 826.66 L700 646.66Z",

        end: "M150.501 171 L150.812 296.5 L260.501 303 L150.501 171 Z",
      },
      fill: "#A85BF6", // Остается без изменений, так как совпадает с предыдущим списком

    },
    {
      id: 16,
      img: "16.jpeg",
      d: {
        start: "M933.33 646.66 L753.33 646.66 L753.33 826.66 L933.33 826.66Z",
        end: "M264.778 164.466 L154.278 164.466 L264.778 297.966 L264.778 164.466 Z",
      },
      fill: "#B489F9", // Новый цвет из предыдущего списка
    },
    {
      id: 17,
      img: "17.jpeg",
      d: {
        start: "M986.66 646.66 L1166.66 646.66 L1166.66 826.66 L986.66 826.66 Z",
        end: "M269.868 164.187 L380.368 164.187 L269.869 297.687 L269.868 164.187 Z",
      },
      fill: "#AD89F9", // Новый цвет из предыдущего списка
    },
    {
      id: 18,
      img: "18.jpeg",
      d: {
        start: "M1220 646.66 L1400 646.66 L1400 826.66 L1220 826.66 Z",
        end: "M383.5 171 L385.19 295.78 L275.5 302.28 L383.5 171 Z",
      },
      fill: "#CD9AFF", // Новый цвет из предыдущего списка
    },
    {
      id: 19,
      img: "19.jpeg",
      d: {
        start:
          "M1633.33 646.66 L1453.33 646.66 L1453.33 826.66 L1633.33 826.66Z",
        end: "M390.501 173 L390.501 295 L467.501 288 L390.501 173 Z",
      },
      fill: "#8F44EE", // Новый цвет из предыдущего списка
    },
    {
      id: 20,
      img: "20.jpeg",
      d: {
        start:
          "M1686.66 646.66 L1866.66 646.66 L1866.66 826.66 L1686.66 826.66 Z",
        end: "M393.001 165 L534.501 165 L473.001 284.5 L393.001 165 Z",
      },
      fill: "#7E36DA", // Новый цвет из предыдущего списка
    },
    {
      id: 21,
      img: "21.jpeg",
      d: {
        start: "M53.33 880 L233.33 880 L233.33 1060 L53.33 1060 Z",
        end: "M144.776 301.5 L160.276 403.5 L68.7767 295 L144.776 301.5 Z",
      },
      fill: "#9C37CC", // Новый цвет из предыдущего списка
    },
    {
      id: 22,
      img: "22.jpeg",
      d: {
        start: "M466.66 880 L286.66 880 L286.66 1060 L466.66 1060",
        end: "M150.501 302 L167.999 408.5 L261.001 309 L150.501 302 Z",
      },
      fill: "#993BE3", // Новый цвет из предыдущего списка
    },
    {
      id: 23,
      img: "23.jpeg",
      d: {
        start: "M520 1060 L700 1060 L700 880 L520 880Z",
        end: "M171.001 414.5 L263.753 479 L263.753 315 L171.001 414.5 Z",
      },
      fill: "#8823B8", // Новый цвет из предыдущего списка
    },
    {
      id: 24,
      img: "26.jpeg",
      d: {
        start: "M1400 1060 L1220 1060 L1220 880 L1400 880Z",
        end: "M362.501 413.5 L270.501 479 L270.501 315 L362.501 413.5 Z",
      },
      fill: "#6F1FAE", // Новый цвет из предыдущего списка
    },
    {
      id: 25,
      img: "27.jpeg",
      d: {
        //    "M413.278 424.966 L304.278 424.966 L304.278 319.466 L413.278 319.466 Z",
        start: "M1453.33 880 L1633.33 880 L1633.33 1060 L1453.33 1060Z",
        end: "M383.001 302.5 L366.001 408 L274.001 309.5 L383.001 302.5 Z",
      },
      fill: "#8F3BE3", // Новый цвет из предыдущего списка
    },
    {
      id: 26,
      img: "28.jpeg",
      d: {
        start: "M1866.66 880 L1686.66 880 L1686.66 1060 L1866.66 1060Z",
        end: "M389.501 301.5 L374.001 403.5 L470.001 295 L389.501 301.5 Z",
      },
      fill: "#6F17B5", // Новый цвет из предыдущего списка
    },
  ];

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

  // Размер композиции
  const compWidth = maxX - minX;
  const compHeight = maxY - minY;

  // Центр композиции
  const compCenterX = minX + compWidth / 2;
  const compCenterY = minY + compHeight / 2;

  // Центр SVG
  const svgCenterX = 1920 / 2; // Ширина viewBox
  const svgCenterY = 1080 / 2; // Высота viewBox

  // Смещение для центрирования
  const offsetX = svgCenterX - compCenterX;
  const offsetY = svgCenterY - compCenterY;

  // Функция для корректировки координат
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
        viewBox="0 0 1920 1080"
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
                  duration: 5,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0, // Длительность исчезновения
                  ease: "easeInOut",
                  times: [0, 0.8, 1], // Временные точки для анимации прозрачности
                  delay: 6, // Задержка перед началом исчезновения
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
                  duration: 4, // Длительность исчезновения
                  ease: "easeInOut",
                  times: [0, 0.8, 1], // Временные точки для анимации прозрачности
                  delay: 7, // Задержка перед началом исчезновения
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



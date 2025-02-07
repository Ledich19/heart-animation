https://ledich19.github.io/heart-animation/

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
width="100"
height="100" >
<image href={fragment.img} x="0" y="0" width="100" height="100" />
</pattern>
))}
</defs>

        {transformedFragments.map((fragment) => (
          <g key={fragment.id}>
            {/* Фон области */}
            <motion.path
              d={fragment.d.start}
              fill={fragment.fill}
              opacity={0.3}
              animate={{ d: fragment.d.end }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Основное изображение */}
            <motion.path
              d={fragment.d.start}
              fill={`url(#imgPattern${fragment.id})`}
              animate={{ d: fragment.d.end }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
          </g>
        ))}

      </svg>

================================================
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
width="100"
height="100" >
<image href={fragment.img} x="0" y="0" width="100" height="100" />
</pattern>
))}
</defs>

        {transformedFragments.map((fragment) => (
          <g key={fragment.id}>
            {/* Фон области */}
            <motion.path
              d={fragment.d.start}
              fill={fragment.fill}
              opacity={0.3}
              animate={{ d: fragment.d.end }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Основное изображение */}
            <motion.path
              d={fragment.d.start}
              fill={`url(#imgPattern${fragment.id})`}
              animate={{ d: fragment.d.end }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
          </g>
        ))}

      </svg>

===================================
<svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
<defs>
<clipPath id="shapeClip">
<path id="clipPath" d="M102.043 89.8946 L102.043 20 L200.778 20.4661 L200.778 89.8946 Z" />
</clipPath>
</defs>

        <image href="3.jpeg" x="50" y="50" width="400" height="400" clip-path="url(#shapeClip)">
          <animate attributeName="x" values="50;100" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y" values="50;100" dur="3s" repeatCount="indefinite" />
        </image>


        <animate href="#clipPath" attributeName="d"
          from="M102.043 89.8946 L102.043 20 L200.778 20.4661 L200.778 89.8946 Z"
          to="M383.858 289.8946L302.043 289.1182L400.778 220.4661L383.858 289.8946Z"
          dur="10s" repeatCount="indefinite" />
      </svg>

=====================================

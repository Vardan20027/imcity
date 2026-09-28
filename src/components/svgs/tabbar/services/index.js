import * as React from 'react';
import Svg, { G, Rect, Defs, ClipPath, Path } from 'react-native-svg';
import { normalize } from '../../../../assets/deviceInfo/normalize';


function TabServicesIcon({ width, height, color }) {
  const stroke = color || '#8E8C8C';
  return (
      <Svg
          width={width || normalize(24)}
          height={height || normalize(24)}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <G
            clipPath="url(#clip0_6242_18933)"
            fill="#fff"
            stroke={stroke}
            strokeWidth={2}
        >
          <Rect x={2} y={1} width={11.4016} height={17.2002} rx={4} />
          <Rect x={10.0391} y={5.7998} width={11.4016} height={17.2002} rx={4} />
        </G>
        <Defs>
          <ClipPath id="clip0_6242_18933">
            <Path fill="#fff" d="M0 0H24V24H0z" />
          </ClipPath>
        </Defs>
      </Svg>
  )
}

export default TabServicesIcon

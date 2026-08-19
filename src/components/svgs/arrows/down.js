import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function ArrowDown({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(16)}
      height={height || normalize(16)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4 6l4 4 4-4"
        stroke={color || "#1E1E1E"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowDown;

import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function WhiteLogo({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(176)}
      height={height || normalize(124)}
      viewBox="0 0 176 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect y={32.1482} width={43.3089} height={91.8519} rx={10} fill={color || "#fff"} />
      <Rect width={43.3089} height={27.5556} rx={10} fill={color || "#fff"} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M161.067 2.036c6.667-3.78 14.932 1.036 14.932 8.7V114c0 5.523-4.477 10-10 10H61.602c-5.523 0-10-4.477-10-10V10.736c0-7.663 8.265-12.479 14.931-8.7l42.335 24.002a10 10 0 009.864 0l42.335-24.002zM99.675 88.178a2 2 0 00-2 2v8.86a2 2 0 002 1.999h8.9a2 2 0 002-2v-8.859a2 2 0 00-2-2h-8.9zm41.467-26.637a2 2 0 00-2 2V72.4a2 2 0 002 2h8.9a2 2 0 002-2V63.54a2 2 0 00-2-2h-8.9zM76.639 48.682a2 2 0 00-2 2v8.86a2 2 0 002 2h8.9a2 2 0 002-2v-8.86a2 2 0 00-2-2h-8.9z"
        fill={color || "#fff"}
      />
    </Svg>
  );
}

export default WhiteLogo;

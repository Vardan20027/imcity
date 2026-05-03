import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function RomanceIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(19)}
      height={height || normalize(18)}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.61.758c1.983 1.156 3.378 3.502 3.317 6.239-.131 5.78-8.043 10.039-9.463 10.039S.132 12.776.002 6.996C-.06 4.26 1.335 1.916 3.318.759c1.855-1.08 4.185-1.086 6.146.508C11.425-.328 13.755-.323 15.61.758z"
        fill={color || '#979797'}
      />
    </Svg>
  );
}

export default RomanceIcon;

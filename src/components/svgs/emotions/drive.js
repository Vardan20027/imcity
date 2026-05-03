import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function DriveIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(12)}
      height={height || normalize(18)}
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.992 17.03a6.03 6.03 0 01-3.367-1.027 5.95 5.95 0 01-2.203-2.725 5.893 5.893 0 01-.278-3.481 5.928 5.928 0 011.743-3.035C2.959 5.762 5.592 3.96 5.193 0c4.794 3.168 7.19 6.337 2.397 11.09.799 0 1.997 0 3.995-1.957.215.612.399 1.27.399 1.956a5.915 5.915 0 01-1.755 4.201 6.018 6.018 0 01-4.237 1.74z"
        fill={color || '#979797'}
      />
    </Svg>
  );
}

export default DriveIcon;

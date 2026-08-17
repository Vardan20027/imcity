import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function CheckMarkIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(24)}
      height={height || normalize(24)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M21.382 4.546a2.016 2.016 0 01.079 2.827L10.28 19.375A1.975 1.975 0 018.872 20a1.95 1.95 0 01-1.423-.585l-5.92-6.001a2.016 2.016 0 01.048-2.778 1.958 1.958 0 012.74-.049l4.487 4.544 9.788-10.505a1.959 1.959 0 012.79-.08z"
        fill={color || "#FF8700"}
      />
    </Svg>
  );
}

export default CheckMarkIcon;

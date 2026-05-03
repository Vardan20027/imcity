import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function CalmIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(19)}
      height={height || normalize(19)}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.083 4.78C5.633 6.694 3.662 12.593 1.71 17.537l1.774.63.892-2.198c.45.162.92.287 1.258.287C15.961 16.255 18.778 0 18.778 0c-.94 1.912-7.511 2.151-12.206 3.107C1.878 4.064 0 8.127 0 10.04c0 1.912 1.643 3.585 1.643 3.585 3.051-8.844 12.44-8.844 12.44-8.844z"
        fill={color || '#979797'}
      />
    </Svg>
  );
}

export default CalmIcon;

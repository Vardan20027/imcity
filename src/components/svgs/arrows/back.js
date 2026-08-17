import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function ArrowBack({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(20)}
      height={height || normalize(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.737 18.448l-7.684-7.809a.91.91 0 010-1.28l7.683-7.807a.917.917 0 00-.29-1.483.883.883 0 00-.975.198L5.788 8.073a2.75 2.75 0 000 3.853l7.683 7.806a.883.883 0 001.266 0 .917.917 0 000-1.284z"
        fill={color || "#3C3C3C"}
      />
    </Svg>
  );
}

export default ArrowBack;

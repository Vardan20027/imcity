import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function DiscoveryIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(13)}
      height={height || normalize(18)}
      viewBox="0 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.125 12.04l-.103.258a8.964 8.964 0 01-5.68 0l-.102-.258c-.098-.237-.148-.356-.233-.465-.085-.11-.233-.222-.53-.443a6.183 6.183 0 117.41 0c-.296.221-.444.332-.529.443-.084.11-.134.227-.233.465zm-5.158 2.556c.09.544.14 1.093.153 1.646a.402.402 0 00.22.353 4.122 4.122 0 003.686 0 .401.401 0 00.22-.353c.012-.553.063-1.102.152-1.646-1.462.3-2.97.3-4.43 0z"
        fill={color || '#979797'}
      />
    </Svg>
  );
}

export default DiscoveryIcon;

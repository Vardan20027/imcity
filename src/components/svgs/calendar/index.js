import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function CalendarIcon({width, height, color}) {
  return (
    <Svg
      width={width || normalize(24)}
      height={height || normalize(24)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9 12H7.5c-.827 0-1.5.673-1.5 1.5V15c0 .827.673 1.5 1.5 1.5H9c.827 0 1.5-.673 1.5-1.5v-1.5c0-.827-.673-1.5-1.5-1.5zm-1.5 3v-1.5H9V15H7.5zm9.75-10.5h-.75v-.75a.75.75 0 10-1.5 0v.75H9v-.75a.75.75 0 10-1.5 0v.75h-.75A3.754 3.754 0 003 8.25v9A3.754 3.754 0 006.75 21h10.5A3.754 3.754 0 0021 17.25v-9a3.754 3.754 0 00-3.75-3.75zM6.75 6h10.5c1.24 0 2.25 1.01 2.25 2.25V9h-15v-.75C4.5 7.01 5.51 6 6.75 6zm10.5 13.5H6.75c-1.24 0-2.25-1.01-2.25-2.25V10.5h15v6.75c0 1.24-1.01 2.25-2.25 2.25z"
        fill={color || "#747474"}
      />
    </Svg>
  );
}

export default CalendarIcon;

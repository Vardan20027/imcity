import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import {normalize} from "../../../assets/deviceInfo/normalize";

function SearchIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(21)}
      height={height || normalize(20)}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19.165 19l-4.383-4.343m0 0a7.996 7.996 0 001.75-2.595 7.937 7.937 0 000-6.123c-.406-.971-1-1.853-1.75-2.596a8.08 8.08 0 00-2.62-1.734 8.137 8.137 0 00-6.178 0c-.98.402-1.87.991-2.62 1.734A7.964 7.964 0 001 9c0 2.122.85 4.157 2.365 5.657A8.11 8.11 0 009.073 17a8.11 8.11 0 005.709-2.343z"
        stroke={color || "#B2B2B2"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SearchIcon;

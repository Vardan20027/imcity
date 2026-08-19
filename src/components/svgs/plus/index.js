import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import {normalize} from "../../../assets/deviceInfo/normalize";

function PlusIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(16)}
      height={height || normalize(16)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.857 9.643a.5.5 0 00-.5-.5H.5a.5.5 0 01-.5-.5V7.357a.5.5 0 01.5-.5h5.857a.5.5 0 00.5-.5V.5a.5.5 0 01.5-.5h1.286a.5.5 0 01.5.5v5.857a.5.5 0 00.5.5H15.5a.5.5 0 01.5.5v1.286a.5.5 0 01-.5.5H9.643a.5.5 0 00-.5.5V15.5a.5.5 0 01-.5.5H7.357a.5.5 0 01-.5-.5V9.643z"
        fill={color || "#5A5A5A"}
      />
    </Svg>
  );
}

export default PlusIcon;

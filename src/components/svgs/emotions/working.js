import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function WorkingIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(17)}
      height={height || normalize(15)}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.444 14.183c-.412 0-.755-.137-1.03-.41A1.385 1.385 0 010 12.75V4.092c0-.409.138-.75.414-1.022.276-.273.619-.41 1.03-.41H5.36V1.431c0-.408.138-.749.414-1.022.276-.274.62-.41 1.03-.41H9.28a1.406 1.406 0 011.444 1.432v1.227h3.918c.41 0 .754.137 1.03.41.274.274.412.615.413 1.023v8.66c0 .407-.138.748-.414 1.021a1.4 1.4 0 01-1.03.41H1.445zm4.81-11.524H9.83V1.432a.521.521 0 00-.172-.375.522.522 0 00-.378-.17H6.804a.53.53 0 00-.378.17.515.515 0 00-.171.375v1.227z"
        fill={color || '#979797'}
      />
    </Svg>
  );
}

export default WorkingIcon;

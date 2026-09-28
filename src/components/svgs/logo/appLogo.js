import * as React from 'react';
import Svg, {
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

function AppLogo({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(32)}
      height={height || normalize(32)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Ellipse
        cx={6.49731}
        cy={12.9897}
        rx={6.49731}
        ry={12.9897}
        transform="rotate(-45.024 13.502 5.596)"
        fill="#000"
      />
      <Path
        d="M27.761 6.243c-1.474-1.476-3.899-1.53-6.448-.68-2.58.86-5.453 2.692-8.032 5.272-2.578 2.58-4.408 5.457-5.268 8.04-.85 2.55-.795 4.978.679 6.453 1.474 1.475 3.899 1.53 6.447.68 2.581-.861 5.455-2.693 8.034-5.273 2.578-2.58 4.407-5.457 5.267-8.04.849-2.55.795-4.977-.679-6.452z"
        fill="url(#paint0_linear_6165_18306)"
        stroke="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_6165_18306"
          x1={22.8188}
          y1={20.3814}
          x2={13.6263}
          y2={11.1967}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF003B" />
          <Stop offset={1} stopColor="#FF8700" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default AppLogo;

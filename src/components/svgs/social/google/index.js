import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../../assets/deviceInfo/normalize';

function GoogleIcon({ width, height, color }) {
  return (
    <Svg
      width={width || normalize(24)}
      height={height || normalize(24)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        opacity={0.987}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.585.104c1.288-.139 2.05-.139 3.433 0a11.83 11.83 0 016.483 3.121 175.086 175.086 0 00-3.527 3.31c-2.222-1.817-4.701-2.237-7.439-1.258-2.008.891-3.407 2.337-4.195 4.335A138.064 138.064 0 011.524 6.77a.476.476 0 00-.284-.047C3.233 3.012 6.347.806 10.583.102"
        fill={color || '#F44336'}
      />
      <Path
        opacity={0.997}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.237 6.722c.1-.015.196 0 .286.047 1.254.969 2.526 1.917 3.815 2.843-.203.779-.33 1.574-.382 2.375.044.775.171 1.536.382 2.283l-4.005 3.078c-1.745-3.519-1.777-7.06-.096-10.626z"
        fill={color || '#FFC107'}
      />
      <Path
        opacity={0.999}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.312 21.077a45.97 45.97 0 00-3.911-2.984c1.361-.929 2.188-2.202 2.48-3.821h-6.674V9.797c3.848-.03 7.695 0 11.54.095.73 3.824-.113 7.272-2.527 10.345-.288.294-.592.575-.908.84z"
        fill={color || '#448AFF'}
      />
      <Path
        opacity={0.993}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.337 14.272c1.457 3.495 4.127 5.126 8.011 4.894a7.158 7.158 0 003.051-1.073 46.645 46.645 0 013.912 2.984 11.977 11.977 0 01-7.153 2.888c-.603.047-1.209.047-1.812 0-4.52-.515-7.859-2.72-10.014-6.617l4.005-3.076z"
        fill={color || '#43A047'}
      />
    </Svg>
  );
}

export default GoogleIcon;

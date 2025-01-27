import * as React from "react";
import Svg, { Defs, G, Path, Rect } from "react-native-svg";

import { ISVG } from ".../../../src/type/svg/assets";

const UnselectCheckbox = (props: ISVG) => (
  <Svg width="800px" height="800px" viewBox="0 0 20 20" {...props}>
    <G
      id="Free-Icons"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        transform="translate(-747.000000, -526.000000)"
        id="Group"
        stroke={props.color}
        strokeWidth={1}
      >
        <G transform="translate(745.000000, 524.000000)" id="Shape">
          <Path d="M5.16000009,3 L18.8399999,3 C20.032935,3 21,3.96706498 21,5.16000009 L21,18.8399999 C21,20.032935 20.032935,21 18.8399999,21 L5.16000009,21 C3.96706498,21 3,20.032935 3,18.8399999 L3,5.16000009 C3,3.96706498 3.96706498,3 5.16000009,3 Z" />
        </G>
      </G>
    </G>
  </Svg>
);
export default UnselectCheckbox;

import * as React from "react";
import Svg, { Defs, G, Path, Polyline } from "react-native-svg";
import { ISVG } from ".../../../src/type/svg/assets";

const close = (props: ISVG) => (
  <Svg width={props.width} height={props.height} viewBox="0 0 20 20" {...props}>
    <G id="layer1">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={props.color}
        strokeWidth={1}
        strokeLinecap="round"
      />
    </G>
  </Svg>
);
export default close;

import * as React from "react";
import Svg, { Defs, G, Path, Polyline } from "react-native-svg";
import { ISVG } from ".../../../src/type/svg/assets";

const DownArrow = (props: ISVG) => (
  <Svg width={props.width} height={props.height} viewBox="0 0 20 20" {...props}>
    <G id="layer1">
      <Path
        d="M 4 6.2910156 L 3.2910156 7 L 3.6464844 7.3535156 L 10 13.708984 L 16.353516 7.3535156 L 16.708984 7 L 16 6.2910156 L 15.646484 6.6464844 L 10 12.291016 L 4.3535156 6.6464844 L 4 6.2910156 z "
        fill={props.color}
        fillOpacity={1}
        stroke="none"
        strokeWidth={0}
      />
    </G>
  </Svg>
);
export default DownArrow;

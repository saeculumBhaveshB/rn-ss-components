import { StyleProp, ViewStyle } from "react-native";

export interface ISVG {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  fillColor?: string;
}

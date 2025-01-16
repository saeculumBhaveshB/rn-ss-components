import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Button } from "react-native-paper";

type ButtonMode = "text" | "outlined" | "contained";

interface CustomButtonProps {
  title: string; // Button text
  mode?: ButtonMode; // Button style: text, outlined, contained
  onPress: () => void; // Callback function for press
  disabled?: boolean; // Disable button
  loading?: boolean; // Show loading spinner
  icon?: string | undefined; // Optional icon
  style?: StyleProp<ViewStyle>; // Custom button container style
  labelStyle?: StyleProp<TextStyle>; // Custom button label style
  contentStyle?: StyleProp<ViewStyle>; // Custom button content style
  color?: string; // Custom button background color
  textColor?: string; // Custom button text color
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  mode = "contained", // Default to "contained"
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  labelStyle,
  contentStyle,
  color, // Custom background color
  textColor, // Custom text color
}) => {
  // Combine default styles with user-provided styles
  const buttonStyles = [
    styles.button,
    style, // External custom styles
    color ? { backgroundColor: color } : {}, // Override background color if provided
  ];

  const labelStyles = [
    styles.label,
    labelStyle, // External custom label styles
    textColor ? { color: textColor } : {}, // Override text color if provided
  ];

  return (
    <Button
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      icon={icon}
      style={buttonStyles}
      labelStyle={labelStyles}
      contentStyle={[styles.content, contentStyle]}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#6200ee", // Default background color
  },
  label: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#ffffff", // Default text color
  },
  content: {
    height: 48,
  },
});

export { CustomButton };

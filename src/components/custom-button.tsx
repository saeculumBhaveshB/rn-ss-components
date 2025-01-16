import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Button, useTheme } from "react-native-paper";

type ButtonMode = "text" | "outlined" | "contained";

interface CustomButtonProps {
  title: string;
  mode?: ButtonMode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string | undefined;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  color?: string;
  textColor?: string;
  accessibilityLabel?: string; // For accessibility support
  testID?: string; // For testing frameworks
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  mode = "contained",
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  labelStyle,
  contentStyle,
  color,
  textColor,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme(); // Use theme for default colors

  const buttonStyles = StyleSheet.flatten([
    styles.button,
    style,
    color
      ? { backgroundColor: color }
      : { backgroundColor: theme.colors.primary }, // Default to theme color
  ]);

  const labelStyles = StyleSheet.flatten([
    styles.label,
    labelStyle,
    textColor ? { color: textColor } : { color: theme.colors.onPrimary }, // Default to theme text color
  ]);

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
      accessibilityLabel={accessibilityLabel}
      testID={testID}
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

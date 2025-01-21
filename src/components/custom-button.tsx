import React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next"; // Multi-language support
import { useAppTheme } from "../theme/theme-provider"; // Access theme

type ButtonMode = "text" | "outlined" | "contained";

interface CustomButtonProps {
  titleKey?: string; // Translation key for button text
  title?: string; // Direct text if no translation key
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
  titleKey,
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
}) => {
  const { t } = useTranslation(); // Multi-language support
  const { theme } = useAppTheme(); // Access theme

  // Resolve translation key or use direct title
  const resolvedTitle = titleKey ? t(titleKey) : title;

  const buttonStyles = [
    styles.button,
    style,
    color
      ? { backgroundColor: color }
      : { backgroundColor: theme.primaryColor },
  ];

  const labelStyles = [
    styles.label,
    labelStyle,
    textColor ? { color: textColor } : { color: theme.text },
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
      {resolvedTitle}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  content: {
    height: 48,
  },
});

export { CustomButton };

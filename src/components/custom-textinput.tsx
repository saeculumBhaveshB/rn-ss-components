import React from "react";
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import { useTranslation } from "react-i18next"; // For multi-language support
import { useAppTheme } from "../theme/theme-provider"; // For theme support
import { getCurrentTime } from "../utils/time"; // For timezone support

type InputMode = "flat" | "outlined";

interface CustomTextInputProps {
  value: string; // Controlled value
  onChangeText: (text: string) => void; // Callback for text change
  placeholderKey?: string; // Translation key for placeholder
  labelKey?: string; // Translation key for label
  mode?: InputMode; // Input mode: flat or outlined
  disabled?: boolean; // Disable input
  error?: boolean; // Show error state
  multiline?: boolean; // Allow multiple lines
  numberOfLines?: number; // Number of lines for multiline input
  style?: StyleProp<ViewStyle>; // Custom container style
  inputStyle?: StyleProp<TextStyle>; // Custom input text style
  themeColor?: string; // Override primary branding color
  placeholderTextColor?: string; // Override placeholder text color
  timezone?: string; // Timezone for dynamic placeholder
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholderKey,
  labelKey,
  mode = "outlined",
  disabled = false,
  error = false,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  themeColor,
  placeholderTextColor,
  timezone,
}) => {
  const { t } = useTranslation(); // Translation function
  const { theme } = useAppTheme(); // Access app's theme

  // Determine placeholder text based on multi-language or timezone
  const placeholder = placeholderKey
    ? t(placeholderKey) // Translate using i18n
    : timezone
    ? `Time: ${getCurrentTime(timezone)}` // Dynamic timezone placeholder
    : "Enter text"; // Default placeholder

  // Determine label text based on multi-language
  const label = labelKey ? t(labelKey) : "";

  return (
    <PaperTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      label={label}
      mode={mode}
      disabled={disabled}
      error={error}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[styles.container, style]} // Combine default and custom styles
      underlineColor={themeColor || theme.primaryColor} // Branding underline color
      outlineColor={themeColor || theme.primaryColor} // Branding outline color
      placeholderTextColor={placeholderTextColor || theme.text} // Branding placeholder text color
      theme={{
        colors: {
          primary: themeColor || theme.primaryColor, // Branding primary color
          placeholder: placeholderTextColor || theme.text, // Placeholder color
          text: theme.text, // Input text color
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});

export { CustomTextInput };

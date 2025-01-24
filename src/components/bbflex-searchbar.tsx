import React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Searchbar as PaperSearchBar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../theme/theme-provider";
import { getCurrentTime } from "../utils/time";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { hp, wp } from "react-native-super-responsive";

interface BBFlexSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholderKey?: string;
  timezone?: string;
  onIconPress?: () => void;
  onClearIconPress?: () => void;
  icon?: IconSource; // Support SVG or other icons
  clearIcon?: IconSource; // Support SVG or other icons
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  themeColor?: string;
  placeholderTextColor?: string;
}

const BBFlexSearchBar: React.FC<BBFlexSearchBarProps> = ({
  value,
  onChangeText,
  placeholderKey,
  timezone,
  onIconPress,
  onClearIconPress,
  icon = "magnify", // Default to MaterialCommunityIcons' "magnify"
  clearIcon = "close", // Default to MaterialCommunityIcons' "close"
  style,
  inputStyle,
  themeColor,
  placeholderTextColor,
}) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const placeholder = placeholderKey
    ? t(placeholderKey)
    : timezone
    ? `Time: ${getCurrentTime(timezone)}`
    : "Search";

  return (
    <PaperSearchBar
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onIconPress={onIconPress}
      onClearIconPress={onClearIconPress}
      icon={icon} // Pass the icon (string or ReactNode)
      clearIcon={clearIcon} // Pass the clear icon (string or ReactNode)
      style={[
        styles.container,
        style,
        {
          backgroundColor: theme.background,
          borderColor: themeColor || theme.primaryColor,
        },
      ]}
      inputStyle={[
        styles.input,
        inputStyle,
        {
          color: theme.text,
        },
      ]}
      iconColor={themeColor || theme.primaryColor}
      placeholderTextColor={placeholderTextColor || theme.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(6),
    marginVertical: hp(1),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
  },
  input: {
    fontSize: 16,
  },
});

export { BBFlexSearchBar };

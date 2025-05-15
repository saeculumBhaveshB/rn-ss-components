import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  DimensionValue,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../theme/theme-provider";
import { wp, hp, scaleFont } from "react-native-super-responsive";

import DefaultCloseIcon from "../assets/icons/svg/close";
import DefaultDownArrowIcon from "../assets/icons/svg/down-arrow";
import DefaultSelectedCheckbox from "../assets/icons/svg/select-checkbox";
import DefaultUnselectedCheckbox from "../assets/icons/svg/unselect-checkbox";
interface Option {
  label: string;
  value: string;
}

interface BBFlexNormalDropdownProps {
  options: Option[];
  selectedValue: string | string[];
  onValueChange: (value: string | string[]) => void;
  placeholder?: string;
  title?: string;
  pickerHeight?: number;
  listPosition?: "top" | "bottom" | "middle";
  enableSearch?: boolean;
  isMultiSelect?: boolean;

  // 🎨 Custom Icons with Props for Height & Width
  customDropdownIcon?: (props: {
    height?: number;
    width?: number;
    color?: string;
  }) => JSX.Element;
  customCloseIcon?: (props: {
    height?: number;
    width?: number;
    color?: string;
  }) => JSX.Element;
  customCheckboxSelected?: (props: {
    height?: number;
    width?: number;
    color?: string;
  }) => JSX.Element;
  customCheckboxUnselected?: (props: {
    height?: number;
    width?: number;
    color?: string;
  }) => JSX.Element;

  // 🎨 Custom Styles
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
  triggerTextStyle?: StyleProp<TextStyle>;
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  searchInputStyle?: StyleProp<TextStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  optionTextStyle?: StyleProp<TextStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
}

const BBFlexNormalDropdown: React.FC<BBFlexNormalDropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  title = "Dropdown",
  pickerHeight = 200,
  listPosition = "bottom",
  enableSearch = false,
  isMultiSelect = false,

  // 🎨 Custom Icons with Default Values
  customDropdownIcon = DefaultDownArrowIcon,
  customCloseIcon = DefaultCloseIcon,
  customCheckboxSelected = DefaultSelectedCheckbox,
  customCheckboxUnselected = DefaultUnselectedCheckbox,

  // 🎨 Custom Style Props
  containerStyle = {},
  titleStyle = {},
  triggerStyle = {},
  triggerTextStyle = {},
  dropdownContainerStyle = {},
  searchInputStyle = {},
  optionStyle = {},
  optionTextStyle = {},
  checkboxStyle = {},
}) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonLayout, setButtonLayout] = useState({ y: 0, height: 0 });

  const selectedValues = useMemo(
    () =>
      isMultiSelect
        ? Array.isArray(selectedValue)
          ? selectedValue
          : []
        : selectedValue,
    [selectedValue, isMultiSelect]
  );

  const filteredOptions = useMemo(
    () =>
      enableSearch
        ? options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : options,
    [options, searchQuery, enableSearch]
  );

  const handleOptionSelect = useCallback(
    (value: string) => {
      if (isMultiSelect) {
        let updatedSelection = Array.isArray(selectedValues)
          ? selectedValues.includes(value)
            ? selectedValues.filter((item) => item !== value)
            : [...selectedValues, value]
          : [];

        onValueChange(updatedSelection);
      } else {
        onValueChange(value);
        setIsListVisible(false);
      }
    },
    [onValueChange, selectedValues, isMultiSelect]
  );

  const handleButtonLayout = useCallback((event: any) => {
    const { y, height } = event.nativeEvent.layout;
    setButtonLayout({ y, height });
  }, []);

  const getDropdownPosition = () => {
    switch (listPosition) {
      case "top":
        return {
          bottom: buttonLayout.y + buttonLayout.height - 25,
          backgroundColor: "#fff",
        };
      case "middle":
        return {
          top: Math.max(
            0,
            buttonLayout.y + buttonLayout.height / 2 - pickerHeight / 2
          ),
          backgroundColor: "#fff",
        };
      case "bottom":
      default:
        return {
          top: buttonLayout.y + buttonLayout.height,
          backgroundColor: "#fff",
        };
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, { color: theme.text }, titleStyle]}>
        {t(title)}
      </Text>

      {/* Picker Trigger */}
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            borderColor: theme.borderColor,
            backgroundColor: theme.background,
          },
          triggerStyle,
        ]}
        onPress={() => setIsListVisible(!isListVisible)}
        onLayout={handleButtonLayout}
      >
        <Text
          style={[styles.triggerText, { color: theme.text }, triggerTextStyle]}
        >
          {isMultiSelect
            ? selectedValues.length > 0
              ? `${selectedValues.length} ${t("selected")}`
              : t(placeholder)
            : selectedValue || t(placeholder)}
        </Text>

        {/* Toggle Icon */}
        {isListVisible
          ? customCloseIcon({
              height: hp(1.7),
              width: hp(1.7),
              color: theme.primaryColor || "gray",
            })
          : customDropdownIcon({
              height: hp(2),
              width: hp(2),
              color: theme.primaryColor || "gray",
            })}
      </TouchableOpacity>

      {/* Dropdown List */}
      {isListVisible && (
        <View
          style={[
            styles.dropdownContainer,
            getDropdownPosition(),
            {
              maxHeight: pickerHeight,
              backgroundColor: theme.primaryColor || "white",
            },
            dropdownContainerStyle,
          ]}
        >
          {/* Search Input */}
          {enableSearch && (
            <TextInput
              style={[
                styles.searchInput,
                { color: theme.text },
                searchInputStyle,
              ]}
              placeholder={t("Search...")}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          )}

          {/* Options List */}
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => `${item.label}-${item.value}`}
            renderItem={({ item }) => {
              const isSelected = isMultiSelect
                ? Array.isArray(selectedValues) &&
                  selectedValues.includes(item.value)
                : selectedValue === item.value;

              return (
                <TouchableOpacity
                  style={[
                    styles.option,
                    isSelected && { backgroundColor: theme.primaryColor },
                    optionStyle,
                  ]}
                  onPress={() => handleOptionSelect(item.value)}
                >
                  {isMultiSelect && (
                    <View style={[styles.checkbox, checkboxStyle]}>
                      {isSelected
                        ? customCheckboxSelected({
                            height: hp(2.3),
                            width: hp(2.3),
                            color: theme.primaryColor || "black",
                          })
                        : customCheckboxUnselected({
                            height: hp(2.3),
                            width: hp(2.3),
                            color: theme.borderColor || "black",
                          })}
                    </View>
                  )}

                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                      optionTextStyle,
                    ]}
                  >
                    {t(item.label)}
                  </Text>
                </TouchableOpacity>
              );
            }}
            style={{ maxHeight: pickerHeight }}
            ListEmptyComponent={
              <Text style={[styles.noOptionsText, optionTextStyle]}>
                {t("No results found")}
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: hp(2), paddingHorizontal: wp(4) },
  noOptionsText: { textAlign: "center", marginVertical: hp(2) },
  title: {
    fontSize: scaleFont(14),
    fontWeight: "bold",
    marginBottom: hp(1),
    color: "#333",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: hp(1.5),
    borderWidth: wp(0.2),
    borderRadius: wp(1.5),
    backgroundColor: "#f9f9f9",
  },
  triggerText: { fontSize: scaleFont(14), color: "#333" },
  searchInput: {
    padding: hp(1.5),
    borderBottomWidth: wp(0.1),
    borderBottomColor: "#ddd",
    fontSize: scaleFont(14),
    color: "#333",
  },
  dropdownContainer: {
    position: "absolute",
    left: wp(4),
    right: wp(4),
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: wp(2),
    borderWidth: wp(0.2),
    borderColor: "#ccc",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp(1.3),
    borderBottomWidth: wp(0.1),
    borderBottomColor: "#ddd",
  },
  checkbox: {
    marginRight: wp(2),
  },
  selectedOption: { backgroundColor: "#f0f8ff" },
  optionText: { fontSize: scaleFont(14), color: "#333" },
  selectedOptionText: { fontWeight: "bold", color: "#007AFF" },
  noResultsText: {
    textAlign: "center",
    paddingVertical: hp(1.5),
    fontSize: scaleFont(14),
    color: "#888",
  },
});

export { BBFlexNormalDropdown };

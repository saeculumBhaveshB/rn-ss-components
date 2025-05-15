import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from "react-native";
import { useAppTheme } from "../theme/theme-provider";
import { useTranslation } from "react-i18next";
import DefaultSelectedSvg from "../assets/icons/svg/select-checkbox";
import DefaultUnselectedSvg from "../assets/icons/svg/unselect-checkbox";
import { wp, hp, scaleFont } from "react-native-super-responsive"; // Responsive styles

interface Option {
  label: string;
  value: string;
}

interface BBFlexDropdownProps {
  options: Option[];
  selectedValue: string | string[];
  onValueChange: (value: string | string[]) => void;
  placeholderKey?: string;
  placeholderSearchKey?: string;
  closeButtonTextKey?: string;
  headerTitleKey?: string;
  searchable?: boolean;
  multiSelect?: boolean;
  dropdownHeight?: number;
  modelBackgroundColor?: string;
  selectedImage?: React.ReactNode;
  unselectedImage?: React.ReactNode;
  imageWidthSize?: number;
  imageHeightSize?: number;
  checkboxImgColor?: string;
  persistSelection?: boolean;
  isRowTextColor?: boolean;
  showHeader?: boolean;
  showCloseButton?: boolean;
  enableSearch?: boolean;
  modalHeight?: DimensionValue;

  containerStyle?: StyleProp<ViewStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
  triggerTextStyle?: StyleProp<TextStyle>;
  modalOverlayStyle?: StyleProp<ViewStyle>;
  modalContentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerCloseStyle?: StyleProp<TextStyle>;
  searchBarStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  optionTextStyle?: StyleProp<TextStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  closeButtonTextStyle?: StyleProp<TextStyle>;
}

const BBFlexDropdown: React.FC<BBFlexDropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholderKey = "dropdown.placeholder",
  placeholderSearchKey = "dropdown.search",
  closeButtonTextKey = "dropdown.close",
  headerTitleKey = "dropdown.header",
  searchable = true,
  multiSelect = false,
  dropdownHeight = 200,
  modelBackgroundColor = "",
  selectedImage,
  unselectedImage,
  imageWidthSize = 20,
  imageHeightSize = 20,
  checkboxImgColor = "",
  persistSelection = false,
  isRowTextColor = false,
  showHeader = true,
  showCloseButton = true,
  enableSearch = true,

  modalHeight = "36%",
  containerStyle,
  triggerStyle,
  triggerTextStyle,
  modalOverlayStyle,
  modalContentStyle,
  headerStyle,
  headerTitleStyle,
  headerCloseStyle,
  searchBarStyle,
  optionStyle,
  optionTextStyle,
  closeButtonStyle,
  closeButtonTextStyle,
}) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedValues = Array.isArray(selectedValue)
    ? selectedValue
    : [selectedValue];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (value: string) => {
    if (multiSelect) {
      const updatedSelection = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];
      onValueChange(updatedSelection);
    } else {
      onValueChange(value);
      setModalVisible(false);
    }
    setSearchQuery("");
  };

  const renderHeader = () =>
    showHeader && (
      <View
        style={[
          styles.header,
          { backgroundColor: theme.primaryColor },
          headerStyle,
        ]}
      >
        <Text
          style={[styles.headerTitle, { color: theme.text }, headerTitleStyle]}
        >
          {t(headerTitleKey)}
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text
            style={[
              styles.headerClose,
              { color: theme.text },
              headerCloseStyle,
            ]}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>
    );

  const renderSearchBar = () => {
    if (!enableSearch || !searchable) return null;

    return (
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t(placeholderSearchKey)}
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.borderColor,
          },
        ]}
        placeholderTextColor={theme.text}
      />
    );
  };

  const renderOptions = () => (
    <FlatList
      data={filteredOptions}
      keyExtractor={(item) => `${item.label}-${item.value}`}
      renderItem={({ item }) => {
        const isChecked = selectedValues.includes(item.value);
        const isSelected = multiSelect
          ? persistSelection && isChecked
          : persistSelection && selectedValue === item.value;

        return (
          <TouchableOpacity
            style={[
              styles.option,
              isSelected && { backgroundColor: `${theme.primaryColor}33` },
              optionStyle,
            ]}
            onPress={() => toggleOption(item.value)}
          >
            {multiSelect &&
              (isChecked
                ? selectedImage || (
                    <DefaultSelectedSvg
                      width={imageWidthSize}
                      height={imageHeightSize}
                      color={checkboxImgColor || theme.primaryColor}
                    />
                  )
                : unselectedImage || (
                    <DefaultUnselectedSvg
                      width={imageWidthSize}
                      height={imageHeightSize}
                      color={checkboxImgColor || theme.text}
                    />
                  ))}
            <Text
              style={[
                styles.optionText,
                {
                  color: (isRowTextColor ? isChecked : isSelected)
                    ? theme.primaryColor
                    : theme.text,
                },
                optionTextStyle,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
      style={{ maxHeight: dropdownHeight }}
      ListEmptyComponent={
        <Text style={[styles.noOptionsText, optionTextStyle]}>
          {t("No results found")}
        </Text>
      }
    />
  );

  const renderCloseButton = () =>
    showCloseButton && (
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={[
          styles.closeButton,
          { backgroundColor: theme.primaryColor },
          closeButtonStyle,
        ]}
      >
        <Text
          style={[
            styles.closeButtonText,
            { color: theme.text },
            closeButtonTextStyle,
          ]}
        >
          {t(closeButtonTextKey)}
        </Text>
      </TouchableOpacity>
    );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            backgroundColor: theme.background,
            borderColor: theme.borderColor,
          },
          triggerStyle,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[styles.triggerText, { color: theme.text }, triggerTextStyle]}
        >
          {multiSelect
            ? `${selectedValues.length} selected`
            : selectedValue || t(placeholderKey)}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalOverlay, modalOverlayStyle]}>
          {renderHeader()}
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: modelBackgroundColor || theme.background,
                height: modalHeight,
              },
              modalContentStyle,
            ]}
          >
            {renderSearchBar()}
            {renderOptions()}
            {renderCloseButton()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: hp(1) },
  trigger: { padding: hp(1.5), borderWidth: wp(0.5), borderRadius: wp(2) },
  triggerText: { fontSize: scaleFont(12) },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    borderBottomLeftRadius: wp(2),
    borderBottomRightRadius: wp(2),
    padding: wp(4),
  },
  searchBar: {
    marginBottom: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderWidth: wp(0.5),
    borderRadius: wp(2),
  },
  option: {
    padding: wp(3),
    borderBottomWidth: wp(0.2),
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: { marginLeft: wp(2), fontSize: scaleFont(12) },
  noOptionsText: { textAlign: "center", marginVertical: hp(2) },
  closeButton: {
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: wp(2),
    alignItems: "center",
  },
  closeButtonText: { fontWeight: "bold", fontSize: scaleFont(16) },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: hp(1.5),
    borderBottomWidth: wp(0.2),
    borderBottomColor: "#ccc",
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  headerTitle: { fontSize: scaleFont(16), fontWeight: "bold" },
  headerClose: { fontSize: scaleFont(16), fontWeight: "bold" },
});

export { BBFlexDropdown };

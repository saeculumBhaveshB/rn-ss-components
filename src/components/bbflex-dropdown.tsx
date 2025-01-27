import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { useAppTheme } from "../theme/theme-provider"; // Custom theme provider
import DefaultSelectedSvg from "../assets/icons/svg/select-checkbox"; // Default selected icon
import DefaultUnselectedSvg from "../assets/icons/svg/unselect-checkbox"; // Default unselected icon

interface Option {
  label: string;
  value: string;
}

interface BBFlexDropdownProps {
  options: Option[]; // Dropdown options
  selectedValue: string | string[]; // Selected value(s)
  onValueChange: (value: string | string[]) => void; // Callback for value change
  placeholder?: string; // Placeholder text
  searchable?: boolean; // Enable search functionality
  multiSelect?: boolean; // Enable multi-select functionality
  dropdownHeight?: number; // Maximum height for the dropdown list
  closeButtonText?: string; // Custom text for the modal close button
  modelBackgroundColor?: string; // Custom modal background color
  selectedImage?: React.ReactNode; // Custom selected SVG/image
  unselectedImage?: React.ReactNode; // Custom unselected SVG/image
  imageWidthSize?: number; // Size of the custom/default images
  imageHeightSize?: number; // Size of the custom/default images
  checkboxImgColor?: string; // Size of the custom/default images
  persistSelection?: boolean; // New prop for persistent selection
  isRowTextColor?: boolean; // New prop for persistent selection
}

const BBFlexDropdown: React.FC<BBFlexDropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  searchable = true,
  multiSelect = false,
  dropdownHeight = 200,
  closeButtonText = "Close",
  modelBackgroundColor = "",
  selectedImage, // Custom selected SVG/image
  unselectedImage, // Custom unselected SVG/image
  imageWidthSize = 20, // Default image size
  imageHeightSize = 20, // Default image size
  checkboxImgColor = "",
  persistSelection = false, // New prop for persistent selection
  isRowTextColor = false, // New prop for persistent selection
}) => {
  const { theme } = useAppTheme(); // Access theme
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure selectedValue is an array for multi-select
  const selectedValues = Array.isArray(selectedValue)
    ? selectedValue
    : [selectedValue];

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionToggle = (value: string) => {
    if (multiSelect) {
      const updatedSelection = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];
      onValueChange(updatedSelection);
    } else {
      onValueChange(value);
      setModalVisible(false); // Close the modal for single-select
    }
    setSearchQuery(""); // Clear the search query
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Trigger */}
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            backgroundColor: theme.background,
            borderColor: theme.borderColor,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.triggerText, { color: theme.text }]}>
          {multiSelect
            ? `${selectedValues.length} selected`
            : selectedValue || placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal for Dropdown Options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View
          style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.5)" }]}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor:
                  modelBackgroundColor !== ""
                    ? modelBackgroundColor
                    : theme.background,
              },
            ]}
          >
            {/* Search Bar */}
            {searchable && (
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search..."
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
            )}

            {/* Options List */}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isChecked = selectedValues.includes(item.value);

                const isSelected = multiSelect
                  ? persistSelection && isChecked // Multi-select logic
                  : persistSelection && selectedValue === item.value; // Single-select with persistSelection logic
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && {
                        backgroundColor: theme.primaryColor + "33", // Highlight the row
                      },
                    ]}
                    onPress={() => handleOptionToggle(item.value)}
                  >
                    {/* Render custom or default icons for multi-select */}
                    {multiSelect && (
                      <>
                        {isChecked ? (
                          selectedImage ? (
                            selectedImage
                          ) : (
                            <DefaultSelectedSvg
                              width={imageWidthSize}
                              height={imageHeightSize}
                              color={checkboxImgColor || theme.primaryColor}
                            />
                          )
                        ) : unselectedImage ? (
                          unselectedImage
                        ) : (
                          <DefaultUnselectedSvg
                            width={imageWidthSize}
                            height={imageHeightSize}
                            color={checkboxImgColor || theme.text}
                          />
                        )}
                      </>
                    )}
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: (isRowTextColor ? isChecked : isSelected)
                            ? theme.primaryColor
                            : theme.text,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              style={{ maxHeight: dropdownHeight }}
              ListEmptyComponent={
                <Text style={[styles.noOptionsText, { color: theme.text }]}>
                  No options found
                </Text>
              }
            />

            {/* Close Button */}
            <TouchableOpacity
              onPress={handleCloseModal}
              style={[
                styles.closeButton,
                { backgroundColor: theme.primaryColor },
              ]}
            >
              <Text style={[styles.closeButtonText, { color: theme.text }]}>
                {closeButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  trigger: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  triggerText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
  },
  searchBar: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  noOptionsText: {
    textAlign: "center",
    marginVertical: 8,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});

export { BBFlexDropdown };

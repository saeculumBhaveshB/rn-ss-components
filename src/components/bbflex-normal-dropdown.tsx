import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";

interface PickerOption {
  label: string;
  value: string;
}

interface BBFlexNormalDropdownProps {
  options: PickerOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  pickerHeight?: number;
  listPosition?: "top" | "bottom" | "middle";
  enableSearch?: boolean; // Enable search functionality
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
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ y: 0, height: 0 });
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const windowHeight = Dimensions.get("window").height;

  // Handle search filtering
  const filteredOptions = enableSearch
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleOptionSelect = (value: string) => {
    onValueChange(value);
    setIsListVisible(false);
    setSearchQuery(""); // Clear search query after selection
  };

  const handleButtonLayout = (event: any) => {
    const { y, height } = event.nativeEvent.layout;
    setButtonLayout({ y, height });
  };

  const dropdownPositionStyles = () => {
    switch (listPosition) {
      case "top":
        return { bottom: buttonLayout.y + 16 };
      case "middle":
        return {
          top: Math.max(
            0,
            buttonLayout.y + buttonLayout.height / 2 - pickerHeight / 2
          ),
        };
      case "bottom":
      default:
        return { top: buttonLayout.y + buttonLayout.height };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Picker Trigger */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setIsListVisible(!isListVisible)}
        onLayout={handleButtonLayout}
      >
        <Text style={styles.triggerText}>{selectedValue || placeholder}</Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      {isListVisible && (
        <View style={[styles.dropdownContainer, dropdownPositionStyles()]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={() => setIsListVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.listContainer, { maxHeight: pickerHeight }]}>
            {/* Search Bar */}
            {enableSearch && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            )}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === item.value && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noResultsText}>No results found</Text>
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  trigger: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  triggerText: {
    fontSize: 14,
    color: "#333",
  },
  dropdownContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 1,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 14,
    color: "#333",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  noResultsText: {
    textAlign: "center",
    // marginTop: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#888",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    backgroundColor: "red",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default BBFlexNormalDropdown;

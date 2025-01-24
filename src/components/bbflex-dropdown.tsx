import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Checkbox } from "react-native-paper";

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
}

const BBFlexDropdown: React.FC<BBFlexDropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  searchable = true,
  multiSelect = false,
}) => {
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
      // Toggle selected options for multi-select
      const updatedSelection = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];
      onValueChange(updatedSelection);
    } else {
      // Update single selected value
      onValueChange(value);
      setModalVisible(false); // Close the modal for single-select
    }
    setSearchQuery(""); // Clear the search query
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    setSearchQuery(""); // Clear the search query
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Trigger */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.triggerText}>
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
        onRequestClose={handleCloseModal} // Clear search when modal is closed
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Search Bar */}
            {searchable && (
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search..."
                style={styles.searchBar}
                placeholderTextColor="#aaa"
              />
            )}

            {/* Options List */}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionToggle(item.value)}
                >
                  {multiSelect && (
                    <Checkbox
                      status={
                        selectedValues.includes(item.value)
                          ? "checked"
                          : "unchecked"
                      }
                      color="#6200ee"
                    />
                  )}
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noOptionsText}>No options found</Text>
              }
            />

            {/* Close Button */}
            <TouchableOpacity
              onPress={handleCloseModal} // Clear search when modal is closed
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
    borderColor: "#6200ee",
    backgroundColor: "#fff",
  },

  triggerText: {
    color: "#000",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },

  searchBar: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#000",
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    color: "#000",
    marginLeft: 8,
  },

  noOptionsText: {
    textAlign: "center",
    marginVertical: 8,
    color: "#aaa",
  },

  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#6200ee",
    borderRadius: 8,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export { BBFlexDropdown };

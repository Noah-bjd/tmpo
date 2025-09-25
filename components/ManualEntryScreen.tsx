import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { ArrowLeft, Calendar as CalendarIcon, X } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

interface ManualEntryScreenProps {
  onBack: () => void;
}

export function ManualEntryScreen({ onBack }: ManualEntryScreenProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [actionType, setActionType] = useState<string | undefined>(undefined);
  const [mealType, setMealType] = useState<string | undefined>(undefined);

  const handleReset = () => {
    setNom("");
    setPrenom("");
    setDate(undefined);
    setActionType(undefined);
    setMealType(undefined);
  };

  const handleAdd = () => {
    console.log({ nom, prenom, date, actionType, mealType });
  };

  // Dropdown items
  const actionItems = [
    { label: "Repas", value: "meal" },
    { label: "Check-In", value: "checkin" },
    { label: "Check-Out", value: "checkout" },
    { label: "Événement", value: "event" },
  ];

  const mealItems = [
    { label: "Petit-déjeuner", value: "breakfast" },
    { label: "Déjeuner", value: "lunch" },
    { label: "Dîner", value: "dinner" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft color="#6B7280" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manual Entry</Text>
      </View>

      {/* Form */}
      <ScrollView
        style={styles.form}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Nom */}
        <View style={styles.field}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Entrez le nom"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Prénom */}
        <View style={styles.field}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Entrez le prénom"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Date */}
        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CalendarIcon
                color="#6B7280"
                size={18}
                style={{ marginRight: 8 }}
              />
              <Text style={date ? styles.valueText : styles.placeholderText}>
                {date ? date.toDateString() : "Sélectionnez une date"}
              </Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </View>

        {/* Type of Action with X icon */}
        <View style={styles.field}>
          <Text style={styles.label}>Type of Action</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={actionType}
              onValueChange={(val) => setActionType(val)}
              style={styles.pickerWithPadding} // <-- extra right padding
            >
              <Picker.Item
                label="Sélectionnez le type d'action"
                value={undefined}
                color="#9CA3AF"
              />
              {actionItems.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>

            {actionType && (
              <TouchableOpacity
                style={styles.clearIconFixed} // <-- positioned far right
                onPress={() => {
                  setActionType(undefined);
                  setMealType(undefined);
                }}
              >
                <X color="#6B7280" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>


        {/* Meal Type (conditional) */}
        {actionType === "meal" && (
          <View style={styles.field}>
            <Text style={styles.label}>Meal Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={mealType}
                onValueChange={(val) => setMealType(val)}
              >
                <Picker.Item
                  label="Sélectionnez le type de repas"
                  value={undefined}
                  color="#9CA3AF"
                />
                {mealItems.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
              {mealType && (
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setMealType(undefined)}
                >
                  
                  <X color="#6B7280" size={18} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginRight: 40,
  },
  form: { paddingHorizontal: 16 },
  field: { marginBottom: 20 },
  label: { marginBottom: 6, fontSize: 14, fontWeight: "500", color: "#111827" },
  input: {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  placeholderText: { fontSize: 16, color: "#9CA3AF" },
  valueText: { fontSize: 16, color: "#111827" },
  pickerWrapper: {
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
    position: "relative",
  },
  clearIcon: {
    position: "absolute",
    right: 8,
    top: Platform.OS === "ios" ? 16 : 14,
    padding: 4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  resetText: { color: "#111827", fontSize: 16 },
  addButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#0F0F1C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  pickerWithPadding: {
  height: 52,
  color: "#111827",
  paddingRight: 32, // add space for the X icon
},
clearIconFixed: {
  position: "absolute",
  right: 8,
  top: Platform.OS === "ios" ? 17 : 14, // vertically center
  zIndex: 10,
  backgroundColor: "transparent",
  padding: 4,
},
  addText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

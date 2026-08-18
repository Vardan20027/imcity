import React, { useState, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Styles } from './styles';
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarModal = ({ visible, onClose, onConfirm, initialDate }) => {
  const styles = Styles();
  const base = initialDate || new Date();

  const [viewMonth, setViewMonth] = useState(base.getMonth());
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [selectedDate, setSelectedDate] = useState(initialDate || null);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const YEARS = useMemo(
    () => Array.from({ length: 100 }, (_, i) => currentYear - i),
    [currentYear],
  );

  const days = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const cells = [];

    for (let i = startWeekday - 1; i >= 0; i--) {
      cells.push({
        day: daysInPrevMonth - i,
        current: false,
        month: viewMonth - 1,
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, current: true, month: viewMonth });
    }
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      const trailing = 7 - remainder;
      for (let d = 1; d <= trailing; d++) {
        cells.push({ day: d, current: false, month: viewMonth + 1 });
      }
    }
    return cells;
  }, [viewMonth, viewYear]);

  const isSelected = cell =>
    cell.current &&
    selectedDate &&
    selectedDate.getDate() === cell.day &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getFullYear() === viewYear;

  const handleDayPress = cell => {
    if (!cell.current) return;
    setSelectedDate(new Date(viewYear, viewMonth, cell.day));
  };

  const handleClear = () => setSelectedDate(null);

  const handleConfirm = () => {
    if (selectedDate) onConfirm(selectedDate);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setMonthPickerOpen(!monthPickerOpen);
                setYearPickerOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{MONTHS[viewMonth]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setYearPickerOpen(!yearPickerOpen);
                setMonthPickerOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{viewYear}</Text>
            </TouchableOpacity>
          </View>

          {monthPickerOpen && (
            <ScrollView style={styles.pickerList}>
              {MONTHS.map((m, idx) => (
                <TouchableOpacity
                  key={m}
                  style={styles.pickerItem}
                  onPress={() => {
                    setViewMonth(idx);
                    setMonthPickerOpen(false);
                  }}
                >
                  <Text style={styles.pickerItemText}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {yearPickerOpen && (
            <ScrollView style={styles.pickerList}>
              {YEARS.map(y => (
                <TouchableOpacity
                  key={y}
                  style={styles.pickerItem}
                  onPress={() => {
                    setViewYear(y);
                    setYearPickerOpen(false);
                  }}
                >
                  <Text style={styles.pickerItemText}>{y}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {!monthPickerOpen && !yearPickerOpen && (
            <>
              <View style={styles.weekRow}>
                {WEEKDAYS.map(w => (
                  <Text key={w} style={styles.weekdayText}>
                    {w}
                  </Text>
                ))}
              </View>

              <View style={styles.grid}>
                {days.map((cell, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.dayCell,
                      isSelected(cell) && styles.dayCellSelected,
                    ]}
                    onPress={() => handleDayPress(cell)}
                    disabled={!cell.current}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        !cell.current && styles.dayTextMuted,
                        isSelected(cell) && styles.dayTextSelected,
                      ]}
                    >
                      {cell.day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.footerRow}>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.footerActionText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.footerActionText}>Select date</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleConfirm} disabled={!selectedDate}>
              <Text
                style={[
                  styles.footerConfirmText,
                  !selectedDate && styles.footerConfirmDisabled,
                ]}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

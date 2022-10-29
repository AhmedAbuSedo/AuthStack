import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({label, style, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    height: 30,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    width: 90,
  },
});

export default Button;

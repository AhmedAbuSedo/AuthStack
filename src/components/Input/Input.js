import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Input = ({label, ...rest}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 12,
    width: '100%',
    height: 75,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default Input;

// screens/BienvenidaScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function BienvenidaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Guauly!</Text>

      <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
      <View style={styles.space} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
      <View style={styles.space} />
      <Button title="Entrar sin cuenta" onPress={() => navigation.navigate('Inicio')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  space: {
    height: 15,
  },
});

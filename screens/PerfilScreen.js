import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={require('../assets/kira.jpg')} style={styles.avatar} />

      {/* Nombre */}
      <Text style={styles.name}>Kira</Text>

      {/* Edad y raza */}
      <Text style={styles.subInfo}>4 años</Text>
      <Text style={styles.subInfo}>Teckel - Mezcla</Text>

      {/* Personalidad */}
      <TouchableOpacity>
        <Text style={styles.link}>Personalidad fuerte</Text>
      </TouchableOpacity>

      {/* Compatibles */}
      <Text style={styles.section}>❤️</Text>
      <Text style={styles.compatible}>
        Teckels, perros pequeños, perros tranquilos, {"\n"}
        perros bebés, perros viejecitos
      </Text>

      {/* No compatibles */}
      <Text style={styles.section}>💔</Text>
      <Text style={styles.compatible}>
        Perros nerviosos, perros grandes, huskys, {"\n"}
        pastores alemanes, galgos..
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    avatar: {
      width: 140,
      height: 140,
      borderRadius: 70,
      marginBottom: 20,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subInfo: {
      fontSize: 16,
      color: '#666',
      marginBottom: 4,
    },
    link: {
      fontSize: 16,
      color: '#3978f2',
      textDecorationLine: 'underline',
      marginVertical: 10,
    },
    section: {
      fontSize: 20,
      marginTop: 20,
    },
    compatible: {
      fontSize: 16,
      textAlign: 'center',
      color: '#444',
      marginTop: 5,
    },
  });
  
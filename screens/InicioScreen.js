import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}> {/*container general*/}
        
        {/* cabezera GUAULY con logo */}

        <View style={styles.header}>
        <Text style={styles.title}>GUAULY V.1.0</Text>
        </View>

        {/* Imagen */}

        <Image
        source={require('../assets/kira.jpg')}
        style={styles.image}
        />

        {/* Texto */}

        <Text style={styles.name}>Kira</Text>

        {/* Botones */}
        <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contactos')}>
            <Text style={styles.buttonText}>AMIGOS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Paseo')}>
            <Text style={styles.buttonText}>PASEO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.buttonText}>PERFIL</Text>
            </TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
  },
  image: {
    width: 200, height: 200, borderRadius: 0, marginBottom: 20
  },
  name: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30
  },
  buttonContainer: {
    width: '80%', gap: 15
  },
  button: {
    backgroundColor: '#8ae48a',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  }
  
});

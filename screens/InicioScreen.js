import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebaseConfig';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function InicioScreen({ navigation }) {

  console.log("🟢 Cargando InicioScreen");

  const volverABienvenida = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Bienvenida' }],
      })
    );
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setSelectedImage(null);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.", [{ text: "OK" }]);
      console.log("🔴 Sesión cerrada");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Bienvenida' }],
        })
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "Hubo un problema al cerrar sesión.");
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const cargarImagenGuardada = () => {
      const intervalo = setInterval(async () => {
        const user = auth.currentUser;

        if (user) {
          clearInterval(intervalo);
          try {
            const firestore = getFirestore();
            const userDoc = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(userDoc);

            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data.profilePicture) {
                setSelectedImage(data.profilePicture);
                console.log("📥 Imagen cargada:", data.profilePicture);
              } else {
                console.log("🟡 No hay imagen guardada");
                setSelectedImage(null);
              }
            } else {
              console.log("🟡 Documento del usuario no encontrado");
              setSelectedImage(null);
            }
          } catch (error) {
            console.error("❌ Error al cargar imagen:", error.message);
            setSelectedImage(null);
          }
        } else {
          console.log("⏳ Esperando a que Firebase cargue el usuario...");
        }
      }, 500);

      return () => clearInterval(intervalo);
    };

    cargarImagenGuardada();
  }, []);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso denegado para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log('📸 Imagen seleccionada:', imageUri);
      setSelectedImage(imageUri);

      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("❗ No hay usuario logueado");
          return;
        }

        // ✅ Método comprobado que funciona: fetch + blob + uploadBytes
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const fileRef = ref(storage, `profilePictures/${user.uid}.jpg`);
        await uploadBytes(fileRef, blob);

        const downloadURL = await getDownloadURL(fileRef);
        console.log("🌍 URL subida:", downloadURL);

        const firestore = getFirestore();
        const userDoc = doc(firestore, 'users', user.uid);
        await setDoc(userDoc, { profilePicture: downloadURL }, { merge: true });

        console.log("✅ Imagen subida y URL guardada correctamente en Firestore");
      } catch (error) {
        console.error("❌ Error al subir imagen o guardar URL:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoHeader}>
        <Image
          source={require('../assets/cabezera_guauly.png')}
          style={styles.logoImage}
        />
      </View>

      <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menú</Text>

          <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Contactos'); }}>
            <Text style={styles.menuItem}>Amigos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Paseo'); }}>
            <Text style={styles.menuItem}>Paseo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Perfil'); }}>
            <Text style={styles.menuItem}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setMenuVisible(false); volverABienvenida(); }}>
            <Text style={styles.menuItem}>Pantalla de inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setMenuVisible(false); cerrarSesion(); }}>
            <Text style={styles.menuItem}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.imageContainer}>
        <Text style={styles.petLabel}>Mi mascota</Text>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.defaultImage} />
        ) : (
          <Image source={require('../assets/perfil_default.png')} style={styles.defaultImage} />
        )}
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
        <Text style={styles.uploadButtonText}>Subir imagen</Text>
        <Ionicons name="camera" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  defaultImage: {
    marginTop: 10,
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  petLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 0,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: '#86736f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  logoHeader: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    paddingTop: 60, // Considera reducir este valor si ves mucho espacio blanco
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 220,
    height: 50,
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#8ae48a',
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuIcon: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 15,
  },
  menuItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    color: '#000',
  },


});

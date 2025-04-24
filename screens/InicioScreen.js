import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';








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

    const [menuVisible, setMenuVisible] = useState(false);


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
        </View>
        )}



        

        <View style={styles.imageContainer}>
        <Image
            source={require('../assets/kira.jpg')}
            style={styles.image}
        />
        <Text style={styles.name}>Kira</Text>
        </View>

        

        
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

    container: 
    {flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff'}, 

    imageContainer:
    {position: 'relative', width: '100%', height: 520},
        
    header: 
    {backgroundColor: '#ddd',width: '100%',paddingVertical: 10,alignItems: 'center',marginTop: 50  },
    
    logoHeader:
    {backgroundColor: '#fff', width: '100%', paddingVertical: 10, paddingTop: 60, alignItems: 'center', justifyContent: 'center', },
      
    logoImage:
    {width: 220, height: 50, resizeMode: 'contain'},

    name: 
    {position: 'absolute', bottom: 20, alignSelf: 'center', color: '#fff', fontSize: 24, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.6)', textShadowOffset: {width: 1, height: 1 }, textShadowRadius: 2},

    image: 
    {width: '100%', height: '100%', resizeMode: 'cover'},

    buttonContainer: 
    {position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10},

    button: 
    {backgroundColor: '#8ae48a', width: 90, height: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginHorizontal: 5},

    buttonText: 
    { color: '#000', fontWeight: 'bold', fontSize: 16},

    logoutButton:
    { marginTop: 10,paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 10, alignSelf: 'center'},
      
    logoutText: 
    { color: '#333', fontSize: 14},

    menuIcon: 
    { position: 'absolute', top: 70, left: 20, zIndex: 10},

    menuContainer: 
    {position: 'absolute',top: 110,left: 20,backgroundColor: '#fff',padding: 10,borderRadius: 8,shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,zIndex: 15},
      
    menuItem: 
    {fontSize: 16,color: '#333',paddingVertical: 6, paddingHorizontal: 8},
      
    menuTitle: 
    {fontSize: 18,fontWeight: 'bold',marginBottom: 10,textDecorationLine: 'underline',color: '#000'}
      
      
      
  
});

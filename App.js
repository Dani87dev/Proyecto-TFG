import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BienvenidaScreen from './screens/BienvenidaScreen';
import LoginScreen      from './screens/LoginScreen';
import RegisterScreen   from './screens/RegisterScreen';
import InicioScreen     from './screens/InicioScreen';
import ContactosScreen  from './screens/ContactosScreen';
import PaseoScreen      from './screens/PaseoScreen';
import PerfilScreen     from './screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Bienvenida"
        screenOptions={{ headerShown: false }}  // ← Aquí quitamos el header
      >
        <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Stack.Screen name="Login"       component={LoginScreen} />
        <Stack.Screen name="Register"    component={RegisterScreen} />
        <Stack.Screen name="Inicio"      component={InicioScreen} />
        <Stack.Screen name="Contactos"   component={ContactosScreen} />
        <Stack.Screen name="Paseo"       component={PaseoScreen} />
        <Stack.Screen name="Perfil"      component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './TelasApp/Login';
import { Cadastro } from './TelasApp/CadastroUsuario';
import Home from './TelasApp/HomeL';
import Crud from './TelasApp/Crud';
const Stack = createStackNavigator();

function App() {
return(
  <NavigationContainer>
     <Stack.Navigator initialRouteName="Login" headerMode='none'>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Crud" component={Crud} />
      </Stack.Navigator>
  </NavigationContainer>
)
}

export default App;
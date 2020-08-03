import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image,StyleSheet, Text, View,
          KeyboardAvoidingView, TextInput,
         TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage , hideMessage } from "react-native-flash-message";

    export function Login({route,navigation}){
    
    [getSenhaa,setSenhaa] = useState();
    [getLogin,setLogin] = useState();

      async function Logar(){
          await axios.post('http://professornilson.com/testeservico/login',{
          email:getLogin,
          senha:getSenhaa,
        }
      )
      .then(function(response) {
        setLogin('')
        setSenhaa('') 
        console.log(response.data);
        if(response.data != '' ){
          navigation.navigate ('Home')
        }else{
        alert("Usuario não cadastrado!")
       }
      })
      .catch(function(error){
        showMessage({
          message: "Algo não saiu como deveria",
          type:"danger",
        });
        console.log(error);
      })
      }
    
    
      return(
    <KeyboardAvoidingView style={styles.background}>
      <FlashMessage position='top'/>
      <View style={styles.logo}>
        <Image
        source={require('../imagens/Icone2.png')}
        />
      </View>
      <View 
      style={styles.containerdinput}>
        <TextInput
        style={styles.inputs}
        placeholder="Email"
        onChangeText={text => setLogin(text)}
        value={getLogin}
        />
        <TextInput
        style={styles.inputs}
        placeholder="Senha"
        onChangeText={text=> setSenhaa(text)}
        value={getSenhaa}
        />
  
        <TouchableOpacity style={styles.botaologin}
        onPress={ () => Logar()}>
             <Text style={styles.textobotaologin}> Acessar </Text>
        </TouchableOpacity>
  
        <TouchableOpacity  style={styles.botaocadstro}
        onPress={ () => navigation.navigate ('Cadastro')}>
          <Text style={styles.textobotaocadastro}> Criar conta </Text>
        </TouchableOpacity>
  
      </View>
      
    </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    background: {
      flex: 1,
      backgroundColor: '#191919',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      flex:1,
      justifyContent: "center",
      height : 50,
      width : 0,
      alignItems: "center"
    },
    containerdinput : {
      flex: 1,
      alignItems : "center",
      justifyContent: "center",
      width : '90%', 
    },
    inputs : { 
      backgroundColor: '#ffff',
      width: '85%',
      marginBottom: 15,
      fontSize : 15,
      borderRadius : 10,
      padding: 9,
    },
    botaologin : {
      backgroundColor : '#006400',
      width : '90%',
      height : 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10
    },
    textobotaologin: {
      color: '#fff',
      fontSize: 20
    },
    textobotaocadastro : { 
      color: '#fff'
    },
    botaocadstro : {
      marginTop : 10,
    }
  });
  
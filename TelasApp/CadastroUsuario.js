import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image,StyleSheet, Text,
         View, KeyboardAvoidingView,
         TextInput, TouchableOpacity,
         Dimensions } from 'react-native';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage , hideMessage } from "react-native-flash-message";

    export function Cadastro({route,navigation}){
    [getSenha,setSenha] = useState();
    [getEmail,setEmail] = useState();

      async function Terminacad(){
          await axios.post('http://professornilson.com/testeservico/usuarios',{
          email:getEmail,
          senha:getSenha,
        }
      )
      .then(function(response) {
        setEmail('')
        setSenha('')
          showMessage({
            message: "Cadastro feito com sucesso!",
            type: "success",
          });
          console.log(response);
      })
      .catch(function(error){
        showMessage({
          message: "Algo não saiu como deveria",
          type:"warning",
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
        onChangeText={text =>setEmail(text)}
        value={getEmail}
        />
  
  <TextInput
        style={styles.inputs}
        placeholder="Senha"
        onChangeText={text =>setSenha(text)}
        value={getSenha}
        />
  
  
        <TouchableOpacity  style={styles.botaocadstro}
        onPress={ () => Terminacad()}>
          <Text style={styles.textobotaocadastro}> Termina Cadastro </Text>
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
        backgroundColor : '#006400',
        width : '55%',
        height : 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        marginBottom: 50
    }
  });
  
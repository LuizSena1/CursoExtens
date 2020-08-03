import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight,StyleSheet,
        TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header,Image,Button} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage , hideMessage } from "react-native-flash-message";

export default function Crud ({route,navigation}) {
    [getNome,setNome] = useState();
    [getCpf,setCpf] = useState();
    [getTelefone,setTelefone] = useState();
    [getId,setId] = useState();
    [getAlterar,setAlterar] = useState();
    
    useEffect(()=>{
        if(route.params){
            const {nome} = route.params
            const {telefone} = route.params
            const {cpf} = route.params
            const {id} = route.params
            const {alterar} = route.params

            setNome(nome)
            setTelefone(telefone)
            setCpf(cpf)
            setId(id)
            setAlterar(alterar)

        }
    },[])

    async function inserirDados(){
        await axios.post('http://professornilson.com/testeservico/clientes',{
         nome:getNome,
         cpf:getCpf,
         telefone:getTelefone,  
        }
        )
        .then(function (response) {
            setNome('')
            setTelefone('')
            setCpf('')
            showMessage({
                message: "Registro cadastrado com sucesso!",
                type: "success",
              });
          console.log(response);
        })
        .catch(function (error) {
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
          console.log(error);
        });
    }

     function excluirDados(){
         axios.delete('http://professornilson.com/testeservico/clientes/'+getId
        )
        .then(function (response) {
            setNome('')
            setTelefone('')
            setCpf('')
            showMessage({
                message: "Registro excluído com sucesso!",
                type: "success",
              });
          console.log(response);
        })
        .catch(function (error) {
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
            console.log(error);
        });
    }

    async function alterarDados(){
        await axios.put('http://professornilson.com/testeservico/clientes/'+getId,{
         nome:getNome,
         cpf:getCpf,
         telefone:getTelefone,  
        }
        )
        .then(function (response) {
            showMessage({
                message: "Registro alterado com sucesso!",
                type: "success",
              });
          console.log(response);
        })
        .catch(function (error) {
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
            console.log(error);
        });
    }
    return(
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerinputs}>
            <Header
            containerStyle={styles.botaoV}
        leftComponent={
            <Button  
            title="Voltar"
            onPress={()=>navigation.navigate('Home')}
            buttonStyle={styles.botaoV}
            ></Button>}
            centerComponent={{ text: 'Cadastro de Clientes', style: { color: '#fff' } }}
        
                />
            <FlashMessage position='top'/>
            <ScrollView >
            <Text style={styles.titulo}>Digite o Nome</Text>
            <TextInput
            style={styles.inputs}
            onChangeText={text => setNome(text)}
            value={getNome}
            /> 

            <Text style={styles.titulo}>Digite o Cpf </Text>
            <TextInput
            style={styles.inputs}
            onChangeText={text => setCpf(text)}
            value={getCpf}
            /> 

            <Text style={styles.titulo}>Digite o telefone</Text>
            <TextInput
            style={styles.inputs}
            onChangeText={text => setTelefone(text)}
            value={getTelefone}
            /> 
              { !getAlterar ? (
            <TouchableOpacity
            style={{paddingTop:20}}
            title="Salvar"
            style={styles.botao}
            onPress={() => inserirDados()}
            >
            <Text
            style={styles.textobotao}>Salvar Dados</Text>
            </TouchableOpacity>  
            ):null}

            { getAlterar ? (
            <TouchableOpacity
            style={{paddingTop:20}}
            title="Alterar"
            style={styles.botao}
            onPress={() => alterarDados()}
            >
            <Text
            style={styles.textobotao}> Alterar Dados </Text>
            </TouchableOpacity>             
            ):null}

            { getAlterar ? (
            <TouchableOpacity
            style={{paddingTop:20}}
            title="Excluir"
            style={styles.botaoExcluir}
            onPress={() => excluirDados()}
            >
            <Text
            style={styles.textobotaoexcluir}
            >Excluir Dados</Text>
            </TouchableOpacity> 
            ):null} 
            </ScrollView>
            </View>
            
        </KeyboardAvoidingView>
    )
        
}






const styles = StyleSheet.create({

    botao:{
        backgroundColor : '#006400',
        width : '85%',
        height : 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop:10,
        marginLeft:10,
        fontSize:20,
    },

    botaoV:{
        backgroundColor:'#006400',
    },

    botaoExcluir:{
        width:'85%',
        backgroundColor:'#ff0000',
        height : 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop:10,
        marginLeft:10,
        
    },

    titulo:{
    paddingTop:20,
    fontSize:18,
    color:'#fff'
    },

    background: {
        flex: 1,
        backgroundColor: '#191919',
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
        marginTop:10,
        marginLeft:10,
      },
      textobotao: {
        color: '#fff',
        fontSize: 20,
      },
      textobotaoexcluir:{
          color:'#fff',
          fontSize:20,
      },
})
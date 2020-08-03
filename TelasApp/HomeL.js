import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight,TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header,Button} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Home({route,navigation}){
    const [getdata,setData] = useState([])

        useEffect(()=>{
            async function resgatarDados(){
                const result = await axios(
                    'http://professornilson.com/testeservico/clientes',
                );
                setData(result.data);
            }
            resgatarDados();
        })
        return(
            <View
            style = {styles.background}>
                <Header 
                style={styles.Header}
                containerStyle={styles.Header}
                centerComponent={{ text: 'Lista', style:{ color: '#000', fontSize:20 } }}
                rightComponent={
                    <Button  
                    title="+"
                    onPress={()=>navigation.navigate('Crud')}
                    buttonStyle={styles.botao}
                    ></Button>}
                    /> 
                    <ScrollView >
                        {
    getdata.map((linha, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
        title={linha.nome}
        subtitle={linha.cpf}
        bottomDivider
        chevron
        containerStyle={styles.containerbackground}
        titleStyle={styles.texto}
        subtitleStyle={styles.texto}
        
        onPress={()=>navigation.navigate('Crud',{
           nome:linha.nome,
           telefone:linha.telefone,
           cpf:linha.cpf,
           id:linha.id,
           alterar:true 
        })}
      />
    ))
  }   
  </ScrollView>
            </View>
        )
}

  

  const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        backgroundColor: '#191919',
      },
      Header: {
        backgroundColor:'#006400',
    },
    botao: {
        backgroundColor:'#006400',
    },
    containerbackground: {
        backgroundColor: '#262626',
    },
    texto:{
        color:'#fff'
    }
  })
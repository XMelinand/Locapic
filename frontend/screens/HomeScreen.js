import { StatusBar, ImageBackground, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// React Native Elements
import { Input, Button } from "@rneui/themed";
import {connect} from "react-redux";


function HomeScreen(props) {

  const [pseudo, setPseudo] = useState('');

  useEffect(()=>{
    AsyncStorage.getItem("userPseudo", function(error, data) {
      console.log(data);  
      props.onSubmitPseudo(data)
      }
  )}, []);


      var content;
      
  if(props.pseudo){
    content = <View style={styles.input}>
      <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>Welcome back <Text style={{color: '#eb4d4b', fontWeight: 'bold'}}>{props.pseudo}</Text> !</Text>
      <View style={styles.button}>
      <Button
        type="solid"
        onPress={() => {
        props.navigation.navigate("TabsNavigator", {screen: 'Map'});
      }}
      >
        <FontAwesome  style={{ marginEnd:5}} name="arrow-right" color="#eb4d4b" size={22} />
        Go to Map
      </Button>
    </View>
    <View style={styles.button}>
    <Button
        type="solid"
        color='#eb4d4b'
        onPress={() => {
        AsyncStorage.clear();
      }}
      >
        <FontAwesome style={{ marginEnd:5}} name="arrow-right" color="#007BFD" size={22} />
        Clear data
      </Button>
      </View>
      </View>
  }else{ content = <View style={styles.input}>
    <Input
    placeholder="Username"
    placeholderTextColor='rgba(2,117,216,0.7)'
    inputStyle={{ color: 'white'}}
    
    leftIcon={
      <FontAwesome
        style={{ marginEnd: "5%" }}
        name="user"
        size={24}
        color="#eb4d4b"
      />
    }
    onChangeText={(val)=>{setPseudo(val); console.log(val)}}
    value = {pseudo}
  />
    <View style={styles.button}>
      <Button
        type="solid"
        onPress={() => {
        props.navigation.navigate("TabsNavigator", {screen: 'Map'});
        props.onSubmitPseudo(pseudo);console.log('coucou',pseudo);
        AsyncStorage.setItem("userPseudo", pseudo);
      }}
      >
        <FontAwesome name="arrow-right" color="#eb4d4b" size={22}  />
        Go to Map
      </Button>
    </View>
    </View>
  }

  return (
    <ImageBackground
      source={require("../assets/nature-phone-wallpaper-12.jpeg")}
      style={styles.container}
    > 
    {content}
      <StatusBar style="auto" />
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "90%",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: "5%",
    borderRadius: 10
  },
  button: {
    width: "50%",
    borderRadius: "15"

  },
}); 

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (typed) {
      dispatch({ type: "savePseudo", pseudo: typed });
    },
  };
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
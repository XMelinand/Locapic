import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { Button, Overlay, Input } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';



function MapScreen(props) {

    {/*  STATES ----------------------------------------------------------------------- */}

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [addButtonOff, setAddButtonOff] = useState(false)
  const [clickCoord, setClickCoord] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [visible, setVisible] = useState(false);

    {/*  USE EFFECT ------------------------------------------------------------------- */}

  useEffect(() => {
    //USER GEOLOC
    async function geoLoc() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        await Location.watchPositionAsync(
          { distanceInterval: 2 },
          (location) => {
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          }
        );
      }
    }
    geoLoc();

    //LOAD POIS
    
    AsyncStorage.getItem("AddPOI", function(error, data) {
      if(data){
        console.log('data', data);
    var poiData = JSON.parse(data);
    props.recToStore(poiData);
    }
  });
  }, []);

// SUPPRESION
//   useEffect(()=>{

// setListPOI(props.poi);
//   }, []);

    {/* ADD POI ----------------------------------------------------------------------- */}

const toggleOverlay = () => {
  setVisible(!visible);
};
  
  // ADD Point Of Interest on the list // button interactions 
  function recordClickCoord(event){
    if(addPOI == true){
      toggleOverlay();
      setClickCoord(
        { 
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
        },
        );
          
        setAddButtonOff(false);
        setAddPOI(false);
      }
  }
  function validatePOI(){
    console.log('in validate',listPOI);
    var sendPOI = [...props.poi,{
      title: title,
      description: description,
      latitude: clickCoord.latitude,
      longitude: clickCoord.longitude,
    }]    
    console.log('senPOI', sendPOI);
    // ADD TO LOCAL STORAGE
    AsyncStorage.setItem("AddPOI", JSON.stringify(sendPOI))
    props.recToStore(sendPOI);

    
    setVisible(false),
    setClickCoord([]),
    setTitle(),
    setDescription()
  };
    {/*  GLOBAL RETURN ------------------------------------------------------------------- */}
      return (
    <View style={styles.container}>
    {/*  MODAL OVERLAY ------------------------------------------------------------------- */}

            <Overlay overlayStyle={{width:300, height:450}} isVisible={visible} onBackdropPress={toggleOverlay}>
    {/* INPUT */}
      <KeyboardAvoidingView>
      <Input containerStyle={{marginBottom : 5}}
          placeholder="titre"
          multiline
          onChangeText={(val)=>{setTitle(val); console.log(val)}}
          value = {title}
        ></Input>
    {/* INPUT */}
        <Input containerStyle={{marginBottom : 5}}
            placeholder="Description"
            multiline
            onChangeText={(val)=>{setDescription(val); console.log(val)}}
          value = {description}
          ></Input>
      <Button
        title="Ajouter POI"
        color="#eb4d4b"
        onPress={validatePOI}
      />
      </KeyboardAvoidingView>
    </Overlay>


      {/* MAP ------------------------------------------------------------------------- */}
      <MapView
        style={styles.map}
        draggable
        initialRegion={{
          latitude: 45.75,
          longitude: 4.85,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // NEW Point of Interest
        onPress={(event)=>recordClickCoord(event)}
      >
        {/* USER POSITION */}
        <Marker
          coordinate={location}
          title="T'es là ducon"
          pinColor="#f1c40f"
        />

    {/* DISPLAY POI -------------------------------------------------------------- */}
        {props.poi.map(function (poI, i) {
          console.log('liste',listPOI);
          return (
            <Marker
              key={i}
              coordinate={{latitude:poI.latitude, longitude:poI.longitude}}
              title={poI.title}
              description={poI.description}
              pinColor="blue"
              draggable
            />
          );
        })}
      </MapView>

      {/* BUTTON ----------------------------------------------------------------- */}
        <View>
        <Button
          type="solid"
          color="#eb4d4b"
          title="Add POI"
          disabled={addButtonOff}
          onPress={() => {
            setAddPOI(true), setAddButtonOff(true),toggleOverlay
          }}
          icon={<FontAwesome name="map-marker" size={24} color="white" />}
        />
      </View>
    </View>
  );
}

    {/* STYLESHEETS --------------------------------------------------------------- */}

      const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  map: {
    flex: 2,
  },
  overlay:{
    margin : 20,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    recToStore: function (point) {
      dispatch({ type: "savePOI", poi: point });
      console.log( 'send to store', point)
    },
  };
}

function mapStateToProps(state){
  return { poi: state.newPoi };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
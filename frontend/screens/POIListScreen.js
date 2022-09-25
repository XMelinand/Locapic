import { View, Text } from "react-native";
import { ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect } from "react";

function POIListScreen(props) {
  console.log("mypois2", props.poi);

  useEffect(() => {
    console.log("mypois", props.poi);
  }, [props.poi]);
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <ScrollView>
        {/* messages */}
        {props.poi.map(function (poi, i) {
          return (
            <ListItem
              key={i}
              style={{ borderBottomWidth: 0.5, borderColor: "#eb4d4b" }}
            >
              <ListItem.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex:1, margin:3}}>
                  <ListItem.Title style={{ fontWeight: "bold", color: "#eb4d4b" }}>{poi.title}</ListItem.Title>
                  <ListItem.Subtitle>{poi.description}</ListItem.Subtitle>
                </View>
                  <ListItem.Content>
                    <Text style={{ fontSize:10}}>Lat:  {poi.latitude}</Text>
                    <Text style={{ fontSize:10}}>Lon:  {poi.longitude}</Text>
                  </ListItem.Content>
                <Ionicons 
                onPress={()=> props.delToStore(poi)}
                name="trash" size={24} color="#eb4d4b" />
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state){
  return { poi: state.newPoi };
}

function mapDispatchToProps(dispatch){
  return {
    delToStore: function (POI) {
      dispatch({ type: "deletePOI", POI: POI });
      console.log( 'del in store', POI)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(POIListScreen);

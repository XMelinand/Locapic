import { StatusBar, Text, View } from "react-native";
import { Input, Button, ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { REACT_APP_DEV_MODE } from "@env";


import socketIOClient from "socket.io-client";
var socket = socketIOClient(`http://${REACT_APP_DEV_MODE}:3000`);

function ChatScreen(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const mess = React.createRef();

  useEffect(() => {
    console.log("patate");
    socket.on("sendMessageToAll", (message) => {
    
      console.log("useeff", message);
      setListMessage([...listMessage, message]);
    });
  }, [listMessage]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* messages */}
        {listMessage.map(function (message, i) {
          console.log("message front", message);
          return (
            <ListItem key={i}>
              <ListItem.Content>
                <ListItem.Title>{message.pseudo}</ListItem.Title>
                <ListItem.Subtitle>{message.message}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>

      {/* INPUT */}
      <Input
        containerStyle={{ marginBottom: 5 }}
        placeholder="Your message"
        ref={mess}
        multiline
        onChangeText={(val) => {
          setCurrentMessage(val);
          console.log(val);
        }}
        value={currentMessage}
      ></Input>
      {/* BUTTON */}
      <Button
        type="solid"
        color="#eb4d4b"
        onPress={() => {
          socket.emit("sendMessage", {
            message: currentMessage,
            pseudo: props.pseudo,
          });
          mess.current.clear();
        }}
      >
        <Ionicons name="mail-outline" size={24} color="white" />
        Send
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo };
}

export default connect(mapStateToProps, null)(ChatScreen);

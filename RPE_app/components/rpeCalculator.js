import React, {Component} from "react";
import {Text, View, Button, AppRegistry, ScrollView} from "react-native";

export default class RPECalculator extends Component {

  render(){
    return(
    <View style={{flex: 1,
      flexDirection: "column",
      backgroundColor: "grey",
      justifyContent: "space-around",
      alignItems: "center"}}>
      <Text>This is text</Text>
    </View>
    );
  }

}

AppRegistry.registerComponent("RPE_app", () => RPECalculator);
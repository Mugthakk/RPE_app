import React, {Component} from "react";
import {Text, View, Button, AppRegistry, ScrollView} from "react-native";

export default class MenuView extends Component {

  render(){
    return(
    <View style={{flex: 1,
      flexDirection: "column",
      backgroundColor: "grey",
      justifyContent: "space-around",
      alignItems: "center"}}>
      <Button color="red" onPress={() => this.props.navigation.navigate("RPECalculator")} title="Work-weight calculator"/>
      <Button color="red" onPress={() => this.props.navigation.navigate("MaxEstimator")} title="1RM Estimator"/>
      <Button color="red" onPress={() => this.props.navigation.navigate("Info")} title="RPE information"/>
    </View>
    );
  }

}

AppRegistry.registerComponent("RPE_app", () => MenuView);
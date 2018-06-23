import React from "react";
import {View, Button, AppRegistry} from "react-native";

class MenuView extends React.Component {

  render(){
    return(
    <View style={{flex: 1,
      flexDirection: "column",
      backgroundColor: "grey",
      justifyContent: "space-around",
      alignItems: "center"}}>
      <Button color="red" onPress={() => this.props.navigation.navigate("RPECalculator")} title="RPE calculator"/>
      <Button color="red" onPress={() => this.props.navigation.navigate("Info")} title="RPE information"/>
    </View>
    );
  }

}

export default MenuView

AppRegistry.registerComponent("RPE_app", () => MenuView);
import React, {Component} from "react";
import {Text, View, Button, AppRegistry, ScrollView} from "react-native";

export default class RPEInfo extends Component {

  render(){
    return(
    <ScrollView style={{flex: 1,
      flexDirection: "column",
      backgroundColor: "grey", paddingHorizontal: 10, paddingTop: 30}}>
      <Text style={{color: "white", fontSize: 20}}>{"RPE (rate of perceived exertion) is a rating system that allows athletes to measure how hard something feels to you at the time. It is a subjective measure of your strength at a given time. We rate this on a scale from one to ten. The higher the number, the harder the set felt. It is also a way to quantify those feelings we have immediately post-set of gauging how difficult it was. “I could maybe have done 1 or 2 more reps.” The RPE scale quantifies this. \n\nRPE allows you to regulate your training intensity based on your condition right now. Not your last meet, yesterday, or even your last set. It allows you to quantify where your preparedness is at any given time."}</Text>
    </ScrollView>
    );
  }

}

AppRegistry.registerComponent("RPE_app", () => RPEInfo);
import React, {Component} from "react";
import {Text, View, Button, AppRegistry, ScrollView, Modal, Image, TouchableWithoutFeedback} from "react-native";

export default class RPEInfo extends Component {


  constructor(props){
    super(props);
    this.state = {rpeChartVisible: false, rpeEstimationVisible: false}
  }

  render(){
    return(
        <ScrollView style={{backgroundColor: "grey", paddingHorizontal: 10}}>
          
          <Button title="RPE to %" color="red" onPress={() => {this.setState({"rpeChartVisible": true})}}/>

          <Text style={{color: "white", fontSize: 20}}>{"RPE (rate of perceived exertion) is a rating system that allows athletes to measure how hard something feels to you at the time. It is a subjective measure of your strength at a given time. We rate this on a scale from one to ten. The higher the number, the harder the set felt. It is also a way to quantify those feelings we have immediately post-set of gauging how difficult it was. “I could maybe have done 1 or 2 more reps.” The RPE scale quantifies this."}</Text>
          
          <Button title="RPE estimation chart" color = "red" onPress={() => {this.setState({"rpeEstimationVisible": true})}}/>

          <Text style={{color: "white", fontSize: 20}}>{"RPE allows you to regulate your training intensity based on your condition right now. Not your last meet, yesterday, or even your last set. It allows you to quantify where your preparedness is at any given time."}</Text>
          
          <Modal
          visible={this.state.rpeChartVisible}
          onRequestClose={ () => {this.setState ( {"rpeChartVisible": false} )} }>
            <TouchableWithoutFeedback onPress={() => {this.setState ( {"rpeChartVisible": false} )} }>
              <Image 
              style={{flex:1, height: undefined, width: undefined}} 
              source={require("../images/rpeChart.png")}
              resizeMode="contain"/>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal
          visible={this.state.rpeEstimationVisible}
          onRequestClose={ () => {this.setState ( {"rpeEstimationVisible": false} )} }>
            <TouchableWithoutFeedback onPress={() => {this.setState ( {"rpeEstimationVisible": false} )} }>
              <Image style={{flex:1, height: undefined, width: undefined}}
              source={require("../images/rpeEstimation.png")}
              resizeMode="contain"/>
            </TouchableWithoutFeedback>
          </Modal>

        </ScrollView>
    );
  }

}

AppRegistry.registerComponent("RPE_app", () => RPEInfo);
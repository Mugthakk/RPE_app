import React, {Component} from "react";
import {Text, View, Button, AppRegistry, TextInput, Alert, Keyboard} from "react-native";

const RPE_reps_to_max = {
  10: {1: 1, 2: 0.96, 3: 0.92, 4: 0.89, 5: 0.86, 6: 0.84, 7: 0.81, 8: 0.79, 9: 0.76, 10: 0.74},
  9.5: {1: 0.98, 2: 0.94, 3: 0.91, 4: 0.88, 5: 0.85, 6: 0.82, 7: 0.80, 8: 0.77, 9: 0.75, 10: 0.72},
  9: {1: 0.96, 2: 0.92, 3: 0.89, 4: 0.86, 5: 0.84, 6: 0.81, 7: 0.79, 8: 0.76, 9: 0.74, 10: 0.71},
  8.5: {1: 0.94, 2: 0.91, 3: 0.88, 4: 0.85, 5: 0.82, 6: 0.80, 7: 0.77, 8: 0.75, 9: 0.72, 10: 0.69},
  8: {1: 0.92, 2: 0.89, 3: 0.86, 4: 0.84, 5: 0.81, 6: 0.79, 7: 0.76, 8: 0.74, 9: 0.71, 10: 0.68},
  7.5: {1: 0.91, 2: 0.88, 3: 0.85, 4: 0.82, 5: 0.80, 6: 0.77, 7: 0.75, 8: 0.72, 9: 0.69, 10: 0.67},
  7: {1: 0.89, 2: 0.86, 3: 0.84, 4: 0.81, 5: 0.79, 6: 0.76, 7: 0.74, 8: 0.71, 9: 0.68, 10: 0.65},
  6.5: {1: 0.88, 2: 0.85, 3: 0.82, 4: 0.80, 5: 0.77, 6: 0.75, 7: 0.72, 8: 0.69, 9: 0.67, 10: 0.64},
  6: {1: 0.87, 2: 0.84, 3: 0.80, 4: 0.79, 5: 0.76, 6: 0.74, 7: 0.70, 8: 0.67, 9: 0.66, 10: 0.63}
}

export default class MaxEstimator extends Component {

  constructor(props){
    super(props);
    this.state = { 
      max: 0,
      rpe: 0.0,
      reps: 0,
      working_weight: 0
    };
  }

  computeEstimatedMax(){
    if (this.state.working_weight * this.state.rpe * this.state.reps == 0) return;
    Keyboard.dismiss();
    let percentage = RPE_reps_to_max[this.state.rpe.toString()][this.state.reps.toString()];
    this.setState({max: Math.round(this.state.working_weight / percentage)} , () => {  
      Alert.alert("Estimated max:",
        this.state.max.toString(),
        [{text: "OK", onPress: () => console.log("OK pressed")}],
        {cancelable: false}
        ) 
      });
  }

  render(){
    return(
    <View style={{flex: 1,
      flexDirection: "column",
      backgroundColor: "grey",
      justifyContent: "space-around",
      alignItems: "center"}}>
      

      <Text style={{color: "white", fontSize:15}}>Working weight</Text>
      <TextInput
      style={{height: 50 , width: 120, color: "white", fontSize: 20, textAlign: "center"}}
      keyboardType="numeric"
      onChangeText={
        (text) => { 
            if (!text) {
              this.setState( {"working_weight": 0} );
            } else {
              this.setState( {"working_weight": parseInt(text)} );
            }
          }
      }
      value={this.state.working_weight.toString()}/>

      <Text style={{color: "white", fontSize:15}}># Reps</Text>
      <TextInput
      style={{height: 50, width: 120, color: "white", fontSize: 20, textAlign: "center"}}
      keyboardType="numeric"
      onChangeText={
        (text) => {
          if (!text) {
              this.setState( {"reps": 0} );
          } else {          
            this.setState( {"reps": parseInt(text)} );
          }
        }
      }
      value = {this.state.reps.toString()}/> 

      <Text style={{color: "white", fontSize:15}}>RPE</Text>
      <TextInput
      style={{height: 50, width: 120, color: "white", fontSize: 20, textAlign: "center"}}
      keyboardType="numeric"
      onChangeText={
        (text) => { 
            if (!text){
              this.setState( {"rpe": 0} );
            } else {
              this.setState( {"rpe": parseFloat(text)} );
            }
          }
      }
      value={this.state.rpe.toString()}/>

      

      <Button color="red" onPress={() => {this.computeEstimatedMax()}} title="Compute estimated max"/>
    
    </View>
    );
  }

}

AppRegistry.registerComponent("RPE_app", () => MaxEstimator);
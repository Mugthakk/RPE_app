import React from "react";
import {AppState, AsyncStorage, Text, View, Button, AppRegistry, TextInput, Alert, Keyboard} from "react-native";
import InputField from './InputField';
import ButtonInputField from './ButtonInputField';

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

export default class RPECalculator extends React.Component {

  constructor(props){
    super(props);
    this.state = {max: 2, rpe: 6.0, reps: 1, working_weight: 0};
  }

  componentWillMount(){
    AppState.addEventListener("change", this._handleAppStateChange);    
  }

  componentWillUnmount(){
    this._trySaveState();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  componentDidMount(){
    this._loadStateOrDefault();
  }

  _handleAppStateChange = async (nextAppState) => {

    if (nextAppState == null){
      return;
    }

    if (nextAppState === 'active') {
      this._loadStateOrDefault();
    } else if (nextAppState !== 'active'){
      this._trySaveState();
    }
    
  }

  async _trySaveState(){
    try {
      await AsyncStorage.setItem('max', String(this.state.max != null ? this.state.max : 0));
      await AsyncStorage.setItem('rpe', String(this.state.rpe != null ? this.state.rpe : 6.0));
      await AsyncStorage.setItem("reps", String(this.state.reps != null ? this.state.reps : 1));
      await AsyncStorage.setItem("working_weight", String(this.state.working_weight != null ? this.state.working_weight : 0));
    } catch (error) {
      return;
    }
  } 

  async _loadStateOrDefault(){
    try {
      let max = await AsyncStorage.getItem("max");
      let rpe = await AsyncStorage.getItem("rpe");
      let reps = await AsyncStorage.getItem("reps");
      let working_weight = await AsyncStorage.getItem("working_weight").then((working_weight) => {
        let savedState = {
          max: Number(max != null ? max : 0),
          rpe: Number(rpe != null ? rpe : 6.0),
          reps: Number(reps != null ? reps : 1),
          working_weight: Number(working_weight != null ? working_weight : 0)
        }
        if (savedState != null){
          this.setState( {
            max: savedState.max != null ? savedState.max : 0,
            rpe: savedState.rpe != null ? savedState.rpe : 6.0,
            reps: savedState.reps != null ? savedState.reps : 1,
            working_weight: savedState.working_weight != null ? savedState.working_weight : 0
          } );
        }
      });
    } catch (error) {
      this.setState( {max: 0, rpe: 6.0, reps: 1, working_weight: 0} ); 
    }
    
  }

  computeEstimatedMax(){
    if (this.state.working_weight * this.state.rpe * this.state.reps == 0) {
      Alert.alert("Invalid inputs",
        "Working weight, RPE and #Reps must all be non-zero",
        [{text: "OK", onPress: () => console.log("OK pressed")}],
        {cancelable: false}
        ); 
        Keyboard.dismiss();
        return;
    }
    if (this.state.rpe < 6 || this.state.rpe > 10 || this.state.reps > 10) {
      Alert.alert("Invalid reps or RPE",
      "RPE must be 6 to 10 and #reps 1 to 10",
      [{text: "OK", onPress: () => console.log("OK pressed")}],
      {cancelable: false}
      ); 
      Keyboard.dismiss();
      return;
    }
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

  computeWorkingWeight(){
    if (this.state.max * this.state.rpe * this.state.reps == 0) {
      Alert.alert("Invalid inputs",
        "Working weight, RPE and #reps must all be non-zero",
        [{text: "OK", onPress: () => console.log("OK pressed")}],
        {cancelable: false}
        ); 
        Keyboard.dismiss();
        return;
    }
    if (this.state.rpe < 6 || this.state.rpe > 10 || this.state.reps > 10) {
      Alert.alert("Invalid reps or RPE",
      "RPE must be 6 to 10 and #reps 1 to 10",
      [{text: "OK", onPress: () => console.log("OK pressed")}],
      {cancelable: false}
      ); 
      Keyboard.dismiss();
      return;
    }
    Keyboard.dismiss();
    let percentage = RPE_reps_to_max[this.state.rpe.toString()][this.state.reps.toString()];
    this.setState({working_weight: Math.round(this.state.max * percentage)}, 
    () => {
        Alert.alert("Working weight:",
                    this.state.working_weight.toString(),
                    [{text: "OK", onPress: () => console.log("OK pressed")}],
                    {cancelable: false} )
        });
  }

  render(){
    return(
    <View style={{flex: 1,
      flexDirection: "column",
      backgroundColor: "grey",
      justifyContent: "space-around",
      alignItems: "center"}}>
      
      <View style={{flex: 1, flexDirection: "row", backgroundColor: "grey", justifyContent: "space-around", alignItems: "center"}}>


        <InputField 
          heading={"1RM"}
          fieldValue={this.state.max}
          stateUpdate={(newValue) => this.setState({"max": newValue})}
          defaultValue={0}
        />

        <InputField 
          heading={"Working weight"}
          fieldValue={this.state.working_weight}
          stateUpdate={(newValue) => this.setState({"working_weight": newValue})}
          defaultValue={0}
        />

      </View>
      
      <View style={{flex: 1, flexDirection: "column", backgroundColor: "grey", justifyContent: "space-around", alignItems: "center"}}>

        <ButtonInputField
          heading={"Target RPE"}
          fieldValue={this.state.rpe}
          stateUpdate={(newValue) => this.setState({"rpe": newValue})}
          defaultValue={0}
          lowerFieldValueBound={6}
          upperFieldValueBound={10}
          increment={0.5}
        />

        <ButtonInputField
          heading={"# Reps"}
          fieldValue={this.state.reps}
          stateUpdate={(newValue) => this.setState({"reps": newValue})}
          defaultValue={0}
          lowerFieldValueBound={1}
          upperFieldValueBound={10}
          increment={1}
        />
        
      </View>

      <View style={{flex: 1, flexDirection: "column", backgroundColor: "grey", justifyContent: "space-around", alignItems: "center"}}>
          <Button color="red" onPress={() => {this.computeWorkingWeight()}} title="Compute working weight"/>
          <Button color="red" onPress={() => {this.computeEstimatedMax()}} title="Compute estimated 1RM"/>
      </View>  
    </View>
    );
  }

}

AppRegistry.registerComponent("RPE_app", () => RPECalculator);
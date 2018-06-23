import React from 'react';
import { TextInput, Text, View, Button, AppRegistry } from 'react-native';

export default class ButtonInputField extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column", backgroundColor: "grey", justifyContent: "space-around", alignItems: "center" }}>

                <Text style={{ color: "black", fontSize: 15 }}>{this.props.heading}</Text>

                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "grey", justifyContent: "space-around", alignItems: "center" }}>

                    <Button title=" - " color="red" onPress={() => {
                        if (this.props.fieldValue <= this.props.lowerFieldValueBound 
                        || this.props.fieldValue > this.props.upperFieldValueBound) return;
                        else {
                            this.props.stateUpdate(this.props.fieldValue - this.props.increment);
                        }
                    }} />

                    <TextInput
                        style={{ height: 50, width: 60, color: "white", fontSize: 20, textAlign: "center" }}
                        keyboardType="numeric"
                        onChangeText={ (text) => this.props.stateUpdate(text ? parseFloat(text) : this.props.defaultValue) }
                        value= { this.props.fieldValue.toString() }
                    />

                    <Button title=" + " color="red" onPress={() => {
                        if (this.props.fieldValue < this.props.lowerFieldValueBound 
                        || this.props.fieldValue >= this.props.upperFieldValueBound) return;
                        else {
                            this.props.stateUpdate(this.props.fieldValue + this.props.increment);
                        }
                    }} />

                </View>

            </View>
        );
    }

}

AppRegistry.registerComponent("RPE_app", () => ButtonInputField);

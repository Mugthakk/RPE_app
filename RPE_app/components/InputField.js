import React from 'react';
import { TextInput, Text, View, AppRegistry } from 'react-native';

export default class InputField extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: "column", backgroundColor: "grey", justifyContent: "space-around", alignItems: "center"}}>
            <Text style={{color: "black", fontSize:15}}>{this.props.heading}</Text>
                <TextInput
                    style={{ height: 50, width: 60, color: "white", fontSize: 20, textAlign: "center" }}
                    keyboardType="numeric"
                    onChangeText = { (text) => this.props.stateUpdate(text ? parseFloat(text) : this.props.defaultValue) }
                    value= { this.props.fieldValue.toString() }
                />
            </View>
        );
    }

}

AppRegistry.registerComponent("RPE_app", () => InputField);

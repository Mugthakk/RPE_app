import React, { Component } from 'react';
import { Platform } from 'react-native';

import { RootNavigator } from "./config/router";

export default class App extends Component {
  render() {
    return (
        <RootNavigator />
    );
  }
}
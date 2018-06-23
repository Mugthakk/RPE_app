import React from 'react';
import { Platform } from 'react-native';

import { RootNavigator } from "./config/router";

export default class App extends React.Component {
  render() {
    return (
        <RootNavigator />
    );
  }
}
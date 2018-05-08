import React, { Component } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import {View, Button} from "react-native";

import MenuView from "../components/menuView"
import RPECalculator from "../components/rpeCalculator";
import RPEInfo from "../components/rpeInfo";



export const MenuStack = StackNavigator(
  {
    // Defines a set of routes, along with their screens and potential options (overriding the default below)
    Menu: {
      screen: MenuView,
      navigationOptions: {
        header: null
      } 
    },
    RPECalculator: {
      screen: RPECalculator,
    },
    Info: {
      screen: RPEInfo
    },
  },
  {
    // The options of this stack navigator, below the initial route is set to the Home-route with the screen of Homescreen.
    initialRouteName: "Menu",
    // Define standard rule for all routes
    navigationOptions: {
      headerTitle: null,
    },
  }
);

// Setting up a modal navigator to be able to stack navigator (do not need mode to Modal for this).
// Easily extended with more later if we need this.
export const RootNavigator = StackNavigator(
  {
    Menu:{
      screen: MenuStack
    },
  },
  {
    mode: "modal",
    headerMode: "None",
    initialRouteName: "Menu"
  }
);

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StackNavigationOptions,
  NativeStackNavigationOptions,
} from "@react-navigation/stack";

import * as Linking from "expo-linking";

import { AntDesign, Entypo } from "@expo/vector-icons";

import Home from "../src/screens/Home";
import Favorites from "../src/screens/Favorites";
import Details from "../src/screens/Details";
import Deeplinks from "../src/screens/DeepLink";

const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Deep: "film",
    },
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const defaultNavOptions = {
  headerTitleAlign: "center",
  height: 70,

  headerStyle: {
    height: 80,
    backgroundColor: "white",
    shadowRadius: 0,

    elevation: 0,
  },
  headerTitleStyle: {
    textAlign: "center",
    fontSize: 20,
  },

  headerTintColor: "black",
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        options={{ title: "Home" }}
        name='HomeScreen'
        component={Home}
      />
      <Stack.Screen
        name='Details'
        options={{ title: "Details" }}
        component={Details}
      />
      {/* <Stack.Screen
        name='Deep'
        options={{ title: "Deep" }}
        component={Deeplinks}
      /> */}
    </Stack.Navigator>
  );
}
function FavStack() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        options={{ title: "Favorites" }}
        name='FavoritesScreen'
        component={Favorites}
      />
      <Stack.Screen
        options={{ title: "Details" }}
        name='Details'
        component={Details}
      />
    </Stack.Navigator>
  );
}

export default function TabNav() {
  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: "red",
          inactiveBackgroundColor: "white",
          style: {
            backgroundColor: "white",
          },
          tabStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Entypo name='home' size={24} color={color} />
            ),
          }}
          name='Home'
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color }) => (
              <AntDesign name='heart' size={24} color={color} />
            ),
          }}
          name='Favorites'
          component={FavStack}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Deep",
            tabBarIcon: ({ color }) => (
              <AntDesign name='link' size={24} color={color} />
            ),
          }}
          name='Deep'
          component={Deeplinks}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

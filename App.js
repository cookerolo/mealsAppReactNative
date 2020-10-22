import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import Colors from "./constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";

const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer);

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const headerStyle = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    headerTitleStyle: {
      fontFamily: "open-sans"
    }
  };

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }
  const Home = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 14, fontFamily: "open-sans" },
          inactiveTintColor: "black",
          tabStyle: {
            // marginVertical: 5
          }
        }}
      >
        <Tab.Screen
          name="Meals"
          component={Meals}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-restaurant" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Filters"
          component={FilterStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="filter-list" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    );
  };

  const Meals = () => {
    return (
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={CategoriesScreen.options}
        />
        <Stack.Screen
          name="Category Meals"
          component={CategoryMealsScreen}
          options={CategoryMealsScreen.options}
        />
        <Stack.Screen
          name="Meal Detail"
          component={MealDetailScreen}
          options={MealDetailScreen.options}
        />
      </Stack.Navigator>
    );
  };
  const FilterStack = () => (
    <Stack.Navigator screenOptions={headerStyle}>
      <Tab.Screen name="Filter" component={FiltersScreen} options={FiltersScreen.options} />
    </Stack.Navigator>
  );
  const FavoritesStack = () => {
    return (
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={FavoritesScreen.options}
        />
        <Stack.Screen
          name="Meal Detail"
          component={MealDetailScreen}
          options={MealDetailScreen.options}
        />
      </Stack.Navigator>
    );
  };
  const MyDrawer = () => {
    return (
      <Drawer.Navigator drawerStyle={{ width: 158 }} screenOptions={headerStyle}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Your Favorites" component={FavoritesStack} />
        <Drawer.Screen name="Filter" component={FilterStack} />
      </Drawer.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "open-sans"
  }
});

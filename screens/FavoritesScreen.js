import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meal found! Start adding some...</DefaultText>
      </View>
    );
  }
  return <MealList listData={favoriteMeals} navigation={props.navigation} />;
};

FavoritesScreen.options = (navigationData) => {
  return {
    headerLeft: () => (
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        >
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    ),
    title: "Your favorites!"
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnView: {
    paddingHorizontal: 10
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default FavoritesScreen;

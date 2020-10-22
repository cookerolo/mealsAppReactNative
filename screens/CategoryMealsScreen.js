import React from "react";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  const { categoryId, categoryTitle } = props.route.params;
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayMeals = availableMeals.filter((meal) => meal.categoriyIds.indexOf(categoryId) >= 0);

  if (displayMeals.length === 0 || !displayMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals for the applied filters!</DefaultText>
      </View>
    );
  }
  return <MealList listData={displayMeals} navigation={props.navigation} />;
};
CategoryMealsScreen.options = (navigationData) => {
  return {
    title: navigationData.route.params.categoryTitle
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryMealsScreen;

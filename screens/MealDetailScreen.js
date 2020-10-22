import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const MealDetailScreen = (props) => {
  const { mealId } = props.route.params;
  const availableMeals = useSelector((state) => state.meals.meals);
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);
  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <View style={styles.mealItem}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground source={{ uri: selectedMeal.imageUrl }} style={styles.bgnImg}>
            <Text style={styles.title} numberOfLines={1}>
              {selectedMeal.title}
            </Text>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <DefaultText>{selectedMeal.duration}</DefaultText>
          <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
      </View>
      <View>
        <Text style={{ ...styles.title, ...styles.subTitle }}>Ingredients</Text>
        {selectedMeal.ingredients.map((ingredient) => (
          <Text key={ingredient} style={styles.text}>
            - {ingredient}
          </Text>
        ))}
        <Text style={{ ...styles.title, ...styles.subTitle }}>Steps</Text>
        {selectedMeal.steps.map((step) => (
          <Text key={step} style={styles.text}>
            - {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};
MealDetailScreen.options = (navigationData) => {
  const toggleFavorite = navigationData.route.params.toggleFav;
  const isFav = navigationData.route.params.isFav;
  return {
    title: navigationData.route.params.mealTitle,
    headerRight: () => (
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite();
          }}
        >
          <MaterialIcons name={isFav ? "favorite" : "favorite-border"} size={23} color="white" />
        </TouchableOpacity>
      </View>
    )
  };
};
const styles = StyleSheet.create({
  mealView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mealRow: {
    flexDirection: "row"
  },
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5
  },
  mealHeader: {
    height: "85%"
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%"
  },
  bgnImg: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  title: {
    marginHorizontal: 5,
    borderRadius: 5,
    fontFamily: "open-sans-bold",
    fontSize: 17,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 5,
    textAlign: "center"
  },
  subTitle: {
    fontSize: 15,
    textAlign: "left",
    padding: 4
  },
  text: {
    marginLeft: 10,
    marginRight: 5,
    padding: 1,
    fontFamily: "open-sans"
  },
  btnView: {
    paddingHorizontal: 10
  }
});
export default MealDetailScreen;

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { LogBox } from "react-native";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.lighterPrimary, false: "#c7c7c7" }}
        thumbColor={Colors.primary}
        value={props.value}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };
    alert("Filters Applied!");
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters </Text>
      <FilterSwitch
        label="Gluten free"
        value={isGlutenFree}
        onChange={(newValue) => {
          setIsGlutenFree(newValue);
        }}
      />
      <FilterSwitch
        label="Lactose free"
        value={isLactoseFree}
        onChange={(newValue) => {
          setIsLactoseFree(newValue);
        }}
      />
      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onChange={(newValue) => {
          setIsVegan(newValue);
        }}
      />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={(newValue) => {
          setIsVegetarian(newValue);
        }}
      />
    </View>
  );
};
FiltersScreen.options = (navigationData) => {
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
    headerRight: () => (
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => {
            navigationData.route.params.save();
          }}
        >
          <MaterialIcons name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>
    ),
    title: "Filter your meals!"
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  btnView: {
    paddingHorizontal: 10
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  }
});
export default FiltersScreen;

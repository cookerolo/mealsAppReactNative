import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CATEGORIES } from "../data/dummy-data";

const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() =>
          props.navigation.navigate("Category Meals", {
            categoryId: itemData.item.id,
            categoryTitle: itemData.item.title
          })
        }
      >
        <View style={{ ...styles.container, ...{ backgroundColor: itemData.item.color } }}>
          <Text style={styles.title}>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
      keyExtractor={(item, index) => item.id}
    />
  );
};

CategoriesScreen.options = (navigationData) => {
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
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    elevation: 10
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    textAlign: "right"
  },
  btnView: {
    paddingHorizontal: 10
  }
});
export default CategoriesScreen;

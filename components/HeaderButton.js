import React from "react";
import { TouchableOpacity } from "react-native";
import { MEALS } from "../data/dummy-data";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={() => alert("This is a Header button!")}>
      <MaterialIcons name="favorite-border" size={24} color="white" />
    </TouchableOpacity>
  );
};
export default HeaderButton;

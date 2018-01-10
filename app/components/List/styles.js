import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
    //backgroundColor: "#5D6874"
  },

  listLeft: {
    marginTop: 12,
    flexDirection: "row",
    marginBottom: 10
  },

  contentDetail: {
    marginLeft: 8,
    paddingHorizontal: 12
  },

  textContent: {
    //color: "white",
    fontSize: 14,
    paddingTop: 5
  },

  icon: {
    alignItems: "flex-end",
    marginTop: 12
  }
});

export default styles;

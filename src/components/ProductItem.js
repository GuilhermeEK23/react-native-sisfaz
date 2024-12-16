import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export const ProductItem = ({ product, handleProductPress }) => {
  return (
    <View>
      <TouchableOpacity
        key={product.IdProduct}
        style={styles.productSquare}
        onPress={() => handleProductPress(product)}
      >
        <Text style={styles.productText}>{product.Description}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productSquare: {
    backgroundColor: "#5B9A55",
    width: width / 4.5 - 15,
    height: width / 4.5 - 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
});

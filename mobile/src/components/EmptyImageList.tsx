import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function EmptyImageList() {
  const { navigate } = useNavigation();

  return (
    <View className="items-center">
      <Text className="font-medium text-gray-500">
        Faça parte desse mundo criativo e{" "}
        <Text className="text-gray-900" onPress={() => navigate("Create")}>
          crie uma imagem
        </Text>
      </Text>
    </View>
  );
}

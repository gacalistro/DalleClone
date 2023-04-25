import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components/Header";
import { ScreenTitle } from "../components/ScreenTitle";
import { ListImage } from "../components/ListImage";

export type CommunityImageProps = {
  id: string;
  prompt: string;
  url: string;
  createdAt: string;
  user: {
    name: string;
  };
};

export function Home() {
  const [communityImages, setCommunityImages] = useState<CommunityImageProps[]>(
    []
  );

  const { navigate } = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.82:3000/images")
      .then((response) => response.json())
      .then((data) => setCommunityImages(data));
  }, []);

  return (
    <View className="flex-1 pt-8 px-4 pb-2">
      <Header />

      <ScreenTitle
        title="Galeria da Comunidade"
        subtitle="Explore a coleção de imagens criativas e deslumbrantes geradas pela
          DALL·E 2"
      />

      <ListImage data={communityImages} />

      <View className="mt-4 px-4 py-3 bg-gray-200 rounded-md">
        <Text className="font-bold text-lg">Compartilhe sua criatividade</Text>
        <Text className="font-medium text-gray-500">
          Faça parte da comunidade e apresente sua imagem na galeria
        </Text>

        <TouchableOpacity
          className="mt-2 w-40 px-4 py-3 bg-gray-900 rounded-md"
          onPress={() => navigate("Create")}
        >
          <Text className="font-semibold text-white text-center">
            Gerar imagem
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-end">
          <View className="w-5 h-5 bg-[#ffff65]" />
          <View className="w-5 h-5 bg-[#40ffff]" />
          <View className="w-5 h-5 bg-[#52db4d]" />
          <View className="w-5 h-5 bg-[#ff6e3e]" />
          <View className="w-5 h-5 bg-[#3e46ff]" />
        </View>
      </View>
    </View>
  );
}

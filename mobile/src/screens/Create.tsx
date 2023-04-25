import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageSvg } from "phosphor-react-native";

import { AuthContext } from "../contexts/AuthContext";

import { Header } from "../components/Header";
import { ScreenTitle } from "../components/ScreenTitle";

import { getRandomPrompt } from "../utils/getRandomPrompt";

type FormDataType = {
  prompt: string;
  openAiImage: string;
};

export function Create() {
  const [prompt, setPrompt] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    openAiImage: "",
    prompt: "",
  });

  const { logout } = useContext(AuthContext);
  const { navigate } = useNavigation();

  function clearImage() {
    setFormData((prevState) => {
      return {
        ...prevState,
        openAiImage: "",
      };
    });
  }

  async function handleGenerateImage() {
    try {
      setLoadingImage(true);
      clearImage();

      const token = await getItemAsync("dalle-user-token");

      if (!token) {
        setLoadingImage(false);

        logout;
      }

      await fetch("http://192.168.1.82:3000/genimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          setFormData({
            openAiImage: `data:image/jpeg;base64,${data.openAiImage}`,
            prompt,
          });
        })
        .finally(() => setLoadingImage(false));
    } catch (error) {
      console.log(error);
    }
  }

  function handleSupriseMe() {
    const randomPrompt = getRandomPrompt(prompt);

    setPrompt(randomPrompt);
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true);

      const token = await getItemAsync("dalle-user-token");

      if (!token) {
        setIsSubmitting(false);
        logout;
      }

      await fetch("http://192.168.1.82:3000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          if (response.status === 201) {
            navigate("Home");
          }
        })
        .finally(() => setIsSubmitting(false));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="flex-1 pt-8 px-4 pb-2">
      <Header />

      <ScreenTitle title="Crie" />

      <Text className="text-gray-400">Comece com uma descrição detalhada</Text>

      {/* Prompt Input */}
      <View className="my-2 flex-row items-center justify-center bg-white rounded-md">
        <TextInput
          className="w-10/12 p-3 border-r border-gray-200"
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Girassóis em um vaso roxo ..."
        />
        <TouchableOpacity
          className="flex-grow items-center justify-center"
          onPress={handleGenerateImage}
          disabled={!prompt.trim() || loadingImage || isSubmitting}
        >
          {loadingImage ? (
            <ActivityIndicator />
          ) : prompt.trim() === "" ? (
            <Text className="text-gray-400">Gerar</Text>
          ) : (
            <Text className="font-bold text-black">Gerar</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Surprise me Button */}
      <TouchableOpacity
        className="px-2 py-3 bg-gray-300 rounded-md"
        disabled={loadingImage || isSubmitting}
        onPress={handleSupriseMe}
      >
        <Text className="font-semibold text-xs text-center">Me surpreenda</Text>
      </TouchableOpacity>

      {/* Image generated */}
      <View className="py-6 flex-1 items-center justify-center">
        {formData.openAiImage ? (
          <Image
            source={{ uri: formData.openAiImage }}
            className="w-full h-full rounded-md"
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-gray-200 rounded-md">
            <ImageSvg size={110} color="gray" />
          </View>
        )}
      </View>

      <TouchableOpacity
        className="w-full py-4 bg-gray-900 rounded-md"
        disabled={formData.openAiImage === "" || loadingImage || isSubmitting}
        onPress={handleSubmit}
      >
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-center text-gray-100">
            Compartilhar com a comunidade
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

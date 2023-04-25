import { useState, useEffect, useContext } from "react";
import { View, SafeAreaView } from "react-native";

import { AuthContext } from "../contexts/AuthContext";

import { Header } from "../components/Header";
import { ListImage } from "../components/ListImage";
import { ScreenTitle } from "../components/ScreenTitle";

import { CommunityImageProps } from "./Home";

export function History() {
  const [userImages, setUserImages] = useState<CommunityImageProps[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://192.168.1.82:3000/history/${user?.id}`)
      .then((response) => response.json())
      .then((data) => setUserImages(data));
  }, []);

  return (
    <View className="flex-1 pt-8 px-4 pb-2">
      <Header />

      <ScreenTitle
        title="Histórico"
        subtitle="Todas as imagens criadas por você"
      />
      <ListImage data={userImages} />
    </View>
  );
}

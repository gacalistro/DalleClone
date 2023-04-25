import { FlatList, View } from "react-native";

import { GeneratedImage } from "./GeneratedImage";
import { EmptyImageList } from "./EmptyImageList";

import { CommunityImageProps } from "../screens/Home";

interface ListImageProps {
  data: CommunityImageProps[];
}

export function ListImage({ data }: ListImageProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GeneratedImage {...item} />}
      ItemSeparatorComponent={() => <View className="my-1" />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyImageList}
    />
  );
}

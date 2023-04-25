import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { CommunityImageProps } from "../screens/Home";

export function GeneratedImage({
  prompt,
  url,
  user: { name },
}: CommunityImageProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TouchableOpacity
      className="rounded-md overflow-hidden relative"
      onPress={() => setShowDetails(!showDetails)}
      activeOpacity={1}
    >
      <Image source={{ uri: url }} className="h-96" />
      {showDetails && (
        <View className="absolute bottom-0 left-0 w-full px-3 py-2 bg-gray-900 rounded-t-md">
          <Text className="text-gray-200">{prompt}</Text>
          <Text className="mt-2 font-bold text-gray-200">{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

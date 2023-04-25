import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  createDownloadResumable,
  documentDirectory,
  FileSystemDownloadResult,
} from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Share } from "phosphor-react-native";

import { CommunityImageProps } from "../screens/Home";

export function GeneratedImage({
  id,
  prompt,
  url,
  user: { name },
}: CommunityImageProps) {
  const [showDetails, setShowDetails] = useState(false);

  async function handleDownload() {
    const downloadResumable = createDownloadResumable(
      url,
      documentDirectory + `${id}.jpg`
    );

    try {
      const { uri } =
        (await downloadResumable.downloadAsync()) as FileSystemDownloadResult;

      await shareAsync(uri);
    } catch (e) {
      console.error(e);
    }
  }

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
          <View className="flex-row items-end justify-between">
            <Text className="mt-4 font-bold text-gray-200">{name}</Text>

            <TouchableOpacity onPress={handleDownload}>
              <Share color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

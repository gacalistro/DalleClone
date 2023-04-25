import { View, Text } from "react-native";

interface ScreenTitleProps {
  title: string;
  subtitle?: string;
}

export function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <View className="mb-6">
      <Text className="font-bold text-2xl text-center">{title}</Text>
      {subtitle && (
        <Text className="mt-1 font-medium text-base leading-5 text-gray-500 text-center">
          {subtitle}
        </Text>
      )}
    </View>
  );
}

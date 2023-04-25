import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { AuthContext } from "../contexts/AuthContext";

import Logo from "../assets/openai.svg";

const formSchema = z.object({
  email: z.string().nonempty("Campo obrigatório").email("Email incorreto"),
  password: z
    .string()
    .nonempty("Campo obrigatório")
    .min(5, "Mínimo de 5 caracteres"),
});

export type formDataType = z.infer<typeof formSchema>;

export function Login() {
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formDataType>({
    resolver: zodResolver(formSchema),
  });

  const { navigate } = useNavigation();

  const { login } = useContext(AuthContext);

  async function onSubmit(data: formDataType) {
    try {
      await login(data);
    } catch (error) {
      await new Promise((resolve) => {
        setLoginErrorMessage(error as string);
        setTimeout(resolve, 2500);
      });
      setLoginErrorMessage(null);
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-4">
      <View className="items-center">
        <Logo />

        <Text className="mt-2 mb-6 font-bold text-2xl">Use sua conta</Text>
      </View>

      {/* EMAIL FIELD */}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="email"
            className="w-3/4 p-4 border border-gray-400 rounded-md"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text className="mt-1 text-red-500">{errors.email.message}</Text>
      )}

      {/* PASSWORD FIELD */}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            className="w-3/4 mt-4 p-4 border border-gray-400 rounded-md"
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text className="mt-1 text-red-500">{errors.password.message}</Text>
      )}

      {/* SUBMIT BUTTON */}
      <View className="w-3/4 mt-5">
        {loginErrorMessage && (
          <Text className="mb-1 text-red-500 text-center">
            {loginErrorMessage}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mb-4 p-4 bg-green-500 rounded-md"
          activeOpacity={0.7}
          disabled={!!loginErrorMessage}
        >
          <Text className="text-center font-medium text-white">Continuar</Text>
        </TouchableOpacity>
      </View>

      {/* SEND TO SIGNIN SCREEN BUTTON */}
      <View className="flex-row items-center">
        <Text className="font-medium mr-2">Não tem uma conta?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate("Signin")}
        >
          <Text className="font-medium text-green-500">Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

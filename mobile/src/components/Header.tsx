import { useContext, useState } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { CaretDown, X } from "phosphor-react-native";

import Logo from "../assets/openai.svg";

import { AuthContext } from "../contexts/AuthContext";

export function Header() {
  const [openNavigationModal, setOpenNavigationModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const { navigate } = useNavigation();

  const screenIndex = useNavigationState(
    (state) => state.routes[state.routes.length - 1].name
  );

  const { logout, user } = useContext(AuthContext);

  function closeAllModals() {
    setOpenNavigationModal(false);
    setOpenUserModal(false);
  }

  function handleNavigate(route: string) {
    closeAllModals();

    route === "Home"
      ? navigate("Home")
      : route === "History"
      ? navigate("History")
      : route === "Create"
      ? navigate("Create")
      : null;
  }

  return (
    <View className="mb-6 flex-row items-center justify-between">
      <Logo />

      {/* OPENS MODAL */}
      <TouchableOpacity
        onPress={() => setOpenNavigationModal(true)}
        className="flex-row items-center"
      >
        {/* "routeNames": ["Home", "History", "Create"] */}
        <Text className="font-bold mr-1">
          {screenIndex === "Home"
            ? "DALL·E"
            : screenIndex === "Create"
            ? "Criar"
            : "Histórico"}
        </Text>

        <CaretDown size={16} />
      </TouchableOpacity>

      {/* USER */}
      <TouchableOpacity
        className="w-9 h-9 rounded-full bg-black items-center justify-center"
        onPress={() => setOpenUserModal(true)}
      >
        <Text className="font-semibold text-base text-white">
          {user?.name.charAt(0)}
        </Text>
      </TouchableOpacity>

      {/* NAVIGATION MODAL */}
      <Modal visible={openNavigationModal} animationType="slide">
        <View className="flex-1 px-4 pt-3">
          <TouchableOpacity
            onPress={() => setOpenNavigationModal(false)}
            className="absolute top-3 right-4 z-10"
          >
            <X />
          </TouchableOpacity>

          <View className="flex-1 items-center justify-center relative z-[5]">
            <Text className="font-semibold">{user?.name}</Text>
            <Text className="mb-6 font-medium text-gray-400">
              {user?.email}
            </Text>

            <TouchableOpacity
              className="w-full py-4 bg-gray-200 rounded-md"
              onPress={() => handleNavigate("Home")}
            >
              <Text className="text-center font-medium">DALL·E</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full my-3 py-3 bg-gray-200 rounded-md"
              onPress={() => handleNavigate("Create")}
            >
              <Text className="text-center font-medium">Criar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full py-4 bg-gray-200 rounded-md"
              onPress={() => handleNavigate("History")}
            >
              <Text className="text-center font-medium">Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* USER MODAL */}
      <Modal visible={openUserModal} animationType="slide">
        <View className="flex-1 px-4 pt-3">
          <TouchableOpacity
            onPress={() => setOpenUserModal(false)}
            className="absolute top-3 right-4 z-10"
          >
            <X />
          </TouchableOpacity>

          <View className="flex-1 items-center justify-center relative z-[5]">
            <Text className="font-semibold">{user?.name}</Text>
            <Text className="mb-6 font-medium text-gray-400">
              {user?.email}
            </Text>

            <TouchableOpacity
              className="w-full py-4 bg-gray-200 rounded-md"
              onPress={() => {
                closeAllModals();
                logout();
              }}
            >
              <Text className="text-center font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

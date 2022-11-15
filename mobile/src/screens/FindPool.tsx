import React, { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { api } from "../services/api";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function FindPool() {
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setLoading(true);

      if (!code.trim()) {
        setLoading(false);

        return toast.show({
          title: "Informe o código.",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        })
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Você no bolão com sucesso!",
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      })

      navigate('pools')
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error.response?.data?.message === "Pool not found.") {
        return toast.show({
          title: "Não foi possível encontrar o bolão.",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        })
      };

      if (error.response?.data?.message === "You already joined this pool.") {
        return toast.show({
          title: "Você já está nesse bolão.",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        })
      };

      toast.show({
        title: "Pool not found.",
        placement: "top",
        duration: 3000,
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex="1" bgColor="gray.900">
        <Header showBackButton title="Buscar por código" />

        <VStack mt={8} mx={5} alignItems="center">
            <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                Encontre um bolão através de{'\n'} seu código único
            </Heading>

            <Input
                mb={2}
                placeholder="Qual o código do bolão?"
                maxLength={6}
                autoCapitalize="characters"
                onChangeText={setCode}
            />

            <Button
              title="BUSCAR BOLÃO"
              isLoading={isLoading}
              onPress={handleJoinPool}
            />
        </VStack>
    </VStack>
  )
}

import React, { useEffect, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

import { Octicons } from "@expo/vector-icons";

export function Pools() {
  const [isLoading, setLoading] = useState(true);
  const [pools, setPools] = useState<PoolCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPools() {
    try {
      setLoading(true);
      const response = await api.get("/pools")
      setPools(response.data.pools)
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Not possible to get pools",
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPools();
  }, []);

  return (
    <VStack flex="1" bgColor="gray.900">
        <Header title="Meus bolões" />
        <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
            <Button 
                title="BUSCAR BOLÃO POR CÓDIGO" 
                leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                onPress={() => navigate('findpool')}
            />
        </VStack>

        <FlatList 
          data={[]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={}
        />
    </VStack>
  )
}

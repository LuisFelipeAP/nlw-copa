import { HStack, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";
import { Share } from "react-native";

interface RouteParams {
    id: string;
}

export function Details() {
    const [isLoading, setLoading] = useState(false);
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses")

    const route = useRoute();
    const { id } = route.params as RouteParams;

    const toast = useToast();

    async function fetchPoolDetails() {
        try {
            setLoading(true)

            const response = await api.get(`/pools/${id}`);
            setPoolDetails(response.data.pool);
        } catch (error) {
            console.log(error);

            toast.show({
                title: "Pool details not found",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            })
        } finally {
            setLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code
        })
    }

    useEffect(() => {
        fetchPoolDetails();
    }, [id])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare} />

            {
                poolDetails._count?.participants > 0
                ? <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={3}>
                        <Option title="Seus palpites" isSelected={optionSelected === 'guesses'} onPress={() => setOptionSelected("guesses")} />
                        <Option title="Ranking do Grupo" isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelected("ranking")} />
                    </HStack>

                    <Guesses poolId={poolDetails.id} code={poolDetails.code} />
                </VStack>
                : <EmptyMyPoolList code={poolDetails.code} />
            }
        </VStack>
    )
}

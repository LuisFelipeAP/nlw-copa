import { useToast, FlatList } from 'native-base';
import { useEffect, useState } from 'react';

import { api } from "../services/api";

import { Game, GameProps } from "../components/Game"
import { Loading } from './Loading';
import { EmptyMyPoolList } from './EmptyMyPoolList';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);

  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games)

    } catch (error) {
      console.log(error);

      toast.show({
        title: "Pools not found",
        placement: "top",
        duration: 3000,
        bgColor: "red.500",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar para palpitar",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite realizado com sucesso!",
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      })

      fetchGames();
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível enviar o palpite",
        placement: "top",
        duration: 3000,
        bgColor: "red.500",
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [poolId])

  if(isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      mb={10}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )} 
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}

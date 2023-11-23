// components/players/PlayerList.jsx

import PlayerCard from "./PlayerCard";
import { SimpleGrid, Spacer } from "@chakra-ui/react";

const PlayerList = ({ players, loading }) => {
  if (loading) {
    return <div>Loading players...</div>;
  }
  return (
    <div>
    <SimpleGrid columns={3} spacing={4}>
      {players.map((player) => (
        <PlayerCard key={player.id} {...player} />
      ))}
    </SimpleGrid>
    <Spacer/>
</div>
  );
};

export default PlayerList;

import React, {useState} from 'react';
import {useRouteMatch} from 'react-router-dom';

import Charts from '../Charts';
import PlayerSelector from '../../components/PlayerSelector';
import {usePlayersApi} from '../../hooks';

export default function ChartDashboard() {
  const [players] = usePlayersApi();
  const match = useRouteMatch('/players/:playerId');
  const slugPlayerId =
    match && match.params ? parseInt(match.params.playerId) : 2544;
  const [playerId, setPlayerId] = useState(slugPlayerId);

  if (slugPlayerId && slugPlayerId !== playerId) {
    setPlayerId(slugPlayerId);
  }

  if (players === undefined) {
    return <div>Still fetching data</div>;
  }
  if (players.length === 0) {
    return <div>No players found</div>;
  }

  return (
    <div>
      <PlayerSelector
        player={playerId}
        players={players}
        setPlayerId={setPlayerId}
      />
      <Charts playerId={playerId} />
    </div>
  );
}

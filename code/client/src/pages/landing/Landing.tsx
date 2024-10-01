import { Stack } from '@chakra-ui/react';
import { BaseButton } from '@components/Cards/Buttons';
import InteractiveCard from '@components/Cards/InteractiveCard';
import { IconInput } from '@components/Inputs';
import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useServicesContext } from '@hooks/useServiceContext';
import { useState } from 'react';

export function Landing() {
  const { landing } = useServicesContext();

  const [profile, setProfile] = useState({
    playerId: '123',
    name: '',
    pic: '',
  });

  const createGameMutation = landing.useCreateGame(profile);
  const joinGameMutation = landing.useJoinGame(profile);

  const handleNewGame = async () => {
    createGameMutation.mutate();
    //navigate('/game/new');
  };

  const handleJoinGame = () => {
    joinGameMutation.mutate('123');
    //navigate('/game/join');
  };

  return (
    <>
      {/* New Game Card */}
      <InteractiveCard onClick={handleNewGame}>New Game</InteractiveCard>

      {/* Join Game Card */}
      <InteractiveCard>
        <Stack gap={'1rem'} className="h-full m-4" justifyContent={'center'}>
          {/* Code Input*/}
          <IconInput
            anchor="left"
            type="number"
            placeholder="Enter Game Code"
            icon={<FontAwesomeIcon icon={faLink} />}
          />
          {/* Join Game button*/}
          <BaseButton className="text-xl rounded-lg p2" onClick={handleJoinGame}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </BaseButton>
        </Stack>
      </InteractiveCard>
    </>
  );
}

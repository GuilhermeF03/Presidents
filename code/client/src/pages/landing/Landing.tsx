import { HStack, Stack } from '@chakra-ui/react';
import { BaseButton } from '@components/Cards/Buttons';
import InteractiveCard from '@components/Cards/InteractiveCard';
import { IconInput } from '@components/Inputs';
import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProfileContext } from '@hooks/useProfileContext';
import { useServicesContext } from '@hooks/useServiceContext';

export function Landing() {
  const { landing } = useServicesContext();

  const { profile } = useProfileContext();

  const createGameMutation = landing.useCreateGame(profile);
  const joinGameMutation = landing.useJoinGame(profile);

  const handleNewGame = async () => {
    createGameMutation?.mutate();
    //navigate('/game/new');
  };

  const handleJoinGame = () => {
    joinGameMutation?.mutate('123');
    //navigate('/game/join');
  };

  return (
    <HStack gap={'6rem'} className="items-center justify-center w-full">
      {!profile ? (
        <>
          <InteractiveCard>Log In</InteractiveCard>
        </>
      ) : (
        <>
          {/* New Game Card */}
          <InteractiveCard onClick={handleNewGame}>New Game</InteractiveCard>

          {/* Join Game Card */}
          <InteractiveCard>
            <Stack gap={'1rem'} className="h-full m-4 justify-center">
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
      )}
    </HStack>
  );
}

import { FormControl, HStack, Stack } from '@chakra-ui/react';
import { BaseButton } from '@components/cards/Buttons';
import InteractiveCard from '@components/cards/InteractiveCard';
import { IconInput } from '@components/inputs/IconInput.tsx';
import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProfileContext } from '@hooks/useProfileContext';
import { useServicesContext } from '@hooks/useServiceContext';
import { useCallback, useRef } from 'react';

export function Landing() {
  // Hooks
  const { landing } = useServicesContext();
  const { profile } = useProfileContext();
  const joinGameCode = useRef<HTMLInputElement>(null);

  // TRPC procedures
  const createGameMutation = landing.useCreateGame(profile);
  //const joinGameMutation = landing.useJoinGame(profile);

  const handleNewGame = useCallback(async () => {
    console.log('Creating new game...');
    const code: string = await createGameMutation?.mutate();
    console.log('Game code: ', code);

    // navigate('/game/new');
  }, [createGameMutation]);

  const handleJoinGame = useCallback(() => {
    console.log(`Joining game with code: ${joinGameCode.current?.value}`);
    // joinGameMutation?.mutate('123');
    // navigate('/game/join');
  }, []);

  return (
    <HStack spacing="6rem" align="center" justify="center" w="full">
      {/* New Game Card */}
      <InteractiveCard onClick={handleNewGame}>New Game</InteractiveCard>

      {/* Join Game Card */}
      <InteractiveCard>
        <Stack spacing="1rem" h="full" m="4" justify="center">
          <FormControl>
            <IconInput
              anchor="left"
              type="number"
              placeholder="Enter Game Code"
              icon={<FontAwesomeIcon icon={faLink} />}
              ref={joinGameCode}
            />

            <BaseButton fontSize="xl" borderRadius="lg" p="2" onClick={handleJoinGame}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </BaseButton>
          </FormControl>
        </Stack>
      </InteractiveCard>
    </HStack>
  );
}

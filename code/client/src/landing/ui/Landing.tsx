import { BaseButton } from '@/core/components/Cards/Buttons';
import InteractiveCard from '@/core/components/Cards/InteractiveCard';
import Footer from '@/core/components/Footer';
import { IconInput } from '@/core/components/Inputs';
import NavBar from '@/core/components/NavBar';
import { Flex, Stack } from '@chakra-ui/react';
import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/game/new');
  };

  return (
    <Flex className="w-screen max-h-screen min-h-screen" direction="column" h="100vh">
      <NavBar />
      <Flex
        className="h-full gap-8 p-8 bg-green-500 grow md:gap-56 md:p-16"
        direction="row"
        align={'center'}
        justifyContent={'center'}
      >
        {/* New Game Card */}
        <InteractiveCard>New Game</InteractiveCard>

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
            <BaseButton className="text-xl rounded-lg p2">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </BaseButton>
          </Stack>
        </InteractiveCard>
      </Flex>
      <Footer />
    </Flex>
  );
}

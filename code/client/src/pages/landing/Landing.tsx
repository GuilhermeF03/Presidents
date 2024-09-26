import { BaseButton } from '@/core/components/Cards/Buttons';
import InteractiveCard from '@/core/components/Cards/InteractiveCard';
import Footer from '@/core/components/Footer';
import { BaseInput } from '@/core/components/Inputs';
import NavBar from '@/core/components/NavBar';
import { Flex, Stack } from '@chakra-ui/react';

export function Landing() {
  return (
    <Flex className="min-h-screen max-h-screen w-screen" direction="column" h="100vh">
      <NavBar />
      <Flex
        className="bg-green-500 grow p-8 md:p-16 gap-8 md:gap-56 h-full"
        direction="row"
        align={'center'}
        justifyContent={'center'}
      >
        <InteractiveCard>New Game</InteractiveCard>
        <InteractiveCard>
          <Stack gap={'1rem'} className="m-4 h-full" justifyContent={'center'}>
            <BaseInput type="number" placeholder="Enter Game Code" />
            <BaseButton className="text-xl p2 rounded-lg bg-blue-400 font-bold text-gray-200">Join Game</BaseButton>
          </Stack>
        </InteractiveCard>
      </Flex>
      <Footer />
    </Flex>
  );
}

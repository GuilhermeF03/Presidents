import InteractiveCard from '@/core/components/Cards/InteractiveCard';
import Footer from '@/core/components/Footer';
import NavBar from '@/core/components/NavBar';
import { Flex } from '@chakra-ui/react';

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
        <InteractiveCard>Join Game</InteractiveCard>
      </Flex>
      <Footer />
    </Flex>
  );
}

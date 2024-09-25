import { Button, Flex, Heading } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Flex className="p-4 md:p-8 items-center justify-center h-auto md:h-[10%] w-full bg-red-500 grow-0" direction="row">
      <Heading className="text-3xl md:text-6xl">Presidents</Heading>
      <Button className="rounded-full bg-blue-500 w-12 h-12 md:w-16 md:h-16 right-4" position={'absolute'}></Button>
    </Flex>
  );
}

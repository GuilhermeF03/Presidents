import { Button, Flex, Heading } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Flex className="h-auto w-full grow-0 items-center justify-center bg-red-500 p-4 md:h-[10%] md:p-8" direction="row">
      <Heading className="text-3xl md:text-6xl">Presidents</Heading>
      <Button
        __css=""
        className="right-4 h-12 w-12 rounded-full bg-blue-500 md:h-16 md:w-16"
        position={'absolute'}
      ></Button>
    </Flex>
  );
}

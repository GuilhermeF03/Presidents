import { Flex, Heading } from '@chakra-ui/react';
import { ProfileMenu } from '@components/layouts/nav-bar/profile/ProfileMenu.tsx';

export default function NavBar() {
  return (
    <Flex className="h-auto w-full grow-0 items-center justify-center bg-red-500 p-4 md:h-[10%] md:p-8" direction="row">
      <Heading className="text-3xl md:text-6xl">Presidents</Heading>
      <ProfileMenu />
    </Flex>
  );
}

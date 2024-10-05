import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useProfileContext } from '@hooks/useProfileContext';
import { useRef } from 'react';

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const { profile } = useProfileContext();

  return (
    <Flex className="h-auto w-full grow-0 items-center justify-center bg-red-500 p-4 md:h-[10%] md:p-8" direction="row">
      <Heading className="text-3xl md:text-6xl">Presidents</Heading>
      <Button
        ref={btnRef}
        onClick={onOpen}
        className="right-4 h-12 w-12 rounded-full bg-blue-500 md:h-16 md:w-16"
        position={'absolute'}
        bgImage={profile.pic !== '' ? profile.pic : ''} // pic is base 64 string
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Button>Presidents</Button>
            <Button>Presidents</Button>
            <Button>Presidents</Button>
            <Button>Presidents</Button>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

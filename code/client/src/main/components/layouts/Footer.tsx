import { Flex, HStack, Link, Text } from '@chakra-ui/react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <Flex direction="row" className="h-auto w-full grow-0 items-center justify-center bg-blue-500 p-4 md:h-[5%] md:p-8">
      {/* GitHub Link */}
      <Link
        className="text-base text-white hover:text-sky-100 md:text-xl"
        href="https://github.com/GuilhermeF03/Presidents"
        isExternal
      >
        <HStack>
          <Text>Presidents</Text>

          <FontAwesomeIcon icon={faGithub} />
        </HStack>
      </Link>
    </Flex>
  );
}

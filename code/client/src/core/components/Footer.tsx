import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InteractiveCard from './Cards/InteractiveCard';
import { Flex, Text, Link, HStack } from '@chakra-ui/react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <Flex
      direction="row"
      className="p-4 md:p-8 items-center justify-center h-auto md:h-[10%] w-full bg-blue-500 grow-0"
    >
      {/* GitHub Link */}
      <Link
        className="text-base md:text-xl text-white hover:text-sky-100"
        href="https://github.com/GuilhermeF03/Presidents"
        isExternal
      >
        <HStack>
          <Text>Presidents</Text>
          <FontAwesomeIcon icon={faGithub} />
        </HStack>
      </Link>

      {/* About Button */}
      <InteractiveCard
        className="
        w-8 h-8 text-base hover:scale-110 hover:text-lg border-[5px] rounded-full
        md:w-16 md:h-16 md:text-xl hover:md:text-3xl right-4
        "
        position={'absolute'}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </InteractiveCard>
    </Flex>
  );
}

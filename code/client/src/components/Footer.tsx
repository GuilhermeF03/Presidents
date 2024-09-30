import { Flex, HStack, Link, Text } from '@chakra-ui/react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InteractiveCard from './Cards/InteractiveCard';

export default function Footer() {
  return (
    <Flex
      direction="row"
      className="h-auto w-full grow-0 items-center justify-center bg-blue-500 p-4 md:h-[10%] md:p-8"
    >
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

      {/* About Button */}
      {/* <InteractiveCard
      width={['4','12']}
      height={['4','12']}
      fontSize={{base: '1rem',md: '1.25rem',}}
        className="
        hover:scale-110 hover:text-lg border-[5px] rounded-full
        hover:md:text-3xl right-4
        "
        position={'absolute'}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </InteractiveCard> */}
    </Flex>
  );
}

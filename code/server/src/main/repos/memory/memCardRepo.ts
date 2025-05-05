import type { CardRepo } from '@/main/repos/types.ts';
import type { Logger } from 'winston';

const memCardRepo = (logger: Logger) => {
  const getDeck: CardRepo['getDeck'] = async () => {
    logger.info('Getting deck');
    return ['card1', 'card2', 'card3'];
  };

  const shuffleDeck: CardRepo['shuffleDeck'] = async ({ deck }) => {
    logger.info('Shuffling deck');
    return deck;
  };

  const dealCard: CardRepo['dealCard'] = async ({ deck }) => {
    logger.info('Dealing card');
    return deck[0];
  };

  return {
    getDeck,
    shuffleDeck,
    dealCard,
  };
};

export default memCardRepo;

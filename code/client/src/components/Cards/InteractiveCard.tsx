import { type CardProps as CProps, Card, CardBody } from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import styles from './Card.module.css';

type CardProps = {
  children?: React.ReactNode;
} & CProps;

const InteractiveCard = ({ children = null, ...rest }: CardProps) => {
  return (
    <Card align={'center'} {...rest} __css={''} className={twMerge(styles.cardBody, rest.className)}>
      <CardBody height="100%" maxWidth={'100%'} alignContent={'center'}>
        {children}
      </CardBody>
    </Card>
  );
};

export default InteractiveCard;

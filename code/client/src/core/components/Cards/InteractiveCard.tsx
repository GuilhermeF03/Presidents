import { twMerge } from 'tailwind-merge';
import styles from './Card.module.css';
import { Card, CardBody, CardProps as CProps } from '@chakra-ui/react';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
} & CProps;

const InteractiveCard = ({ children = null, className = '', ...rest }: CardProps) => {
  return (
    <Card align={'center'} className={twMerge(styles.cardBody, className)} {...rest}>
      <CardBody alignContent={'center'}>{children}</CardBody>
    </Card>
  );
};

export default InteractiveCard;

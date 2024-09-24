import styles from './Card.module.css';

type CardProps = {
  backgroundTexture?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  sizeGrowth?: number; // Optional, for additional scaling
};

const Card = ({ backgroundTexture, children = null, onClick = () => {}, className = '' }: CardProps) => {
  return (
    <div
      className={`${styles.cardBody} ${className} group cursor-pointer`}
      onClick={onClick}
      style={{
        backgroundImage: backgroundTexture ? `url(${backgroundTexture})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Card;

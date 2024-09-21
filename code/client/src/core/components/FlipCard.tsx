import { useState } from 'react';
import './Card.css';

import back from '../../assets/cards/back.svg';
import ace_spades from '../../assets/cards/s_a.svg';
import king_clubs from '../../assets/cards/c_k.svg';
import queen_hearts from '../../assets/cards/h_q.svg';
import jack_diamonds from '../../assets/cards/d_j.svg';

const FlipCard = () => {
  const [activeCard, setActiveCard] = useState(false);
  const [faceImages] = useState([ace_spades, king_clubs, queen_hearts, jack_diamonds]);
  const [faceImage, setFaceImage] = useState(faceImages[0]); // Default face image

  const handleFlip = () => {
    setActiveCard(!activeCard);
    if (!activeCard) {
      // Change the face card image when showing the front side
      const randomIndex = Math.floor(Math.random() * faceImages.length);
      setFaceImage(faceImages[randomIndex]);
    }
  };

  return (
    <div className="h-full centered">
      <div onClick={handleFlip} className={`relative card ${activeCard ? 'cardFlip' : ''}`}>
        {/* front */}
        <div className="front">
          <img src={back} alt="image" className="w-60 h-96" />
        </div>

        {/* back */}
        <div className="absolute top-0 back">
          <img src={faceImage} alt="image" className="w-60 h-96" />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

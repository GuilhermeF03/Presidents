import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Cards/Card';

export default function Footer() {
  return (
    <div className="p-4 md:p-8 flex items-center justify-center h-auto md:h-[10%] w-full bg-blue-500 grow-0">
      <div className="text-base md:text-xl">
        <a href="" target="_blank" className="text-white hover:text-sky-100">
          Presidents
        </a>{' '}
        - A web card game
      </div>
      <Card
        className="w-8 h-8 text-base hover:scale-110 hover:text-lg border-[5px] absolute right-4 rounded-full
        md:w-16 md:h-16 md:text-xl hover:md:text-3xl
        "
      >
        <FontAwesomeIcon icon={faQuestion} />
      </Card>
    </div>
  );
}

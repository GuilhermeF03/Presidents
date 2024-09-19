import FlipCard from '../../core/components/FlipCard.tsx';

export function Landing() {
  return (
    <div className="flex flex-col p-6 items-center w-lvw h-lvh">
      {/*Header*/}
      <div className="flex flex-row w-full justify-center items-center">
        <h1 className="text-7xl font-bold">Presidents</h1>
        {/*Profile*/}
        <div className="absolute top-6 right-6 w-20 h-20 bg-red-500 rounded-full"></div>
      </div>

      {/*Main body*/}
      <div className="h-screen flex items-center justify-center w-1/3">
        <div className="h-64 w-56 hover:h-72 hover:w-64 transition-all duration-300">
          <FlipCard />
        </div>
      </div>

      {/*Bottom bar*/}
      <div></div>
    </div>
  );
}

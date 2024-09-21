import FlipCard from '../../core/components/FlipCard.tsx';

export function Landing() {
  return (
    <div className="flex flex-col p-6 items-center w-screen h-screen">
      {/*Header*/}
      <div className="flex flex-row w-full justify-center items-center">
        {/* Logo/Title */}
        <h1 className="text-7xl font-bold">Presidents</h1>
        {/* Profile */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-red-500 rounded-full"></div>
      </div>

      {/*Main body*/}
      <div className="h-full flex items-center justify-center w-1/3">
        <div className="h-[30%] hover:h-4transition-all duration-300">
          <FlipCard />
        </div>
      </div>

      {/*Bottom bar*/}
      <div></div>
    </div>
  );
}

import Card from '@/core/components/Cards/Card';
import Footer from '@/core/components/Footer';
import NavBar from '@/core/components/NavBar';

export function Landing() {
  return (
    <div className="min-h-screen max-h-screen w-screen flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Body */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-green-500 grow p-8 md:p-16 gap-8 md:gap-56">
        <Card>New Game</Card>
        <Card>Join Game</Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

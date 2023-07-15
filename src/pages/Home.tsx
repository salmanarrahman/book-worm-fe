import { Button } from '@/components/ui/button';
import book from '@/assets/images/book.png';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            Book <br /> Worm
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Effortless books at your fingertips
          </p>
          <div className="text-primary mt-20">
            <p>Book one for easy, secure communication</p>
            <p>Precise white paperback pages for clear visuals</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src={book} alt="" />
        </div>
      </div>
     
      <Footer />
    </>
  );
}

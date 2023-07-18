import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { IBook } from '@/types/globalTypes';
import Book from '@/assets/images/book.png';


interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {

  return (
    <div>
      <div className="rounded-2xl h-[450px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${book._id}`} className="w-full">
          <img src={Book} className="w-1/2" alt="product" />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
          <p>Author: {book?.author}</p>
          <p>Genre: {book?.genre}</p>
          <p>Published: {book?.published}</p>
        </Link>


      </div>
    </div>
  );
}

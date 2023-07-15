import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { IBook } from '@/types/globalTypes';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const handleAddProduct = (product: IBook) => {
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${book._id}`} className="w-full">
          {/* <img src={book?.image} alt="product" /> */}
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p>Rating: {book?.author}</p>
        <p className="text-sm">
          Availability: {book?.genre ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">Price: {book?.published}</p>
        <Button variant="default" onClick={() => handleAddProduct(book)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

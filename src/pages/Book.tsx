import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import Menu from '@radix-ui/react-dropdown-menu';
import MenuItem from '@radix-ui/react-dropdown-menu';
import { useGetBooksQuery } from '@/redux/api/apiSlice';
import { IBook } from '@/types/globalTypes';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { setSearch } from '@/redux/filter/filterSlice';

export default function Book() {
 // const [text, setText] = useState('');
  const {search} = useAppSelector(state=>state.search)
  const dispatch = useDispatch()


  const { data, isLoading, error } = useGetBooksQuery(undefined //, {
  //   refetchOnMountOrArgChange: true,
  //   pollingInterval: 1000
  // }
  )
  console.log(data);

  if (isLoading) {
    return <p>Loading</p>
  }
  if (error) {
    return <p>Error</p>
  }




  let productsData;

  if (search) {
    productsData = data?.data?.filter(
     (item: { genre: string; title: string;author:string }) => item.genre === search || item.title === search || item.author === search
    );
  }  else {
    productsData = data?.data;
  }

  console.log(productsData);

  const handleInputChange = (event) => {
    const newText:string = event.target.value;
   // setText(newText);
    dispatch(setSearch(newText))
  };


  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">

            <details className="dropdown mb-32">
              <summary className="m-1 text-white btn">Filter</summary>

        
            </details>

          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Search by title,author,genre</h1>
          <div className="max-w-xl">

            <input type="text" onChange={handleInputChange} placeholder="Type here" className="input input-bordered text-white w-full max-w-xs" />

          </div>
         
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {
          productsData?.map((book: IBook) => (
            <BookCard book={book} />
          ))
        }
      </div>
    </div>
  );
}

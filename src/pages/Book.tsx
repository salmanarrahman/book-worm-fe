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

export default function Book() {
  const [text, setText] = useState('');

  // const [data, setData] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   fetch('./data.json')
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  const { data, isLoading, error } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000
  })
  console.log(data);

  if (isLoading) {
    return <p>Loading</p>
  }
  if (error) {
    return <p>Error</p>
  }

  // const { toast } = useToast();

  //! Dummy Data

  const status = true;
  const priceRange = 100;

  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };

  let productsData;

  // if (status) {
  //   productsData = data?.data?.filter(
  //   //  (item: { status: boolean; price: number; }) => item.status === true && item.price < priceRange
  //   );
  // } else if (priceRange > 0) {
  //   productsData = data?.data?.filter((item: { price: number; }) => item.price < priceRange);
  // } else {
  //   productsData = data?.data;
  // }

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    console.log(newText);
  };


  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">

            <details className="dropdown mb-32">
              <summary className="m-1 text-white btn">Filter</summary>

              {/* <div className="w-48">
                <div className="dropdown text-white dropdown-end">
                  <div tabIndex={0} className="dropdown-toggle">
                    {selectedItem || 'Select an item'}
                  </div>
                  <ul className="shadow menu text-white dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <a onClick={() => setSelectedItem('Item 1')}>Item 1</a>
                    </li>
                    <li>
                      <a onClick={() => setSelectedItem('Item 2')}>Item 2</a>
                    </li>
                    <li>
                      <a onClick={() => setSelectedItem('Item 3')}>Item 3</a>
                    </li>
                  </ul>
                </div>
              </div> */}

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
          data?.data?.map((book: IBook) => (
            <BookCard book={book} />
          ))
        }
      </div>
    </div>
  );
}

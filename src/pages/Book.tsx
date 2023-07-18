import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/api/apiSlice';
import { IBook } from '@/types/globalTypes';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { setSearch } from '@/redux/filter/filterSlice';

export default function Book() {
  const { search } = useAppSelector(state => state.search)
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
      (item: { genre: string; title: string; author: string, published: string }) => item.genre === search || item.title === search || item.author === search || item.published ===search
    );
  } else {
    productsData = data?.data;
  }

  console.log(productsData);

  const handleInputChange = (event) => {
    const newText: string = event.target.value;
    dispatch(setSearch(newText))
  };


  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Khoj the search</h1>
          <div className=" items-center  mt-3">

            <details className="dropdown mb-32">
              <summary className="m-1 text-white btn">Filter by genre</summary>
              <ul className="p-2 shadow menu text-white dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li onClick={()=>dispatch(setSearch("romance"))}><a>Romance</a></li>
                <li onClick={()=>dispatch(setSearch("action"))}><a>Action</a></li>
                <li onClick={()=>dispatch(setSearch("drama"))}><a>Drama</a></li>
                <li onClick={()=>dispatch(setSearch("adventure"))}><a>Adventure</a></li>
                <li onClick={()=>dispatch(setSearch(""))}><a>Other</a></li>
              </ul>
            </details> <br />
            <details className="dropdown mb-32">
              <summary className="m-1 text-white btn">Filter by publication year</summary>
              <ul className="p-2 shadow menu text-white dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li onClick={()=>dispatch(setSearch("2023"))}><a>2023</a></li>
                <li onClick={()=>dispatch(setSearch("2022"))}><a>2022</a></li>
                <li onClick={()=>dispatch(setSearch("2021"))}><a>2021</a></li>
                <li onClick={()=>dispatch(setSearch("2020"))}><a>2020</a></li>
                <li onClick={()=>dispatch(setSearch("2019"))}><a>2019</a></li>
                <li onClick={()=>dispatch(setSearch(""))}><a>Other</a></li>
              </ul>
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

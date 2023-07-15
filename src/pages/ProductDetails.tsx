import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetCommentsQuery, useSingleBookQuery } from '@/redux/api/apiSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import book from '../assets/images/book.png'

export default function ProductDetails() {
  const { id } = useParams();


  const {data,isLoading,error} = useSingleBookQuery(id)


  // const product = data?.find((item) => item._id === Number(id));

  //! Temporary code ends here

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
           <img src={book} alt="" /> 
          <p>{data?.title}</p>
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.author}</h1>
          <p className="text-xl">Rating: {data?.genre}</p>
          <ul className="space-y-1 text-lg">
            {data?.comments?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id ={id}/>
    </>
  );
}

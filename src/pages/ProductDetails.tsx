import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useDeleteBookMutation,  useSingleBookQuery } from '@/redux/api/apiSlice';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import book from '../assets/images/book.png'
import { Edit } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';

export default function ProductDetails() {
  const { id } = useParams();
  const {user}=useAppSelector((state)=>state.user)

  const {data,error} = useSingleBookQuery(id)
  console.log(data);
  const [deleteBook,{isLoading}] = useDeleteBookMutation()
  const navigate = useNavigate()

  if(!data){
    return 'Error'
  }

  const handleDeleteBook = () => {
    deleteBook(id)
    navigate('/')
    alert("Deleted. Refresh to see changes")

  }

  return (
    <>
      <div className="flex max-w-7xl h-[calc(100vh-80px)] mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
           <img src={book} alt="" /> 
        
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.title}</h1>
          <p className="text-xl">Author: {data?.author}</p>
          <p className="text-xl">Genre: {data?.genre}</p>
          <p className="text-xl mt-5">Published: {data?.published}</p>
            
            
           {
            user.email ? 
            <>
            
          <Link to={`/edit/${id}`} className="w-full">
      
          <Button className="text-xl font-semibold">Edit</Button> <br />
         

        </Link>
        <Button onClick={handleDeleteBook}>Delete</Button>  
        </> :
            
            <></>
           }       
        </div>
        
       
      </div>
     
      <ProductReview id ={id}/>

     
    </>
  );
}

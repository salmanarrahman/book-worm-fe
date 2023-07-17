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
  





  const handleDeleteBook = () => {
    deleteBook(id)
    navigate('/')
    alert("Deleted")

  }

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

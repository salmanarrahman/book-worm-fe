/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createUser } from '@/redux/user/userSlice';
import { useAddBookMutation, usePostCommentMutation } from '@/redux/api/apiSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import auth from '@/lib/Firebase';


interface AddBookInterface {
    emails: string;
    title:string;
    author:string;
    genre:string;
    published:string;

  }
  

  export default function Add() {

    const navigate = useNavigate();


  

  
    const { user,isLoading } = useAppSelector(state => state.user)
    const [addBook,{isError}] = useAddBookMutation()
  
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<AddBookInterface>();
   

  
/*
    useEffect(() => {
        if (user.email) {
          navigate('/');
        }
      }, [user.email]);
      */


 
    const onSubmit = (datas: AddBookInterface) => {
        console.log(datas);
      
        const title= datas.title.toLowerCase()
        const author= datas.author.toLowerCase()
        const genre= datas.genre.toLowerCase()

        const details = {
            data : {
                emails: user.email,
                title: title,
                author: author,
                genre: genre,
                published: datas.published
            }
        }
        console.log(details);
        addBook(details)
        toast.success('Book Added Successfully! /n refresh to see the changes.', {
            duration: 2000, // Display duration in milliseconds (default: 5000)
            position: 'top-center', // Toast position (default: 'top-right')
          });
        if(isError){
            toast.error('Internal Server Error', {
                duration: 2000, // Display duration in milliseconds (default: 5000)
                position: 'top-center', // Toast position (default: 'top-right')
              });
        }

        reset()

    };

   
    return (
        <div className='mx-auto container h-[calc(100vh-80px)]'>
            <div className=' flex justify-center items-center '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid mt-10 gap-2">
                        <div className="grid gap-1 h-full">
                          
                            <Input
                                id="title"
                                placeholder="title"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...register('title', { required: 'Email is required' })}

                            />
                            <Input
                                id="author"
                                placeholder="Author"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...register('author', { required: 'Email is required' })}

                            />
                            <Input
                                id="genre"
                                placeholder="Genre"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...register('genre', { required: 'Email is required' })}

                            />
                            <Input
                                id="published"
                                placeholder="PublicationDate"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...register('published', { required: 'Email is required' })}

                            />
                        </div>
                        <Button>Add Book</Button>
                    </div>
                </form>
               
               
            </div>
        </div>
    );
}


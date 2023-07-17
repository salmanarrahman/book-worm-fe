/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from 'react-hook-form'; import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createUser } from '@/redux/user/userSlice';
import { useAddBookMutation, usePostCommentMutation, useSingleBookQuery, useUpdateBookMutation } from '@/redux/api/apiSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


import { useWatch, Control } from "react-hook-form"




interface AddBookInterface {
    emails?: string;
    title?: string;
    author?: string;
    genre?: string;
    published?: string;

}


export default function EditBook() {





    const { id } = useParams()

    const { data } = useSingleBookQuery(id)
    const [updateBook, { isLoading, isError, isSuccess }] = useUpdateBookMutation()


    const { user } = useAppSelector(state => state.user)

    const { title, author, genre, published } = data



    const formik = useFormik({
        initialValues: {
            title: title,
            author: author,
            genre: genre,
            published: published,
        },
        onSubmit: async values => {





            const options = {
                id: id,
                data: {
                    title: values.title,
                    author: values.author,
                    genre: values.genre,
                    published: values.published
                }
            };
            console.log(options);
            await updateBook(options)



            // if(error){
            //     toast.error('Internal Server Error', {
            //         duration: 2000, // Display duration in milliseconds (default: 5000)
            //         position: 'top-center', // Toast position (default: 'top-right')
            //       });
            // }else {
            //     toast.success('Book Updated Successfully', {
            //         duration: 2000, // Display duration in milliseconds (default: 5000)
            //         position: 'top-center', // Toast position (default: 'top-right')
            //       });
            // }



        },
    });





    /*
     
        const onSubmit = (datas: AddBookInterface) => {
            console.log(datas);
            const details = {
                data : {
                  
                    title: datas?.title,
                    author: datas?.author,
                    genre: datas?.genre,
                    published: datas?.published
                }
            }
            console.log(details);
            updateBook(details)
            toast.success('Book Updated Successfully', {
                duration: 2000, // Display duration in milliseconds (default: 5000)
                position: 'top-center', // Toast position (default: 'top-right')
              });
            if(isError){
                toast.error('Internal Server Error', {
                    duration: 2000, // Display duration in milliseconds (default: 5000)
                    position: 'top-center', // Toast position (default: 'top-right')
                  });
            }
    
    
        };
    
        */

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        const options = {
            id: id,
            data: {
                title: data.title,
                author: data.author,
                genre: data.genre,
                published: data.published
            }
        };
        console.log(options);
        updateBook(options).unwrap()
            .then((response) => {


                toast.success('Book Updated Successfully. Refesh to get update', {
                    duration: 5000, // Display duration in milliseconds (default: 5000)
                    position: 'top-center', // Toast position (default: 'top-right')
                });


            })
            .catch((error) => {
                toast.error('Internal Server Error', {
                    duration: 5000, // Display duration in milliseconds (default: 5000)
                    position: 'top-center', // Toast position (default: 'top-right')
                });
            });
    };


    return (
        // <div className='mx-auto container '>
        //     <div className=' flex justify-center items-center '>
        //         <form onSubmit={formik.handleSubmit}>
        //             <div className="grid mt-10 gap-2">
        //                 <div className="grid gap-1">

        //                     <Input
        //                         id="title"
        //                         name="title"
        //                         type="text"
        //                         onChange={formik.handleChange}
        //                         value={formik.values.title}

        //                     />
        //                     <Input
        //                         id="author"
        //                         name="author"
        //                         type="text"
        //                         autoCapitalize="none"
        //                         autoCorrect="off"
        //                         onChange={formik.handleChange}
        //                         value={formik.values.author}


        //                     />
        //                     <Input
        //                         id="genre"
        //                         name="genre"                               
        //                         type="text"
        //                         onChange={formik.handleChange}
        //                         value={formik.values.genre}


        //                     />
        //                     <Input
        //                         id="published"
        //                         name="pubished"                              
        //                         type="text"
        //                         onChange={formik.handleChange}
        //                         value={formik.values.published}



        //                     />
        //                 </div>
        //                 <Button type='submit'>Update Book</Button>
        //             </div>
        //         </form>


        //     </div>
        // </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <Input
                    type="text"
                    id="title"
                    {...register('title', { required: true })}
                    defaultValue={title}// Set a default value here
                />
            </div>
            <div>
                <label htmlFor="author">Author</label>
                <Input
                    type="text"
                    id="author"
                    {...register('author', { required: true })}
                    defaultValue={author} // Set a default value here
                />
            </div>
            <div>
                <label htmlFor="genre">Genre</label>
                <Input
                    type="text"
                    id="genre"
                    {...register('genre', { required: true })}
                    defaultValue={genre} // Set a default value here
                />
            </div>
            <div>
                <label htmlFor="published">Publish</label>
                <Input
                    type="text"
                    id="published"
                    {...register('published', { required: true })}
                    defaultValue={published} // Set a default value here
                />
            </div>
            <Button type="submit">Submit</Button>
        </form>

    );
}


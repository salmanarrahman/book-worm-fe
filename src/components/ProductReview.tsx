/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCommentsQuery, usePostCommentMutation } from '@/redux/api/apiSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

interface IProps {
  id: string;
}


export default function ProductReview({id}:IProps) {
  const [inputValue, setInputValue] = useState<string>('');

 const {user} = useAppSelector((state)=>state.user)
  const {data} = useGetCommentsQuery(id,{
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000
  })

  const [postComment,{isLoading,isError,isSuccess}] = usePostCommentMutation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const options = {
    id:id,
    data: {comment:inputValue}
    };

    postComment(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
        onChange={handleChange}
        value={inputValue}
        className="min-h-[30px]" required/>
        {
          user?.email ? 
          <Button className="rounded-full h-10 w-10 p-2 text-[25px]">
          <FiSend />
        </Button>
        :
        <></>
        }
      </form>
      <div className="mt-10">
        {data?.comments?.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

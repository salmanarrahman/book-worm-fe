import { useGetCommentsQuery } from '@/redux/api/apiSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';

interface IProps {
  id: string;
}


export default function ProductReview({id}:IProps) {

  const {data,isLoading,error} = useGetCommentsQuery(id)

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea className="min-h-[30px]" />
        <Button className="rounded-full h-10 w-10 p-2 text-[25px]">
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {data?.comments?.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

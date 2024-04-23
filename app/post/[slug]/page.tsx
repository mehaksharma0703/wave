'use client'

import Post from "@/app/components/Post"
import { useQuery } from "@tanstack/react-query"
import AddComment from "@/app/components/AddComment"
import axios from "axios"
import Image from "next/image"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['detail-post'],  // Include slug in the queryKey for unique identification
        queryFn: () => fetchDetails(url.params.slug)
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading post: {error.message}</p>;
    if (!data) return <p>No data found.</p>;

    // Check for user data before trying to access it
    if (!data.user) return <p>No user data available.</p>;

    console.log(data);
    return (
        <div>
            <Post
                id={data?.id}
                name={data.user.name}
                avatar={data.user.image}
                postTitle={data.title}
                comments={data.Comment}
            />
            <AddComment id={data?.id} />
            {data?.Comment?.map((comment: any) => (
                <div key={comment.id} className="my-6 bg-white p-8 rounded-md " >
                    <div className="flex items-center gap-2" >
                        <Image
                            className='rounded-full'
                            width={32}
                            height={32}
                            src={comment.user?.image}
                            alt="avatar"
                        />
                        <h3 className="font-bold">{comment?.user?.name}</h3>
                        <h2 className="text-sm" >{comment.createdAt}</h2>

                    </div>
                    <div className="py-4">{comment.message}</div>
                </div>
            ))}
        </div>
    )
}
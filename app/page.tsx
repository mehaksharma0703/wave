'use client'
import axios from "axios"
import Addpost from '../app/components/AddPost'
import { useQuery } from '@tanstack/react-query'
import Post from '../app/components/Post'

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts'],

  })
  if (error) return error
  if (isLoading) return "Loading..."
  // console.log(data)
  return (
    <main>
      <Addpost />
      {data?.map((post: any) => (
        <Post key={post.id}
          name={post.user?.name}
          avatar={post.user?.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}

'use client'

import { useState } from 'react'
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from "axios" //axios is used to make HTTP requests to fetch data
import { error } from 'console'
import toast from 'react-hot-toast'

export default function createPost() {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let toastPostID: string

    //Unlike queries, mutations are typically used to create/update/delete data 
    //or perform server side-effects. For this purpose, React Query exports a useMutation hook.

    const addTitle = async (title: string) => await axios.post("/api/posts/addPost", { title })

    const { mutate } = useMutation({
        mutationFn: addTitle, // mutationFn :A function that performs an asynchronous task and returns a promise.
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)

            }

        },

        onSuccess: (data) => {
            toast.success("Post has been made 🔥", { id: toastPostID });
            queryClient.invalidateQueries({ queryKey: ["posts"] }) //React Query will trigger a refetch to ensure the components have the most recent data.
            setTitle('')
            setIsDisabled(false)
        },
    }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate(title)

    }

    return (
        <form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
            <div className='flex flex-col my-4'>
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="What's on your mind"
                    className='p-4 text-lg rounded-md my-2 bg-gray-200'
                >
                </textarea>
            </div>
            <div className='flex items-center justify-between gap-2 '>
                <p
                    className={`font-bold text-sm 
                    ${title.length > 300 ? "text-red-700" : "text-gray-600"}`}>
                    {`${title.length}/300`}
                </p>
                <button
                    disabled={isDisabled}
                    className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
                    type='submit'
                >
                    Create a post
                </button>
            </div>
        </form>
    )
}
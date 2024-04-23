export type PostType = {
    title: string
    id: string
    updatedAt?: string
    user: {
        name: string
        image: string
        email: string
        id: string
    }
    Comment: {
        createdAt?: string
        id: string
        postId: string
        userId: string
        title: string
        user: {
            name: string
            image: string
            email: string
            id: string
        }
    }[]
}
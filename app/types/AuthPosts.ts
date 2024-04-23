export type AuthPosts = {
    email: string
    id: string
    name: string
    image: string
    Post: {
        createdAt: string
        id: string
        title: string
        Comment?: {
            id: string
            postId: string
            createdAt: string
            title: string
            userId: string
        }
    }
}
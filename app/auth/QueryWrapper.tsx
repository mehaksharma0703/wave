'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

interface Props {
    children?: ReactNode
}

//the client prop in the <QueryClientProvider> 
// component from the React Query library is a 
// predefined property. It is not something you 
// can arbitrarily name—it is specifically designed 
// to receive an instance of a QueryClient. 
// This setup is essential for the React Query 
// framework to function, as it dictates how the React 
// Query system manages the caching, synchronization, 
// and updating of your application's data fetching operations.

const QueryWrapper = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}  >
        {children}
    </QueryClientProvider>
)

export default QueryWrapper
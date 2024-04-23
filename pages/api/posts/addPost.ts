import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "POST") {
        // Create a subset of authOptions if necessary
        // const sessionOptions = {
        //     secret: authOptions.secret, // Assuming secret is required
        //     // Include other properties if they are needed for session validation
        // };

        const session = await getServerSession(req as any, res as any, authOptions as any);
        if (!session) {
            return res.status(401).json({ message: "Please log in" });
        }
        else {
            const title: string = req.body.title;
            console.log(title)
            //get user
            const prismaUser = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email,
                },
            })

            //check title
            if (title.length > 300) {
                return res.status(403).json({ message: "Title is too long" });
            }
            if (!title.length) {
                return res.status(403).json({ message: "Please do not leave this empty" })
            }
            //create post
            try {
                const result = await prisma.post.create({
                    data: {
                        title,
                        userId: prismaUser.id,
                    },
                })
                res.status(200).json(result)
            } catch (err) {
                res.status(403).json({ err: "Error has occured whilst making a post" })
            }

        }


    }

}


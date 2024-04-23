import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        // Force types to comply as a temporary fix
        const session = await getServerSession(req as any, res as any, authOptions as any);
        if (!session) {
            return res.status(401).json({ message: "Please Sign in" });
        }
        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
        })
        //Add a comment
        try {
            const { title, postId } = req.body.data;
            if (!title.length) {
                return res.status(401).json({ message: "Please enter something" });

            }

            const result = await prisma.comment.create({
                data: {
                    message: title,
                    userId: prismaUser?.id,
                    postId,
                },
            })

            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({ err: "Error has occurred whilst making a post" });
        }
    }
}

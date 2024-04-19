import { PrismaClient } from '@prisma/client'

declare global {
    namespace NodeJs {
        interface Global { }

    }
}
type NodeJSGlobal = typeof global;

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
    prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma



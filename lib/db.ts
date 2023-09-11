import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

/** Simple trick to avoid new Prisma Client each time we hot reload */

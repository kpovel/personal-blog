import { publicProcedure, router } from "@/server/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  userById: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const { userId } = input;
      return prisma.user.findUnique({
        where: { id: userId },
      });
    }),
  allBlogPosts: publicProcedure.query(async () => {
    return prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });
  }),
});

export type AppRouter = typeof appRouter;

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
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const { postId } = input;

      const post = await prisma.blogPost.findUnique({
        where: { id: parseInt(postId) },
        include: { author: true },
      });

      if (!post) throw new Error("Post not found");
      return post;
    }),
  allPostIds: publicProcedure.query(async () => {
    const ids = await prisma.blogPost.findMany({
      select: { id: true },
    });
    return ids.map(({ id }) => id);
  }),
});

export type AppRouter = typeof appRouter;

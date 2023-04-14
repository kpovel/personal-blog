import Layout from "@/components/layout/layout";
import { GetServerSideProps } from "next";
import type { BlogPost as PostType } from "@prisma/client";
import { appRouter } from "@/server/routers/_app";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  return (
    <Layout>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </Layout>
  );
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  try {
    const caller = appRouter.createCaller({});
    const post = await caller.getPostById({ postId: params?.post as string });

    const postWithSerializableDate = {
      ...post,
      createdAt: post.createdAt.toISOString(),
    };

    return {
      props: {
        post: postWithSerializableDate,
        revalidate: 20,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths = async () => {
  const caller = appRouter.createCaller({});
  const posts = await caller.allPostIds();

  const paths = posts.map((post) => ({
    params: { post: post.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

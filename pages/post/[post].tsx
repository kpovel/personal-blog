import Layout from "@/components/layout/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { appRouter } from "@/server/routers/_app";
import Head from "next/head";
import { SerializedBlogPost } from "@/pages";
import { format, formatISO } from "date-fns";
import { useMemo } from "react";

export default function Post({ post }: { post: SerializedBlogPost }) {
  const paragraphs = post.content.split("  ");

  const formattedCreationDate = useMemo(() => {
    return format(new Date(post.createdAt), "q MMMM yyyy, HH:mm");
  }, [post.createdAt]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-semibold">{post.title}</h1>
          <p className="mb-2 text-sm text-gray-600">By: {post.author.name}</p>
          <p className="mb-6 text-sm text-gray-600">
            Created at: {formattedCreationDate}
          </p>
          <hr className="mb-6 border-gray-300" />
          <div className="mb-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const caller = appRouter.createCaller({});
    const post = await caller.getPostById({ postId: params?.post as string });

    const postWithSerializableDate = {
      ...post,
      createdAt: formatISO(post.createdAt),
    };

    return {
      props: {
        post: postWithSerializableDate,
      },
      revalidate: 20,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
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

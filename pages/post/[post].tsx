import Layout from "@/components/layout/layout";
import { GetServerSideProps } from "next";
import { appRouter } from "@/server/routers/_app";
import Head from "next/head";
import { SerializedBlogPost } from "@/pages";
import { format } from "date-fns";

export default function Post({ post }: { post: SerializedBlogPost }) {
  const paragraphs = post.content.split("  ");

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
          <p className="mb-6 text-xs text-gray-500">
            {format(new Date(post.createdAt), "q MMMM yyyy, HH:mm")}
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

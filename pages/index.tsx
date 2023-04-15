import Head from "next/head";
import Layout from "../components/layout/layout";
import Link from "next/link";
import { appRouter } from "@/server/routers/_app";
import { BlogPost, User as Author } from "@prisma/client";
import { format, formatISO } from "date-fns";

export type SerializedBlogPost = BlogPost & {
  author: Author;
};

export default function Home({
  blogPosts,
}: {
  blogPosts: SerializedBlogPost[];
}) {
  return (
    <>
      <Head>
        <title>Personal blog - Recent Posts</title>
        <meta name="description" content="Personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {!blogPosts ? (
          <p className="text-lg italic">Loading...</p>
        ) : (
          <ul className="space-y-6">
            {blogPosts.map((post) => (
              <li
                key={post.id}
                className="border-b bg-center pb-4 last:border-0"
              >
                <Link
                  href={`/post/${post.id}`}
                  className="text-xl font-semibold underline decoration-sky-500/30 hover:text-sky-800 active:text-sky-600"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">By: {post.author.name}</p>
                <p className="text-sm text-gray-500">
                  Created at:{" "}
                  {format(new Date(post.createdAt), "q MMMM yyyy, HH:mm")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const caller = appRouter.createCaller({});
  const blogPosts = await caller.allBlogPosts();

  const serializedBlogPosts = blogPosts.map((post) => {
    return {
      ...post,
      createdAt: formatISO(post.createdAt),
    };
  });

  return {
    props: {
      blogPosts: serializedBlogPosts,
    },
    revalidate: 20,
  };
};

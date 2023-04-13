import Head from "next/head";
import Layout from "../components/layout/layout";
import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function Home() {
  const blogPosts = trpc.allBlogPosts.useQuery();

  return (
    <>
      <Head>
        <title>Personal blog - Recent Posts</title>
        <meta name="description" content="Personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {!blogPosts.data ? (
          <p className="text-lg italic">Loading...</p>
        ) : (
          <ul className="space-y-6">
            {blogPosts.data.map((post) => (
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
                  Created at: {new Date(post.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Layout>
    </>
  );
}

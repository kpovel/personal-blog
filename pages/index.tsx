import Head from "next/head";
import Layout from "../components/layout/layout";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const blogPosts = trpc.allBlogPosts.useQuery();

  return (
    <>
      <Head>
        <title>Personal blog</title>
        <meta name="description" content="Personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h2 className="mb-4 text-2xl font-bold">Recent Posts</h2>
        {!blogPosts.data ? (
          <p className="text-lg italic">Loading...</p>
        ) : (
          <ul className="space-y-6">
            {blogPosts.data.map((post) => (
              <li key={post.id} className="border-b pb-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
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

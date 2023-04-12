import Head from "next/head";
import Layout from "../components/layout/layout";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const user = trpc.userById.useQuery("1");

  if (!user.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Personal blog</title>
        <meta name="description" content="Personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Personal blog</h1>
        <p>Hi, my name is {user.data.name ?? "Error, no such user!"}</p>
      </Layout>
    </>
  );
}

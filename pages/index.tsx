import Head from 'next/head'
import Layout from '../components/layout/layout'

export default function Home() {
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
       </Layout>
    </>
  )
}

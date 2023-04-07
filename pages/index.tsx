import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Personal blog</title>
        <meta name="description" content="Personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline color-blue-800 text-purple-700">
          Hello world!
        </h1>
      </main>
    </>
  )
}

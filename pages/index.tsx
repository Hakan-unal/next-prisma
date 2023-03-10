import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import axios from "axios";
import useSWR from "swr";


type Props = {
  feed: PostProps[]
}



const Blog: React.FC<Props> = (props) => {

  console.log(props)
  const address = `https://next-prisma-lemon.vercel.app/api/user`;
  const fetcher = async (url) => await axios.post(url, { name: 'Bob' + Math.random() }).then((res) => res.data);
  // const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>

        </main>
      </div>
    </Layout>
  )
}

export default Blog



export const getStaticProps: GetStaticProps = async () => {
  const address = 'https://next-prisma-lemon.vercel.app/api/user';

  // const res = await axios.get(address).then((res) => res.data)

  // console.log(res)


  return {
    props: { feed: [] },
    revalidate: 10
  }
}

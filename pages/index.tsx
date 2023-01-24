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

  // const address = `api/user`;
  // const fetcher = async (url) => await axios.post(url, { name: 'Bob', email: 'd12ddbasdob@prisma.io' }).then((res) => res.data);
  // const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  // const { data, error } = useSWR(address, fetcher);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog



export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/user')
  const feed = await res.json()
  console.log(feed)


  return {
    props: { feed: feed.data },
    revalidate: 10
  }
}

/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { BlitzPage, invokeWithMiddleware, GetServerSideProps } from 'blitz'
import getBlog from 'app/blogs/queries/getBlog'
import LinkText from 'app/components/LinkText'
import Layout from 'app/layouts/Layout'
import Title from 'app/blogs/components/Title'

type Props = {
  blog: {
    title: string
    body: string
  }
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { blogId: string }
> = async ({ params, req, res }) => {
  const blog = await invokeWithMiddleware(
    getBlog,
    { where: { id: Number(params?.blogId) } },
    { req, res }
  )
  return {
    props: {
      blog: {
        title: blog.title,
        body: blog.body,
      },
    },
  }
}

const ShowBlogPage: BlitzPage<Props> = ({ blog }) => (
  <div>
    <Title>{blog.title}</Title>
    <p
      css={css`
        margin-top: 30px;
        font-size: 18px;
        line-height: 2;
      `}
    >
      {blog.body}
    </p>
    <div
      css={css`
        margin-top: 50px;
      `}
    >
      <LinkText href="/blogs">&lt; Blogs</LinkText>
    </div>
  </div>
)

ShowBlogPage.getLayout = (page) => <Layout title={'Blog'}>{page}</Layout>

export default ShowBlogPage

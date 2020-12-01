/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { Suspense } from 'react'
import {
  Link,
  useRouter,
  useParam,
  BlitzPage,
  useMutation,
  invokeWithMiddleware,
  GetServerSideProps,
} from 'blitz'
import getBlog from 'app/blogs/queries/getBlog'
import deleteBlog from 'app/blogs/mutations/deleteBlog'
import SlimLayout from 'app/layouts/SlimLayout'
import LinkText from '../../components/LinkText'
import Title from '../../components/Title'

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

const ShowBlogPage: BlitzPage<Props> = ({ blog }) => {
  const router = useRouter()
  const blogId = useParam('blogId', 'number')
  const [deleteBlogMutation] = useMutation(deleteBlog)

  return (
    <div>
      <Title>{blog.title}</Title>
      <p
        css={css`
          margin-top: 30px;
          font-size: 20px;
          line-height: 1.5;
        `}
      >
        {blog.body}
      </p>
      <div
        css={css`
          margin-top: 50px;
          display: flex;
          justify-content: space-between;
          width: 300px;
        `}
      >
        <Link href={`/blogs/${blogId}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deleteBlogMutation({ where: { id: blogId } })
              router.push('/blogs')
            }
          }}
        >
          Delete
        </button>
      </div>
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <LinkText href="/blogs">&lt; Blogs</LinkText>
      </div>
    </div>
  )
}

ShowBlogPage.getLayout = (page) => (
  <SlimLayout title={'Blog'}>{page}</SlimLayout>
)

export default ShowBlogPage

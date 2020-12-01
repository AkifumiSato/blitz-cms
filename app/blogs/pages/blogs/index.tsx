/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { Suspense } from 'react'
import SlimLayout from 'app/layouts/SlimLayout'
import { usePaginatedQuery, useRouter, BlitzPage } from 'blitz'
import getBlogs from 'app/blogs/queries/getBlogs'
import ButtonLink from '../../../components/ButtonLink'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import BlogItem from '../../components/BlogItem'
import Title from 'app/blogs/components/Title'
import OutLineButton from 'app/blogs/components/OutLineButton'

const ITEMS_PER_PAGE = 10

export const BlogsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ blogs, hasMore }] = usePaginatedQuery(getBlogs, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <ul
        css={css`
          font-size: 20px;
          width: 100%;
        `}
      >
        {blogs.map((blog) => (
          <li
            key={blog.id}
            css={css`
              &:not(:first-of-type) {
                margin-top: 10px;
              }
            `}
          >
            <BlogItem href={`/blogs/${blog.id}`}>{blog.title}</BlogItem>
          </li>
        ))}
      </ul>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            width: 300px;
          `}
        >
          <OutLineButton disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </OutLineButton>
          <OutLineButton disabled={!hasMore} onClick={goToNextPage}>
            Next
          </OutLineButton>
        </div>
      </div>
    </>
  )
}

const LoginUserOnly: React.FC = ({ children }) => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <>{children}</>
  }
  return <></>
}

const BlogsPage: BlitzPage = () => {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Title>Blog</Title>
        <Suspense fallback={<div>-</div>}>
          <LoginUserOnly>
            <div
              css={css`
                width: 200px;
              `}
            >
              <ButtonLink href="/blogs/new">NEW POST</ButtonLink>
            </div>
          </LoginUserOnly>
        </Suspense>
      </div>

      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <BlogsList />
        </Suspense>
      </div>
    </>
  )
}

BlogsPage.getLayout = (page) => <SlimLayout title={'Blogs'}>{page}</SlimLayout>

export default BlogsPage

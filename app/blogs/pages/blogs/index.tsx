/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Suspense } from 'react'
import SlimLayout from 'app/layouts/SlimLayout'
import { usePaginatedQuery, useRouter, BlitzPage, Link } from 'blitz'
import getBlogs from 'app/blogs/queries/getBlogs'
import ButtonLink from '../../../components/ButtonLink'
import { colors } from '../../../stylesheets/colors'
import BlogItem from '../../components/BlogItem'

const ITEMS_PER_PAGE = 100

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
    <div>
      <ul
        css={css`
          font-size: 20px;
          width: 100%;

          & > li:not(:first-child) {
            margin-top: 10px;
          }
        `}
      >
        {blogs.map((blog) => (
          <li key={blog.id}>
            <BlogItem href={`/blogs/${blog.id}`}>{blog.title}</BlogItem>
          </li>
        ))}
      </ul>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
          width: 100%;
        `}
      >
        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  )
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
        <h1
          css={css`
            font-size: 50px;
            font-weight: bold;
            color: ${colors.teal['900']};
          `}
        >
          Blog dashboard
        </h1>
        <div
          css={css`
            width: 200px;
          `}
        >
          <ButtonLink href="/blogs/new">NEW POST</ButtonLink>
        </div>
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

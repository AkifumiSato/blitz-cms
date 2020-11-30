/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Suspense } from 'react'
import Layout from 'app/layouts/Layout'
import { usePaginatedQuery, useRouter, BlitzPage, Link } from 'blitz'
import getBlogs from 'app/blogs/queries/getBlogs'
import ButtonLink from '../../../components/ButtonLink'
import { colors } from '../../../stylesheets/colors'

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
          margin-top: 30px;

          & > li:not(:first-child) {
            margin-top: 10px;
          }
        `}
      >
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          width: 300px;
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
    <div
      css={css`
        margin: 50px auto 0;
        max-width: 1200px;
      `}
    >
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

      <Suspense fallback={<div>Loading...</div>}>
        <BlogsList />
      </Suspense>
    </div>
  )
}

BlogsPage.getLayout = (page) => <Layout title={'Blogs'}>{page}</Layout>

export default BlogsPage

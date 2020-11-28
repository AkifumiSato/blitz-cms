import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getBlogs from "app/blogs/queries/getBlogs"

const ITEMS_PER_PAGE = 100

export const BlogsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ blogs, hasMore }] = usePaginatedQuery(getBlogs, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const BlogsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/blogs/new">
          <a>Create Blog</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <BlogsList />
      </Suspense>
    </div>
  )
}

BlogsPage.getLayout = (page) => <Layout title={"Blogs"}>{page}</Layout>

export default BlogsPage

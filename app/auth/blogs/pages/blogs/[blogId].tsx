import { Suspense } from 'react'
import Layout from 'app/layouts/Layout'
import {
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
} from 'blitz'
import getBlog from 'app/auth/blogs/queries/getBlog'
import deleteBlog from 'app/auth/blogs/mutations/deleteBlog'

export const Blog = () => {
  const router = useRouter()
  const blogId = useParam('blogId', 'number')
  const [blog] = useQuery(getBlog, { where: { id: blogId } })
  const [deleteBlogMutation] = useMutation(deleteBlog)

  return (
    <div>
      <h1>Blog {blog.id}</h1>
      <pre>{JSON.stringify(blog, null, 2)}</pre>

      <Link href={`/blogs/${blog.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm('This will be deleted')) {
            await deleteBlogMutation({ where: { id: blog.id } })
            router.push('/blogs')
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowBlogPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Blog />
      </Suspense>
    </div>
  )
}

ShowBlogPage.getLayout = (page) => <Layout title={'Blog'}>{page}</Layout>

export default ShowBlogPage

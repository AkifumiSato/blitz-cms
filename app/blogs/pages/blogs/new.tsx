import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createBlog from "app/blogs/mutations/createBlog"
import BlogForm from "app/blogs/components/BlogForm"

const NewBlogPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlogMutation] = useMutation(createBlog)

  return (
    <div>
      <h1>Create New Blog</h1>

      <BlogForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const blog = await createBlogMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(blog))
            router.push(`/blogs/${blog.id}`)
          } catch (error) {
            alert("Error creating blog " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
      </p>
    </div>
  )
}

NewBlogPage.getLayout = (page) => <Layout title={"Create New Blog"}>{page}</Layout>

export default NewBlogPage

import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getBlog from "app/blogs/queries/getBlog"
import updateBlog from "app/blogs/mutations/updateBlog"
import BlogForm from "app/blogs/components/BlogForm"

export const EditBlog = () => {
  const router = useRouter()
  const blogId = useParam("blogId", "number")
  const [blog, { setQueryData }] = useQuery(getBlog, { where: { id: blogId } })
  const [updateBlogMutation] = useMutation(updateBlog)

  return (
    <div>
      <h1>Edit Blog {blog.id}</h1>
      <pre>{JSON.stringify(blog)}</pre>

      <BlogForm
        initialValues={blog}
        onSubmit={async () => {
          try {
            const updated = await updateBlogMutation({
              where: { id: blog.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/blogs/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating blog " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditBlogPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBlog />
      </Suspense>

      <p>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
      </p>
    </div>
  )
}

EditBlogPage.getLayout = (page) => <Layout title={"Edit Blog"}>{page}</Layout>

export default EditBlogPage

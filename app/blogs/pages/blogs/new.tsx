import Layout from 'app/layouts/Layout'
import { Link, useRouter, useMutation, BlitzPage } from 'blitz'
import createBlog from 'app/blogs/mutations/createBlog'
import BlogForm from 'app/blogs/components/BlogForm'
import { useState } from 'react'

const NewBlogPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlogMutation] = useMutation(createBlog)
  const [title, setTitle] = useState('please input blog title!')
  const [body, setBody] = useState('please input blog body!')

  return (
    <div>
      <h1>Create New Blog</h1>

      <div
        style={{
          marginTop: '30px',
        }}
      >
        <BlogForm
          onSubmit={async () => {
            try {
              const blog = await createBlogMutation({
                data: {
                  title,
                  body,
                },
              })
              alert('Success!' + JSON.stringify(blog))
              router.push(`/blogs/${blog.id}`)
            } catch (error) {
              alert('Error creating blog ' + JSON.stringify(error, null, 2))
            }
          }}
        >
          <h3>Title</h3>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <h3>Body</h3>
          <div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
        </BlogForm>
      </div>

      <p>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
      </p>
    </div>
  )
}

NewBlogPage.getLayout = (page) => (
  <Layout title={'Create New Blog'}>{page}</Layout>
)

export default NewBlogPage

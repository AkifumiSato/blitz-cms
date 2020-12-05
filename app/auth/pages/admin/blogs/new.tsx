/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useRouter, useMutation, BlitzPage } from 'blitz'
import createBlog from 'app/blogs/mutations/createBlog'
import BlogForm from 'app/blogs/components/BlogForm'
import { useState } from 'react'
import LinkText from 'app/components/LinkText'
import Title from 'app/auth/components/Title'
import AdminLayout from 'app/layouts/AdminLayout'
import FormItem from '../../../components/FromItem'
import InputText from '../../../components/InputText'
import Textarea from '../../../components/Textarea'

const NewBlogPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlogMutation] = useMutation(createBlog)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div>
      <Title size="min">Create New Blog</Title>
      <div
        css={css`
          margin-top: 30px;
        `}
      >
        <div>
          <LinkText href="/blogs">&lt; Blogs</LinkText>
        </div>
        <div
          css={css`
            margin-top: 30px;
          `}
        >
          <BlogForm
            onSubmitClick={async (e) => {
              e.preventDefault()
              try {
                await createBlogMutation({
                  data: {
                    title,
                    body,
                  },
                })
                await router.push('/admin')
              } catch (error) {
                alert('Error creating blog ' + JSON.stringify(error, null, 2))
              }
            }}
          >
            <FormItem keyName="Title">
              <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                placeholder="please input blog title!"
              />
            </FormItem>
            <FormItem keyName="Body">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="please input blog body!"
              />
            </FormItem>
          </BlogForm>
        </div>
      </div>
    </div>
  )
}

NewBlogPage.getLayout = (page) => (
  <AdminLayout title={'Create New Blog'}>{page}</AdminLayout>
)

export default NewBlogPage

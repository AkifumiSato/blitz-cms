/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Link, useRouter, useMutation, BlitzPage } from 'blitz'
import createBlog from 'app/blogs/mutations/createBlog'
import BlogForm from 'app/blogs/components/BlogForm'
import { useState } from 'react'
import SlimLayout from '../../../layouts/SlimLayout'
import { colors } from '../../../stylesheets/colors'
import LinkText from '../../components/LinkText'
import Title from '../../components/Title'

const formTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
`

const NewBlogPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlogMutation] = useMutation(createBlog)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div>
      <Title>Create New Blog</Title>

      <div
        css={css`
          margin-top: 50px;
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
                const blog = await createBlogMutation({
                  data: {
                    title,
                    body,
                  },
                })
                await router.push(`/blogs/${blog.id}`)
              } catch (error) {
                alert('Error creating blog ' + JSON.stringify(error, null, 2))
              }
            }}
          >
            <div>
              <h3 css={formTitleStyle}>Title</h3>
              <div>
                <input
                  placeholder="please input blog title!"
                  css={css`
                    border: 1px solid ${colors.gray['400']};
                    border-radius: 5px;
                    padding: 10px;
                    margin-top: 30px;
                    width: 50%;
                    line-height: 1.5;
                  `}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div
              css={css`
                margin-top: 50px;
              `}
            >
              <h3 css={formTitleStyle}>Body</h3>
              <div>
                <textarea
                  placeholder="please input blog body!"
                  css={css`
                    border: 1px solid ${colors.gray['400']};
                    border-radius: 5px;
                    padding: 10px;
                    margin-top: 30px;
                    height: 300px;
                    width: 100%;
                    line-height: 1.5;
                  `}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
          </BlogForm>
        </div>
      </div>
    </div>
  )
}

NewBlogPage.getLayout = (page) => (
  <SlimLayout title={'Create New Blog'}>{page}</SlimLayout>
)

export default NewBlogPage

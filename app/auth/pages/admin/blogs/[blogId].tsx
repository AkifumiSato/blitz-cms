/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC, Suspense, useState } from 'react'
import AdminLayout from 'app/layouts/AdminLayout'
import {
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  usePaginatedQuery,
} from 'blitz'
import { format } from 'date-fns'
import getBlog from 'app/blogs/queries/getBlog'
import updateBlog from 'app/blogs/mutations/updateBlog'
import BlogForm from 'app/blogs/components/BlogForm'
import getTags from 'app/tags/queries/getTags'
import TagsForm from 'app/blogs/components/TagsForm'
import createTag from 'app/tags/mutations/createTag'
import Title from 'app/auth/components/Title'
import deleteBlog from '../../../../blogs/mutations/deleteBlog'
import FormItem from '../../../components/FromItem'
import InputText from '../../../components/InputText'
import OutLineButton from '../../../components/OutLineButton'
import Textarea from '../../../components/Textarea'

export const EditBlog: FC = () => {
  const router = useRouter()
  const blogId = useParam('blogId', 'number')
  const [blog, { setQueryData }] = useQuery(getBlog, { where: { id: blogId } })
  const [updateBlogMutation] = useMutation(updateBlog)
  const [createTagMutation] = useMutation(createTag)
  const [editedTitle, setTitle] = useState(blog.title)
  const [editedBody, setBody] = useState(blog.body)
  const [{ tags }] = usePaginatedQuery(getTags, {
    orderBy: { id: 'asc' },
  })
  const [deleteBlogMutation] = useMutation(deleteBlog)

  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <Title size="min">{blog.title}</Title>
        <OutLineButton
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deleteBlogMutation({ where: { id: blogId } })
              await router.push('/admin')
            }
          }}
        >
          delete
        </OutLineButton>
      </div>
      <div
        css={css`
          margin-top: 30px;
        `}
      >
        <BlogForm
          onSubmitClick={async () => {
            try {
              const updated = await updateBlogMutation({
                where: { id: blog.id },
                data: { title: editedTitle, body: editedBody },
              })
              await setQueryData(updated)
              alert('The post was updated successfully!')
              await router.push('/admin')
            } catch (error) {
              console.log(error)
              alert('Error creating blog ' + JSON.stringify(error, null, 2))
            }
          }}
        >
          <FormItem keyName="created at" readonly={true}>
            {format(blog.createdAt, 'yyyy/MM/dd HH:mm')}
          </FormItem>
          <FormItem keyName="updated at" readonly={true}>
            {format(blog.updatedAt, 'yyyy/MM/dd HH:mm')}
          </FormItem>
          <FormItem keyName="Title">
            <InputText
              value={editedTitle}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
            />
          </FormItem>
          <FormItem keyName="Body">
            <Textarea
              value={editedBody}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormItem>
        </BlogForm>
      </div>
      <div
        css={css`
          margin-top: 100px;
        `}
      >
        {/* todo: Tag登録のUIを整備する */}
        <div
          css={css`
            display: none;
          `}
        >
          <TagsForm
            tags={tags}
            onSubmit={async (_e, name) => {
              try {
                const tag = await createTagMutation({
                  data: {
                    name,
                    blog: {
                      connect: {
                        id: blog.id,
                      },
                    },
                  },
                })
                alert('Success!' + JSON.stringify(tag))
              } catch (error) {
                console.log(error)
                alert('Error creating tag ' + JSON.stringify(error, null, 2))
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

const EditBlogPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBlog />
      </Suspense>
    </div>
  )
}

EditBlogPage.getLayout = (page) => (
  <AdminLayout title={'Edit Blog'}>{page}</AdminLayout>
)

export default EditBlogPage

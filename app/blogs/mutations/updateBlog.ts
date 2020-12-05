import { Ctx } from 'blitz'
import db, { BlogUpdateArgs } from 'db'

type UpdateBlogInput = Pick<BlogUpdateArgs, 'where' | 'data'>

export default async function updateBlog(
  { where, data }: UpdateBlogInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const blog = await db.blog.update({ where, data })

  return blog
}

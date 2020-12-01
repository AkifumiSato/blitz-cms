import { Ctx } from 'blitz'
import db, { BlogDeleteArgs } from 'db'

type DeleteBlogInput = Pick<BlogDeleteArgs, 'where'>

export default async function deleteBlog({ where }: DeleteBlogInput, ctx: Ctx) {
  ctx.session.authorize()

  const blog = await db.blog.delete({ where })

  return blog
}

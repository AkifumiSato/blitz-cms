import { Ctx } from 'blitz'
import db, { BlogCreateArgs } from 'db'

type CreateBlogInput = Pick<BlogCreateArgs, 'data'>
export default function createBlog({ data }: CreateBlogInput, ctx: Ctx) {
  ctx.session.authorize()

  return db.blog.create({ data })
}

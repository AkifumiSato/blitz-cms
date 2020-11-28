import { Ctx } from "blitz"
import db, { BlogCreateArgs } from "db"

type CreateBlogInput = Pick<BlogCreateArgs, "data">
export default async function createBlog({ data }: CreateBlogInput, ctx: Ctx) {
  ctx.session.authorize()

  const blog = await db.blog.create({ data })

  return blog
}

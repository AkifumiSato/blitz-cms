import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstBlogArgs } from "db"

type GetBlogInput = Pick<FindFirstBlogArgs, "where">

export default async function getBlog({ where }: GetBlogInput, ctx: Ctx) {
  ctx.session.authorize()

  const blog = await db.blog.findFirst({ where })

  if (!blog) throw new NotFoundError()

  return blog
}

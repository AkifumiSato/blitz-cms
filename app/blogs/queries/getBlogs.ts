import { Ctx } from 'blitz'
import db, { FindManyBlogArgs } from 'db'

type GetBlogsInput = Pick<
  FindManyBlogArgs,
  'where' | 'orderBy' | 'skip' | 'take'
>

export default async function getBlogs(
  { where, orderBy, skip = 0, take }: GetBlogsInput,
  _ctx: Ctx
) {
  const blogs = await db.blog.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.blog.count()
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    blogs,
    nextPage,
    hasMore,
    count,
  }
}

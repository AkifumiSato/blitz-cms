import { Ctx } from 'blitz'
import db, { FindManyTagArgs } from 'db'

type GetTagsInput = Pick<FindManyTagArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default async function getTags(
  { where, orderBy, skip = 0, take }: GetTagsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const tags = await db.tag.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.tag.count()
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    tags,
    nextPage,
    hasMore,
    count,
  }
}

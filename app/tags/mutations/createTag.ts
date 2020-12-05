import { Ctx } from 'blitz'
import db, { TagCreateArgs } from 'db'

type CreateTagInput = Pick<TagCreateArgs, 'data'>
export default async function createTag({ data }: CreateTagInput, ctx: Ctx) {
  ctx.session.authorize()

  const tag = await db.tag.create({ data })

  return tag
}

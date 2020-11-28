import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstTagArgs } from "db"

type GetTagInput = Pick<FindFirstTagArgs, "where">

export default async function getTag({ where }: GetTagInput, ctx: Ctx) {
  ctx.session.authorize()

  const tag = await db.tag.findFirst({ where })

  if (!tag) throw new NotFoundError()

  return tag
}

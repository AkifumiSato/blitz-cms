import { Ctx } from "blitz"
import db, { TagUpdateArgs } from "db"

type UpdateTagInput = Pick<TagUpdateArgs, "where" | "data">

export default async function updateTag({ where, data }: UpdateTagInput, ctx: Ctx) {
  ctx.session.authorize()

  const tag = await db.tag.update({ where, data })

  return tag
}

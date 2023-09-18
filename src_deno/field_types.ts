import {
  instanceof as _instanceof,
  string,
  ZodIssueCode,
} from 'https://deno.land/x/zod@v3.22.2/mod.ts'
import { ObjectId } from 'https://esm.sh/bson@6.1.0?target=es2022'

export {
  array,
  boolean,
  date,
  literal,
  number,
  object,
  object as createScheme,
  record,
  string,
} from 'https://deno.land/x/zod@v3.22.2/mod.ts'

export const objectId = () => {
  return _instanceof(ObjectId).optional().or(
    string().transform((input, ctx) => {
      try {
        return ObjectId.createFromHexString(input)
      } catch (error) {
        ctx.addIssue({
          message: error instanceof Error ? error.message : 'unknown error',
          code: ZodIssueCode.custom,
          params: { input },
        })
      }
    }),
  )
}

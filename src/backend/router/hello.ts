import * as trpc from '@trpc/server';
import { z } from 'zod';
import createRouter from "./createRouter";

export default createRouter()
  .query('.hello', {
    input: z
      .object({
        text: z.string().optional(),
        shouldError: z.boolean().default(false),
      })
      .nullish(),
    resolve({ input }) {
      if (input?.shouldError) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'ohh noo! there was an error!!! 😭',
        });
      }

      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  });

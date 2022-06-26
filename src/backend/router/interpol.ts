import nationality from '@/utils/nationality';
import * as trpc from '@trpc/server';
import axios from 'axios';
import { z } from 'zod';
import createRouter from "./createRouter";

type InterpolResponse = {
  total: number,
  query: {
    page: number,
    resultPerPage: number,
  },
  _embedded: {
    notices: [{
      forename: string,
      date_of_birth: string,
      entity_id: string,
      nationalities: string[],
      name: string,
      _links: {
        self?: {
          href: string,
        },
        images?: {
          href: string,
        },
        thumbnail?: {
          href: string,
        },
      },
    }],
  },
  _links: {
    self?: {
      href: string,
    },
    first?: {
      href: string,
    },
    next?: {
      href: string,
    },
    last?: {
      href: string,
    }
  }
};

export default createRouter()
  .query('.red', {
    input: z
      .object({
        page: z.number().default(1),
        searchParams: z.object({
          name: z.string().optional(),
          forename: z.string().optional(),
          nationality: z.string().optional(),
          sexId: z.string().optional(),
          ageMin: z.string().optional(),
          ageMax: z.string().optional(),
          arrestWarrantCountryId: z.string().optional(),
          freeText: z.string().optional(),
        }),
      }),
    async resolve({ input }) {
      const params = Object.fromEntries(Object.entries(input.searchParams)
        .filter(([key, value]) => !!value));
      const query = new URLSearchParams(params);
      const url = `https://ws-public.interpol.int/notices/v1/red?resultPerPage=8&page=${input?.page}&${query}`;
      try {
        const response = await axios.get(url);
        return response.data as InterpolResponse;
      } catch (e) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'ohh noo! there was an error!!! 😭',
        });
      }
    },
  })
  .query('.yellow', {
    input: z
      .object({
        page: z.number().default(1),
        searchParams: z.object({
          name: z.string().optional(),
          forename: z.string().optional(),
          nationality: z.string().optional(),
          sexId: z.string().optional(),
          ageMin: z.string().optional(),
          ageMax: z.string().optional(),
          freeText: z.string().optional(),
        }),
      }),
    async resolve({ input }) {
      const params = Object.fromEntries(Object.entries(input.searchParams)
        .filter(([key, value]) => !!value));
      const query = new URLSearchParams(params);
      const url = `https://ws-public.interpol.int/notices/v1/yellow?resultPerPage=5&page=${input?.page}&${query}`;
      try {
        const response = await axios.get(url);
        return response.data as InterpolResponse;
      } catch (e) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'ohh noo! there was an error!!! 😭',
        });
      }
    },
  });

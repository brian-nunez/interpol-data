import createRouter from './createRouter';
import interpol from './interpol';

export const appRouter = createRouter()
  .merge('interpol', interpol);

// export type definition of API
export type AppRouter = typeof appRouter;

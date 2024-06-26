import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { iconsRouter } from "~/server/api/routers/icons";
import { checkoutRouter } from "~/server/api/routers/checkout";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  icons: iconsRouter,
  checkout: checkoutRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
// create some word to create
/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

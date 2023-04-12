import {publicProcedure, router} from "@/server/server";
import {z} from "zod";

export interface User {
  id: string;
  name: string;
}

const userList: User[] = [
  {id: '1', name: 'John'},
  {id: '2', name: 'Jane'},
];

export const appRouter = router({
  userById: publicProcedure
    .input(z.string())
    .query((id) => {
      const {input} = id;
      return userList.find((user) => user.id === input);
    }),
  userCreator: publicProcedure
    .input(z.object({name: z.string()}))
    .mutation(({input}) => {
      const id = `${Math.random()}`;

      const user: User = {
        id,
        name: input.name,
      }

      userList.push(user);
      return user;
    }),
});

export type AppRouter = typeof appRouter;
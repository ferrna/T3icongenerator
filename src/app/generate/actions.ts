"use server";

import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

export async function generateIconAction(prompt: string, color = "") {
  /* const session = await getServerAuthSession();
  const created =
    session && (await api.generate.generateIcon({ prompt, color }));
  return created ? "ok" : "error"; */
  return "ok";
  //if (created?.userId !== session.user.id) throw new Error('User not authorized')

  /* if (!session?.user) throw new Error('Unauthorized')
  const room = await getRoom(roomId)
  if (room?.userId !== session.user.id) throw new Error('User not authorized')

  const response = await deleteRoom(roomId)
  return response?.deletedId ? 'ok' : 'error' */
}

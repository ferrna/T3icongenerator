"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";

export async function generateIconAction(prompt: string, color: string = "") {
  const session = await getServerAuthSession();
  const created = await api.generate.generateIcon({ prompt, color });
  return;
  //if (created?.userId !== session.user.id) throw new Error('User not authorized')

  /* if (!session?.user) throw new Error('Unauthorized')
  const room = await getRoom(roomId)
  if (room?.userId !== session.user.id) throw new Error('User not authorized')

  const response = await deleteRoom(roomId)
  return response?.deletedId ? 'ok' : 'error' */
}

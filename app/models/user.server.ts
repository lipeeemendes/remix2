import type { User } from "@prisma/client";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}
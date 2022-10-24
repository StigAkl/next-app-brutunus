import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  if (!id) {
    return res.status(500);
  } else {
    const userData = await prisma.userdata.findUnique({
      where: {
        id: parseInt(id?.toString()),
      },
    });
    res.status(200).json({ userData });
  }
}

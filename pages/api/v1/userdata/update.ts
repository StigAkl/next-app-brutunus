import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData = req.body;

    if (userData.id !== undefined) {
      try {
        await prisma.userdata.update({
          where: {
            id: userData.id,
          },
          data: userData,
        });

        return res.status(200).send({
          success: true,
        });
      } catch (e) {
        return res.status(500).send({});
      }
    }
  }

  res.status(400).send({});
}

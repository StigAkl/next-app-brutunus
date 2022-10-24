import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData = req.body;
    userData.longitude = 30;
    userData.latitude = 30;
    try {
      await prisma.userdata.create({
        data: {
          ...userData,
        },
      });

      return res.status(204).send({});
    } catch (e) {
      console.log(e);
      return res.status(500).send({});
    }
  }

  res.status(400).send({});
}

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;
    try {
      await prisma.userdata.delete({
        where: {
          id,
        },
      });
      return res.status(200).send({});
    } catch (error) {
      //console.error(error);
      return res.status(500).send({});
    }
  }

  res.status(400).send({});
}

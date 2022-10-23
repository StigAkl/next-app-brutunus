// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface Stats {
  userDataCount: number;
  averageAge: number;
  statsCount: number;
  citiesCount: number;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stats>
) {
  const userDataCount = (await prisma.userdata.findMany()).length;

  res.status(200).json({
    userDataCount: userDataCount,
    averageAge: 2,
    citiesCount: 3,
    statsCount: 10,
  });
}

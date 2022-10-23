import type { NextApiRequest, NextApiResponse } from "next";
import { Userdata, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserdataResponse {
  userdata: Userdata[];
  numEntries: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserdataResponse>
) {
  const { page, pagecount } = req.query;

  const pageNumber =
    page !== undefined && typeof page === "string" ? parseInt(page) : 1;

  const pageCount = pagecount ? parseInt(pagecount.toString()) : 50;

  const transaction = await prisma.$transaction([
    prisma.userdata.count(),
    prisma.userdata.findMany({
      skip: (pageNumber - 1) * pageCount,
      take: pageCount,
    }),
  ]);

  res.status(200).json({
    userdata: transaction[1],
    numEntries: transaction[0],
  });
}

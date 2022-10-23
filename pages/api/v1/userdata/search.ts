// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Userdata, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchResponse {
  count: number;
  employees: Userdata[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  const { query, filter } = req.query;

  const getUserdata = async (query: string, filter: string) => {
    if (filter === "firstname") {
      return await prisma.userdata.findMany({
        where: {
          firstName: {
            contains: query?.toString(),
          },
        },
        take: 50,
      });
    }
    return [];
  };

  const userdata = await prisma.userdata.findMany({
    take: 50,
    orderBy: [
      {
        firstName: "asc",
      },
    ],
  });

  res.status(200).json({
    count: userdata.length,
    employees: userdata,
  });
}

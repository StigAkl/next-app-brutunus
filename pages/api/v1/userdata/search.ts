// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Userdata, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchResponse {
  numEntries: number;
  userdata: Userdata[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  const { query } = req;

  const deafultSearchFilter = "firstName";
  let filterAttribute = "startsWith";

  let searchTerm: string | number = query.query?.toString() ?? "";

  if (query.filter === "age") {
    filterAttribute = "equals";
    searchTerm = parseInt(searchTerm);
  }

  const userdata = await prisma.userdata.findMany({
    where: {
      [query.filter?.toString() ?? deafultSearchFilter]: {
        [filterAttribute]: searchTerm,
      },
    },
    orderBy: [
      { firstName: "asc" },
      { lastName: "asc" },
      { age: "asc" },
      { city: "asc" },
      { street: "asc" },
    ],
  });

  res.status(200).json({
    numEntries: userdata.length,
    userdata: userdata,
  });
}

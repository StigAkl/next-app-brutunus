// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface Stats {
  userDataCount: number;
  averageAge?: number;
  statsCount: number;
  citiesCount: number;
  topTenCities: string[];
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stats>
) {
  const aggregation = await prisma.userdata.aggregate({
    _avg: {
      age: true,
    },
    _count: {
      _all: true,
    },
  });

  const countByCities = await prisma.userdata.groupBy({
    take: 10,
    by: ["city"],
    _count: {
      city: true,
    },
    orderBy: {
      _count: {
        city: "desc",
      },
    },
  });

  const numUniqueCities = (
    await prisma.userdata.findMany({
      distinct: ["city"],
    })
  ).length;

  console.log("By cities:", countByCities);

  const topTenCities = countByCities.map((city) => {
    return city.city;
  });

  console.log(topTenCities);

  res.status(200).json({
    userDataCount: aggregation._count._all,
    averageAge: aggregation._avg.age ?? 0,
    citiesCount: numUniqueCities,
    statsCount: 10,
    topTenCities,
  });
}

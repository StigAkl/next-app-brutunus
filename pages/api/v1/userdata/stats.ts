// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface Stats {
  userDataCount: number;
  averageAge?: number;
  statsCount: number;
  citiesCount: number;
  topTenCities: string[];
  ageRangeStats: AgeStats[];
}

interface AgeStats {
  label: string;
  count: number;
}

const prisma = new PrismaClient();

const ageStats = [
  {
    label: "12-18",
    count: 0,
  },
  {
    label: "19-25",
    count: 0,
  },
  {
    label: "26-35",
    count: 0,
  },
  {
    label: "36-51",
    count: 0,
  },
  {
    label: "52-69",
    count: 0,
  },
  {
    label: "70+",
    count: 0,
  },
];

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

  const countByCitiesPromise = prisma.userdata.groupBy({
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

  const ageStatsTransactionPromise = prisma.$transaction([
    prisma.userdata.count({
      where: { age: { gte: 12, lte: 18 } },
    }),
    prisma.userdata.count({
      where: { age: { gte: 19, lte: 25 } },
    }),
    prisma.userdata.count({
      where: { age: { gte: 26, lte: 35 } },
    }),
    prisma.userdata.count({
      where: { age: { gte: 36, lte: 51 } },
    }),
    prisma.userdata.count({
      where: { age: { gte: 52, lte: 69 } },
    }),
    prisma.userdata.count({
      where: { age: { gte: 70 } },
    }),
  ]);

  const numUniqueCitiesPromise = prisma.userdata.findMany({
    distinct: ["city"],
  });

  //Retrieve results from promises
  const topTenCities = (await countByCitiesPromise).map((city) => {
    return city.city;
  });
  const numUniqueCities = (await numUniqueCitiesPromise).length;
  const ageStatsTransactionResult = await ageStatsTransactionPromise;

  ageStats.forEach((stat, index) => {
    stat.count = ageStatsTransactionResult[index];
  });

  await prisma.$disconnect();

  res.status(200).json({
    userDataCount: aggregation._count._all,
    averageAge: aggregation._avg.age ?? 0,
    citiesCount: numUniqueCities,
    statsCount: 10,
    topTenCities,
    ageRangeStats: ageStats,
  });
}

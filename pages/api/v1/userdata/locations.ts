import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

const prisma = new PrismaClient();

interface Location {
  longitude: Decimal;
  latitude: Decimal;
}

interface LocationsResponse {
  locations: Location[];
  items: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationsResponse>
) {
  const locations = await prisma.userdata.findMany({
    select: {
      longitude: true,
      latitude: true,
    },
  });

  console.log(locations);
  res.status(200).json({
    items: locations.length,
    locations,
  });
}

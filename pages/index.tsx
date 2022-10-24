import type { NextPage } from 'next'
import {
  Box,
  chakra,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  styled,
} from '@chakra-ui/react';
import AgeChart from '../components/AgeChart';
import { useEffect, useState } from 'react';

export interface Stats {
  userDataCount: number;
  averageAge?: number;
  statsCount: number;
  citiesCount: number;
  topTenCities: string[];
  ageRangeStats: AgeStats[];
}

export interface AgeStats {
  label: string;
  count: number;
}

const initStats = {
  userDataCount: 0,
  averageAge: 0,
  statsCount: 0,
  citiesCount: 0,
  topTenCities: [],
  ageRangeStats: [],
}


const Stats: NextPage = () => {

  const [stats, setStats] = useState<Stats>(initStats);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/v1/userdata/stats').then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          setStats(data);
          setLoading(false);
        })
      }
    })
  }, [])


  if (loading) {
    return (
      <Container centerContent>
        <Spinner marginTop="50px" />
      </Container>
    )
  }
  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Heading
          textAlign={'center'}
          as="h1"
          margin="40px">
          Statistics
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Heading textAlign="center" padding="5px" as="h2" size="lg" >Age groups</Heading>
            <AgeChart stats={stats.ageRangeStats} />
          </Box>
          <Box maxW='sm' borderWidth='1px' alignItems="center" borderRadius='lg' overflow='hidden'>
            <Heading textAlign="center" padding="5px" size="lg" as="h2">Data records</Heading>
            <Box marginTop="10px" border="1px solid black" height="100%" display="flex" justifyContent="center" alignItems="center">
              Test
            </Box>
          </Box>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            {/* <AgeChart stats={stats.ageRangeStats} /> */}
          </Box>
        </SimpleGrid>
      </Box>
    </>
  )
}


export default Stats

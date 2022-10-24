import type { NextPage } from 'next'
import {
  Box,
  chakra,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  styled,
  Text,
} from '@chakra-ui/react';
import AgeChart from '../components/AgeChart';
import { useEffect, useState } from 'react';
import Card, { StatsCardProps } from '../components/Cards';

export interface Stats {
  userDataCount: number;
  averageAge?: number;
  citiesCount: number;
  topTenCities: string[];
  ageRangeStats: AgeStats[];
  statesCount: number,
  topTenStates: string[];
}

export interface AgeStats {
  label: string;
  count: number;
}

const initStats = {
  userDataCount: 0,
  averageAge: 0,
  citiesCount: 0,
  topTenCities: [],
  ageRangeStats: [],
  statesCount: 0,
  topTenStates: [],
}


const Stats: NextPage = () => {

  const [stats, setStats] = useState<Stats>(initStats);
  const [loading, setLoading] = useState<boolean>(true);

  const overviewStats: StatsCardProps = {
    title: "Statistics",
    col1: {
      title: "Users",
      value: stats.userDataCount.toString()
    },
    col2: {
      title: "Cities",
      value: stats.citiesCount.toString()
    },
    col3: {
      title: "States",
      value: stats.statesCount.toString()
    }
  }

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

  const topCities = stats.topTenCities.map((city, i) => (<ListItem key={city}>{i + 1}. {city}</ListItem>));
  const topStates = stats.topTenStates.map((state, i) => (<ListItem key={state}>{i + 1} {state}</ListItem>));

  return (
    <>
      <Container color="teal.600" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Heading
          textAlign={'center'}
          as="h1"
          margin="40px">
          Statistics
        </Heading>

        <Text fontWeight="bold" textAlign="center" padding="15px" as="h2" size="lg" >Records of <Text display="inline" color="red.400">{stats.userDataCount}</Text> users</Text>

        <Box maxW='sm' overflow='hidden'>
          <Card {...overviewStats} />
        </Box>
        <Box boxSize="2xl" marginBottom="100px">
          <Heading textAlign="center" padding="15px" as="h2" size="lg" >Age groups</Heading>
          <AgeChart stats={stats.ageRangeStats} />
        </Box>

        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" marginBottom="50px">
          <Heading textAlign="center" padding="5px" size="lg" as="h2">Top 10 cities</Heading>
          <List>
            {topCities}
          </List>
        </Box>

        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" marginBottom="100px">
          <Heading textAlign="center" padding="5px" size="lg" as="h2">Top 10 states</Heading>
          <List>
            {topStates}
          </List>
        </Box>
      </Container>
    </>
  )
}


export default Stats

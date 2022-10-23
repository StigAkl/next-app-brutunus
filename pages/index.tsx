import type { NextPage } from 'next'
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  stat: string;
}

const Stats: NextPage = () => {
  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Statistics
        </chakra.h1>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'We have'} stat={'50,000 employees'} />
          <StatsCard title={'In'} stat={'30 different countries'} />
          <StatsCard title={'Who speak'} stat={'100 different languages'} />
          <StatsCard title={'Who speak'} stat={'100 different languages'} />
          <StatsCard title={'Who speak'} stat={'100 different languages'} />
          <StatsCard title={'Who speak'} stat={'100 different languages'} />
        </SimpleGrid>
      </Box>
    </>
  )
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'}>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}


export default Stats

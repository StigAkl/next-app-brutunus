import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

export interface StatsCardProps {
  title: string;
  col1: Col;
  col2: Col;
  col3: Col;
}

export interface Col {
  title: string;
  value: string;
}

const Card = ({ title, col1, col2, col3 }: StatsCardProps) => {

  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

  return (
    <Flex
      borderRadius='20px'
      bg={boxBg}
      p='20px'
      h='345px'
      w={{ base: "315px", md: "345px" }}
      alignItems='center'
      direction='column'>
      <Image
        alt="statistics icon"
        src="/statistics.svg"
        maxW='200px'
        maxH="100px"
        borderRadius='20px'
      />
      <Flex flexDirection='column' justifyContent="center" mb='30px'>
        <Text
          fontWeight='600'
          color={mainText}
          textAlign='center'
          fontSize='xl'>
          {title}
        </Text>
        <Text
          color={secondaryText}
          textAlign='center'
          fontSize='sm'
          fontWeight='500'>
          User data
        </Text>
      </Flex>
      <Flex justify='space-between' w='100%' px='36px'>
        <Flex flexDirection='column'>
          <Text
            fontWeight='600'
            color={mainText}
            fontSize='xl'
            textAlign='center'>
            {col1.value}
          </Text>
          <Text color={secondaryText} fontWeight='500'>
            {col1.title}
          </Text>
        </Flex>
        <Flex flexDirection='column' justifyContent="center">
          <Text
            fontWeight='600'
            color={mainText}
            fontSize='xl'
            textAlign='center'>
            {col2.value}
          </Text>
          <Text color={secondaryText} textAlign="center" fontWeight='500'>
            {col2.title}
          </Text>
        </Flex>
        <Flex flexDirection='column'>
          <Text
            fontWeight='600'
            fontSize='xl'
            color={mainText}
            textAlign='center'>
            {col3.value}
          </Text>
          <Text color={secondaryText} fontWeight='500'>
            {col3.title}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Card;
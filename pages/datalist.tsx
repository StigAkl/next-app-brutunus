import type { NextPage } from 'next'
import styled from 'styled-components';
import { Select, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, CloseButton, Text } from '@chakra-ui/react';
import useDebounce from '../hooks/UseDebounce';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Userdata } from '@prisma/client';
import ReactPaginate from 'react-paginate';
import styles from "./../styles/Datalist.module.css";
import { Input } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import Link from 'next/link';
import debounce from 'lodash.debounce'

const StyledContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
  display: flex; 
  flex-direction: column;
  justify-content: center;
`;

const StyledSearchBar = styled.div`
  display: flex; 
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export interface UserDataResponse {
  numEntries: number;
  userdata: Userdata
}

const StyledAnchor = styled.a`
    text-decoration: underline;
    cursor: pointer;
`;

type FilterOptions = "firstName" | "lastName" | "age" | "city";

interface Filter {
  searchTerm: string;
  filter: FilterOptions;
}

const UserData: NextPage = () => {
  const [filter, setFilter] = useState<Filter>({
    filter: "firstName",
    searchTerm: ""
  });
  const [userdata, setUserdata] = useState<Userdata[]>();
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(0);
  const [pageCount, setPageCount] = useState(50);
  const [query, setQuery] = useState("");

  const changeHandler = (filter: FilterOptions, searchTerm: string) => {
    let url = `/api/v1/userdata/search?query=${searchTerm}&filter=${filter}`
    if (searchTerm === "") {
      setQuery("");
    } else {
      setQuery(searchTerm);
      fetch(url).then(data => {
        data.json().then(data => {
          setUserdata(data.userdata);
          setEntries(data.numEntries);
        })
      })
    }

  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300), []
  );

  const nextPage = (e: any) => {
    const page = e.selected;

    setPage(page + 1);
  }

  const pageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageCount(parseInt(e.target.value));
  }

  const remove = (id: number) => {
    const parsedId = id;
    fetch('/api/v1/userdata/remove', {
      body: JSON.stringify({
        id: parsedId
      }),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        setUserdata(previousData => {
          return previousData?.filter(x => x.id !== parsedId);
        })
      }
    })
  }

  useEffect(() => {
    if (!query) {
      fetch(`/api/v1/userdata/list?page=${page}&pagecount=${pageCount}`).then(data => {
        data.json().then(data => {
          setUserdata(data.userdata);
          setEntries(data.numEntries);
        });
      })
    }
    //Workaround: Filter er ikke inkludert i dependency listen da den skaper lag i frontend klienten grunnet trigging av refetch for hver onchange 
    //Fix: filter burde returneres fra debounce hooken istedenfor - et problem for fremtidige meg
  }, [page, pageCount, query])

  const userDataTable = userdata?.map((data, index) => {
    return (
      <Tr key={data.id}>
        <Link href={`/edit/${data.id}`}><Td><StyledAnchor>{data.id}</StyledAnchor></Td></Link>
        <Td>{data.firstName}</Td>
        <Td>{data.lastName}</Td>
        <Td isNumeric>{data.age}</Td>
        <Td>{data.street}</Td>
        <Td>{data.city}</Td>
        <Td>{data.ccnumber}</Td>
        <Td><CloseButton color='red.600' onClick={() => remove(data.id)} /></Td>
      </Tr >
    )
  });

  return (
    <StyledContainer>
      <Text size="lg" marginBottom="10px">Search to filter</Text>
      <Stack spacing={3}>
        <StyledSearchBar>
          <Input variant='outline' placeholder='Firstname' onChange={(e) => debouncedChangeHandler("firstName", e.target.value)} />
          <Input variant='outline' placeholder='Last name' onChange={(e) => debouncedChangeHandler("lastName", e.target.value)} />
          <Input variant='outline' placeholder='Age' onChange={(e) => debouncedChangeHandler("age", e.target.value)} />
          <Input variant='outline' placeholder='City' onChange={(e) => debouncedChangeHandler("city", e.target.value)} />
        </StyledSearchBar>
        <StyledSearchBar>
          {!query && (<Select onChange={pageCountChange} size='md'>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
            <option value="200">200 per page</option>
          </Select>)}
        </StyledSearchBar>
      </Stack>
      <TableContainer marginTop="30px" width={"100%"}>
        {!query && <Heading size="md" >Shows {userdata?.length} rows per page</Heading>}
        {query && <Heading as="h2">{userdata?.length} hits on {query}</Heading>}
        <Text fontSize='sm'>Click on id to edit</Text>
        {userDataTable && (
          <>
            <Table variant='striped' size='sm' colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>First name</Th>
                  <Th>Last name</Th>
                  <Th isNumeric>Age</Th>
                  <Th>Street</Th>
                  <Th>City</Th>
                  <Th>ccnumber</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userDataTable}
              </Tbody>
            </Table>
          </>
        )}
      </TableContainer>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={nextPage}
        pageCount={query ? 1 : entries / pageCount}
        previousLabel="< previous"
        containerClassName={styles.paginationContainer}
        activeClassName={styles.paginationActive}
        pageRangeDisplayed={4}
      />
    </StyledContainer>
  )
}

export default UserData;

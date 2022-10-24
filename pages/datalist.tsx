import type { NextPage } from 'next'
import styled from 'styled-components';
import { Select, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, CloseButton } from '@chakra-ui/react';
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

  const debounceValue = useDebounce(filter.searchTerm, 500);

  const changeHandler = (filter: FilterOptions, searchTerm: string) => {
    let url = `/api/v1/userdata/search?query=${searchTerm}&filter=${filter}`
    if (searchTerm === "") {
      url = `/api/v1/userdata/list?page=${page}&pagecount=${pageCount}`
      setQuery("");
    } else {
      setQuery(searchTerm);
    }
    fetch(url).then(data => {
      data.json().then(data => {
        setUserdata(data.userdata);
        setEntries(data.numEntries);
      })
    })
  }

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300), []
  );

  const handleSearchChange = (filter: FilterOptions, searchTerm: string) => {
    setFilter({
      filter: filter,
      searchTerm: searchTerm
    });
  }

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
    fetch(`/api/v1/userdata/list?page=${page}&pagecount=${pageCount}`).then(data => {
      data.json().then(data => {
        setUserdata(data.userdata);
        setEntries(data.numEntries);
      });
    })
    //Workaround: Filter er ikke inkludert i dependency listen da den skaper lag i frontend klienten grunnet trigging av refetch for hver onchange 
    //Fix: filter burde returneres fra debounce hooken istedenfor - et problem for fremtidige meg
  }, [page, pageCount])

  const userDataTable = userdata?.map((data, index) => {
    return (
      <Tr key={data.id}>
        <Td><Link href={`/edit/${data.id}`}><StyledAnchor>{data.id}</StyledAnchor></Link></Td>
        <Td>{data.firstName}</Td>
        <Td>{data.lastName}</Td>
        <Td isNumeric>{data.age}</Td>
        <Td>{data.street}</Td>
        <Td>{data.city}</Td>
        <Td>{data.ccnumber}</Td>
        <Td><CloseButton onClick={() => remove(data.id)} /></Td>
      </Tr >
    )
  });

  return (
    <StyledContainer>
      <Stack spacing={3}>
        <StyledSearchBar>
          <Input variant='outline' placeholder='Firstname' onChange={(e) => debouncedChangeHandler("firstName", e.target.value)} />
          <Input variant='outline' placeholder='Last name' onChange={(e) => debouncedChangeHandler("lastName", e.target.value)} />
          <Input variant='outline' placeholder='Age' onChange={(e) => debouncedChangeHandler("age", e.target.value)} />
          <Input variant='outline' placeholder='City' onChange={(e) => debouncedChangeHandler("city", e.target.value)} />
        </StyledSearchBar>
        <StyledSearchBar>
          {!debounceValue && (<Select onChange={pageCountChange} size='md'>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
            <option value="200">200 per page</option>
          </Select>)}
        </StyledSearchBar>
      </Stack>
      <TableContainer width={"100%"}>
        {!query && <Heading as="h3">Shows {userdata?.length} rows</Heading>}
        {query && <Heading as="h2">{userdata?.length} hits on {query}</Heading>}
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
        pageCount={debounceValue ? 1 : entries / pageCount}
        previousLabel="< previous"
        containerClassName={styles.paginationContainer}
        activeClassName={styles.paginationActive}
        pageRangeDisplayed={10}
      />
    </StyledContainer>
  )
}

export default UserData;

import type { NextPage } from 'next'
import styled from 'styled-components';
import { Select, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import useDebounce from '../hooks/UseDebounce';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Userdata } from '@prisma/client';
import NavBar from '../components/NavBar';
import ReactPaginate from 'react-paginate';
import styles from "./../styles/Datalist.module.css";

const StyledContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
  display: flex; 
  flex-direction: column;
  justify-content: center;
`;

export interface UserDataResponse {
  numEntries: number;
  userdata: Userdata
}

const Employees: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [userdata, setUserdata] = useState<Userdata[]>();
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(0);
  const [pageCount, setPageCount] = useState(50);
  const debounceValue = useDebounce(searchText, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const nextPage = (e: any) => {
    const page = e.selected;
    setPage(page + 1);
  }

  const pageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageCount(parseInt(e.target.value));
  }

  useEffect(() => {
    fetch(`/api/v1/userdata/list?page=${page}&pagecount=${pageCount}`).then(data => {
      data.json().then(data => {
        setUserdata(data.userdata);
        setEntries(data.numEntries);
      });
    })
  }, [page, pageCount])

  const filteredEmployees = userdata?.filter(data => {
    return data.firstName.toLowerCase().includes(debounceValue.toLowerCase());
  });

  const tableToFilter = debounceValue ? filteredEmployees : userdata;

  const employeesTable = tableToFilter?.map(data => {
    return (
      <Tr key={data.id}>
        <Td>{data.id}</Td>
        <Td>{data.firstName}</Td>
        <Td>{data.lastName}</Td>
        <Td isNumeric>{data.age}</Td>
        <Td>{data.street}</Td>
        <Td>{data.ccnumber}</Td>
      </Tr>
    )
  });

  return (
    <StyledContainer>
      <NavBar />
      <Select onChange={pageCountChange} size='md'>
        <option value="50">50 per page</option>
        <option value="100">100 per page</option>
        <option value="200">200 per page</option>
      </Select>
      <TableContainer width={"100%"}>
        {employeesTable && (
          <>
            <Table variant='striped'>
              <TableCaption>Employee data</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>First name</Th>
                  <Th>Last name</Th>
                  <Th isNumeric>Age</Th>
                  <Th>Street</Th>
                  <Th>ccnumber</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employeesTable}
              </Tbody>
            </Table>
          </>
        )}
      </TableContainer>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={nextPage}
        pageRangeDisplayed={2}
        pageCount={entries / pageCount}
        previousLabel="< previous"
        containerClassName={styles.pagination}
        activeClassName={styles.active} />
    </StyledContainer>
  )
}

export default Employees;

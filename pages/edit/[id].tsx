import {
  Container, Flex, Heading, Input,
  FormLabel,
  Button,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { Userdata } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useQueryClient } from "react-query";
const Edit: NextPage = () => {

  const router = useRouter()
  const { id } = router.query;

  const toast = useToast();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [ccnumber, setCcnumber] = useState("");
  const [state, setState] = useState("");

  const { data, isLoading } = useUser(id?.toString());
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && data) {
      const user: Userdata = data.userData;

      setFirstname(user.firstName);
      setLastname(user.lastName);
      setAge(user.age.toString());
      setCity(user.city);
      setStreet(user.street);
      setCcnumber(user.ccnumber);
      setState(user.state);
    }
  }, [isLoading, data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedAge = parseInt(age);
    const parsedId = id?.toString() !== undefined ? parseInt(id.toString()) : 0;
    const body = {
      firstName,
      lastName,
      age: parsedAge,
      city,
      street,
      ccnumber,
      state,
      id: parsedId,
    }

    fetch('/api/v1/userdata/update', {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
      method: 'POST'
    }).then(res => {
      if (res.status === 200) {
        queryClient.invalidateQueries([id])
        toast({
          title: 'User updated',
          description: "User with id " + id + " has been updated",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error',
          description: "Error while updating user",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <Container>
      <Flex justifyContent={"center"} direction="column">
        <Heading>Edit user</Heading>
        <form onSubmit={handleSubmit}>
          <FormLabel>Firstname</FormLabel>
          <Input value={firstName} onChange={(e) => setFirstname(e.target.value)} type='text' />
          <FormLabel>Last name</FormLabel>
          <Input value={lastName} onChange={(e) => setLastname(e.target.value)} type='text' />
          <FormLabel>Age</FormLabel>
          <Input value={age} onChange={(e) => setAge(e.target.value)} />
          <FormLabel>City</FormLabel>
          <Input value={city} onChange={(e) => setCity(e.target.value)} type='text' />
          <FormLabel>Street</FormLabel>
          <Input value={street} onChange={(e) => setStreet(e.target.value)} type='text' />
          <FormLabel>State</FormLabel>
          <Input value={state} onChange={(e) => setState(e.target.value)} type='text' />
          <FormLabel>Ccnumber</FormLabel>
          <Input value={ccnumber} onChange={(e) => setCcnumber(e.target.value)} type='text' />
          <Button marginTop={"10px"} type="submit">Save</Button>
        </form>
      </Flex>
    </Container>
  )
}


export default Edit;
import {
  Container, Flex, Heading, Input,
  FormLabel,
  Button,
  useToast
} from "@chakra-ui/react";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { createInitValues, Errors, validateCreateForm } from "./utils";

const Create: NextPage = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    street: "",
    state: "",
    ccnumber: "",
  });

  const [errors, setErrors] = useState<Errors>(createInitValues())

  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues(previousValues => {
      return {
        ...previousValues, [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateCreateForm(formValues);
    setErrors(validationErrors);

    const body = {
      ...formValues,
      age: parseInt(formValues.age)
    };

    if (!validationErrors.isError) {
      fetch('/api/v1/userdata/create', {
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body),
        method: 'POST'
      }).then(res => {
        if (res.status === 204) {
          toast({
            title: 'User created',
            description: "User has been created",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Error',
            description: "Error when creating user",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
    }
  }

  return (
    <Container marginTop='30px'>
      <Flex justifyContent={"center"} direction="column">
        <Heading>Create user</Heading>
        <form onSubmit={handleSubmit}>
          <FormLabel>Firstname</FormLabel>
          <Input value={formValues.firstName} bg={errors.firstName ? 'red.100' : ''} name="firstName" onChange={handleChange} type='text' />
          <FormLabel>Last name</FormLabel>
          <Input value={formValues.lastName} name="lastName" bg={errors.lastName ? 'red.100' : ''} onChange={handleChange} type='text' />
          <FormLabel>Age</FormLabel>
          <Input value={formValues.age} name="age" bg={errors.age ? 'red.100' : ''} onChange={handleChange} />
          <FormLabel>City</FormLabel>
          <Input value={formValues.city} name="city" bg={errors.city ? 'red.100' : ''} onChange={handleChange} type='text' />
          <FormLabel>Street</FormLabel>
          <Input value={formValues.street} name="street" bg={errors.street ? 'red.100' : ''} onChange={handleChange} type='text' />
          <FormLabel>State</FormLabel>
          <Input value={formValues.state} name="state" bg={errors.state ? 'red.100' : ''} onChange={handleChange} type='text' />
          <FormLabel>Ccnumber</FormLabel>
          <Input value={formValues.ccnumber} name="ccnumber" bg={errors.ccnumber ? 'red.100' : ''} onChange={handleChange} type='text' />
          <Button marginTop={"10px"} type="submit">Create</Button>
        </form>
      </Flex>
    </Container>
  )
}


export default Create;
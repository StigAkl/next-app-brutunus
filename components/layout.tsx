import Head from "next/head";
import NavBar from "./NavBar";

type Props = {
  children: JSX.Element,
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Brutunus</title>
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
import NavBar from "./NavBar";

type Props = {
  children: JSX.Element,
};

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
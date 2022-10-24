import { useQuery } from "react-query";

const useUser = (id?: string) => {
  const { data, status } = useQuery([id], async () => {
    const result = await fetch(`/api/v1/userdata/${id}`);
    if (result.status === 200) {
      return result.json();
    }
  });

  return {
    isLoading: status === "loading",
    data,
  };
};

export default useUser;

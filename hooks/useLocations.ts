import { useQuery } from "react-query";

const useLocations = () => {
  const { data, status } = useQuery("locations", async () => {
    const result = await fetch("/api/v1/userdata/locations");
    if (result.status === 200) {
      return result.json();
    }
  });

  return {
    isLoading: status === "loading",
    data,
  };
};

export default useLocations;

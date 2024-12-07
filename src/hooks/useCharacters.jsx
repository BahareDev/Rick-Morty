import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useCharacters(url, query) {
  const [character, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${url}?name=${query}`, { signal });

        setCharacters(data.results);
      } catch (err) {
        // err handeling in clean up function
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // Clean up Function
    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, character };
}

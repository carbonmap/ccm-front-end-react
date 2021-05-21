import { useState, useEffect } from "react";

export const useFetch = ( url: string) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const handleFetch = async() => {
      // fetch url
      const res = await fetch(url);
      // make json
      const json = await res.json();
      setResponse(json);
    }

    handleFetch()
  },[])
  return response
};
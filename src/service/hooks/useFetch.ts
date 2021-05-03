import { useState, useEffect } from "react";

interface RequestProps {
  url: RequestInfo;
  init?: RequestInit;
}

// response type
// type UrlType = { message: string; status: string };

export const useFetch = async({ url, init }: RequestProps) => {
    // response state
  const [data, setData] = useState<string[]>([]);

  // let data;

// Fetch url on site load
  useEffect(() => {
    const fetchApi = async() => {
        try {
        // Fetch data from REST API
        const response = await fetch(url, init);
    
        if (response.status === 200) {
            // Extract json
            const rawData: string[] = await response.json();
            console.log("rawData " + rawData);
            setData(rawData);
            // data = rawData;
        } else {
            console.error(`Error ${response.status} ${response.statusText}`);
        }
        } catch (error) {
          console.error(`Error ${error}`);
        }
    }
    fetchApi();
  }, [JSON.stringify(url), JSON.stringify(init)]);
  console.log("data " + data);
  return data;
};
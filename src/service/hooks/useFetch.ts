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

  const fetchApi = async() => {
    return fetch(url, init)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchApi()
      // .then(res => {
      //   setData(res)
      // })
      .then((res) => {
        setData(res)
      })
  }, [])

  return data;

// Fetch url on site load
  // const fetchApi = async() => {
  //   try {
  //   // Fetch data from REST API
  //   const response = await fetch(url, init);

  //   if (response.status === 200) {
  //       // Extract json
  //       const rawData: string[] = await response.json();
  //       setData(rawData);
  //       // console.log(rawData)
  //     } else {
  //       console.error(`Error ${response.status} ${response.statusText}`);
  //   }
  //   } catch (error) {
  //     console.error(`Error ${error}`);
  //   }
  //   console.log("1")
  // }

  // useEffect(() => {
  //   fetchApi();
  // }, [JSON.stringify(url), JSON.stringify(init)]);
  // console.log("2")
  // return data;

};
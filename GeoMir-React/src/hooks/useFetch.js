import React, { useEffect, useState } from "react";

export default function useFetch(initialUrl, initialOptions) {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setError(undefined);

    async function fetchData() {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        // console.log(json)
        if (json.success == true){
            setData(json.data);          
        }else{
          console.log("La resposta no ha triomfat");
        }  
      } catch (e) {
        setError(e);
      } finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [url, options, refresh]);

  return { data, error, loading, setUrl, setOptions, refresh, setRefresh };
}
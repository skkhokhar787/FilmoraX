import { useEffect, useState } from "react"
import { data } from "react-router-dom"

 const useFetchAPIs = async (api) => {
    const [response, setResponse] = useState([])
console.log(api);

    const res = await fetch(api)
    const data = await res.json()

    useEffect((data) => setResponse(details.json()))

    console.log(response);
    
    return response
}

export default useFetchAPIs
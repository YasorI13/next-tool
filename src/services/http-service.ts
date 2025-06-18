import axios from 'axios'

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const fetcher = (url:string) => 
    http.get(url).then((response)=> response.data);


export {http};
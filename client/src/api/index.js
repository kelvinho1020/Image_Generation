import axios from "axios";

const BASEURL =  (process.env.NODE_ENV === 'development') ? "http://localhost:8080/" : "https://dall-e-2dug.onrender.com";
console.log(BASEURL);

const postRequest = axios.create({
  baseURL: `${BASEURL}api/v1/post`
})

const dalleRequest = axios.create({
  baseURL: `${BASEURL}api/v1/dalle`
})

export const apiGetPost = (page=0, search="") => postRequest.get(`?p=${page}&s=${search}`);
export const apiPostPost = data => postRequest.post("/", data);
export const apiPostDalle = data => dalleRequest.post("/", data);
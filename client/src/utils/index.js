import axios from "axios";
// import { query } from "express";

const API_URL = "http://localhost:8800/api-v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    // console.log("Generated URL:", url); 
  
    const result = await API(url, {
      data: data,
      method: method || "GET" ,
      headers: {
        'content-type': 'application/json',
        Authorization: token?`Bearer ${token}`: '',
      }
    });
    // console.log("API Response:", result?.data);
    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(error);
    return {
      status: err.success,
      message: err.message,
    };
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "jobportal");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dnmsqrfnq/image/upload/", 
      formData
      // "https://pi.cloudinary.com/v1_1/dnmsqrfnq/image/upload/"
    );
    return response.data.secure_url
  } catch (error) {
    console.log(error);
  }
};

export const updateURL = async ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();
  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }

  if (query) {
    params.set("search", query);
  }

  if (cmpLoc) {
    params.set("location", cmpLoc);
  }

  if (sort) {
    params.set("sort", sort);
  }

 

  if (jType) {
    params.set("jType", jType);
  }
 
  if (exp) {
    params.set("exp", exp);
  }

  // const newURL = `http://localhost:8800/api-v1/companies?${params.toString()}`;
  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });
  return newURL;
};

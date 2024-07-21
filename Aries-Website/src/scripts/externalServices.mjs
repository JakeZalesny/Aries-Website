import { setLocalStorage } from "./utils.mjs";

const client_id = import.meta.env.CLIENT_ID; 

const redirect_uri = import.meta.env.REDIRECT_URI;

const baseURL = import.meta.env.SPOTIFY_BASE_URL;

const client_secret = import.meta.env.CLIENT_SECRET;

export function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  export async function getData(json = "") {
    const response = await fetch(json);
    const data = await convertToJson(response);
    return data.results;
  }
  
  export function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  export async function spotifyLogin() {
    var authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + import.meta.env.CLIENT_SECRET).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    const response = await fetch(baseURL + "login/", authOptions).then(convertToJson);
    setLocalStorage("access_token", response.access_token);
    setLocalStorage("token_type", response.token_type);
    return response;
  //   const result = await fetch('https://accounts.spotify.com/api/token', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type' : 'application/x-www-form-urlencoded', 
  //         'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
  //     },
  //     body: 'grant_type=client_credentials'
  // });

  // const data = await result.json();
  // setLocalStorage("access_token", data.access_token);
  // setLocalStorage("token_type", data.token_type);
  // return data;
  }

  // export async function findProductById(id) {
  //   const response = await fetch(baseURL + `product/${id}`);
  //   const product = await convertToJson(response);
  //   return product.Result;
  // }
  
  // export async function checkout(payload) {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   };
  //   const response = await fetch(baseURL + "checkout/", options);
  //   const data = await convertToJson(response);
  //   return data;
  // }
  
  // export async function loginRequest(creds) {
  //   console.log(creds);
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(creds),
  //   };
  //   const response = await fetch(baseURL + "login/", options).then(convertToJson);
  //   console.log(response);
  //   return response.accessToken;
  // }
  
  // export async function orders(token) {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   const response = await fetch(baseURL + "orders", options).then(convertToJson);
  //   return response;
  // }
  
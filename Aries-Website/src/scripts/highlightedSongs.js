import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { convertToJson } from "./externalServices.mjs";
import { getTopTracks } from "./spotify-calls.mjs";
import { formatDuration } from "./utils.mjs";

const client_id = import.meta.env.VITE_CLIENT_ID; 
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
const baseURL = import.meta.env.VITE_SPOTIFY_BASE_URL;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const highlightedSongs = document.getElementById("highlighted-songs");

async function login() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    setLocalStorage("access_token", data.access_token);
    setLocalStorage("token_type", data.token_type);
    return data;
  }

login();

const tracks = await getTopTracks();

tracks.slice(0, 3).forEach((track) => {
  const card = document.createElement("div");
  card.innerHTML = `
                <img src=${track.album.images[1].url} alt={track.name} width="150" height="150">
                <h3>${track.name}</h3>
                <p>Album: ${track.album.name}</p>
                <p>Duration: ${formatDuration(track.duration_ms)}</p>
                <p>Popularity: ${track.popularity}</p>`;

  highlightedSongs.appendChild(card);

});

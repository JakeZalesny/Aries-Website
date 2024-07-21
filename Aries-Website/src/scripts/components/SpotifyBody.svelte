
<script>
    import { getArtist, getAlbums, getTopTracks, getRelatedArtists } from '../spotify-calls.mjs';
    import { spotifyLogin } from '../externalServices.mjs';
    import { setLocalStorage, getLocalStorage } from '../utils.mjs';
    import { convertToJson } from '../externalServices.mjs';
    import { formatDuration } from '../utils.mjs';

  
    const client_id = import.meta.env.VITE_CLIENT_ID; 
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    const baseURL = import.meta.env.VITE_SPOTIFY_BASE_URL;
    const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  
    let artist;
    let album;
    let topTracks;
    let relatedArtists;
    let artistPromise;
    let albumPromise;
    let topTracksPromise;
    let relatedArtistsPromise;
  
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

    const accessToken = getLocalStorage("access_token");
  
    async function fetchArtist() {
      return await getArtist();
    }
  
    async function fetchAlbums() {
      return await getAlbums();
    }
  
    async function fetchTopTracks() {
      return await getTopTracks();
    }
  
    async function fetchRelatedArtists() {
      return await getRelatedArtists();
    }
  
    artistPromise = fetchArtist();
    albumPromise = fetchAlbums();
    topTracksPromise = fetchTopTracks();
    relatedArtistsPromise = fetchRelatedArtists();

  </script>
  
  {#await artistPromise}
    ...waiting
  {:then data}
    <div class="artist-data">
        <img src={data.images[0].url} alt="Aries" loading="lazy"> <!-- Adjust this to match your data structure -->
        <h2>Aries</h2>
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  
  {#await albumPromise}
    ...waiting
  {:then data}
    <h3>Albums</h3>
    <!-- Adjust this to match your data structure -->
     <section id="album-list">
     {#each data as album }
     {#if album.album_type === "album"}
     <div class="album-card">
            <h2>{album.name}</h2>
            <img src={album.images[0].url} alt={album.name} width="150" height="150">
            <p>Type: {album.album_type}</p>
            <p>Release Date: {album.release_date}</p>
            <p>Total Tracks: {album.total_tracks}</p>
            <a href={album.external_urls.spotify}><img src="/assets/Spotify_Primary_Logo_RGB_Black.png" alt="Spotify logo" width="50" height="50" id="spotify-logo"></a>
            <a href={album.external_urls.spotify}><img src="/assets/Spotify_Primary_Logo_RGB_White.png" alt="Spotify logo" width="50" height="50" id="spotify-logo-dark"></a>
    </div>
    {/if}
     {/each}
    </section>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  
  {#await topTracksPromise}
    ...waiting
  {:then data}
    <h3>Top Tracks</h3>
    <section id="top-tracks">
        {#each data as track}
            <div>
                <img src={track.album.images[1].url} alt={track.name} width="150" height="150">
                <h3>{track.name}</h3>
                <p>Album: {track.album.name}</p>
                <p>Duration: {formatDuration(track.duration_ms)}</p>
                <p>Popularity: {track.popularity}</p>
                <a href="{track.external_urls.spotify}"><img src="/assets/Spotify_Primary_Logo_RGB_Black.png" alt="Spotify logo" width="50" height="50" id="spotify-logo"></a>
                <a href="{track.external_urls.spotify}"><img src="/assets/Spotify_Primary_Logo_RGB_White.png" alt="Spotify logo" width="50" height="50" id="spotify-logo-dark"></a>
            </div>
        {/each}
    </section>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  
  {#await relatedArtistsPromise}
    ...waiting
  {:then data}
    <h3>Related Artists</h3>
    <section id="related-artists">
        {#each data as artist}
            <div id="artist">
                <a href="{artist.external_urls.spotify}"><img src={artist.images[0].url} alt={artist.name} width="100" height="100"></a>
                <h4>{artist.name}</h4>
            </div>
        {/each}<!-- Adjust this to match your data structure -->
    </section>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');


    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .artist-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 200px;
      margin: 0;
      border: 0px solid;
      font-family: 'Bebas Neue', sans-serif;
    }

    .artist-data h2 {
      margin-left: 10px;
    }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 600px;
    margin: 60px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: adds shadow for better visibility */
  }

  #album-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  section {
    font-family: 'Bebas Neue', sans-serif;
  }

  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    text-align: center;
    margin-top: 20px;
  }

  #top-tracks {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  #related-artists {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  #artist {
    display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      margin: 0;
      border: 0px solid;
      font-family: 'Bebas Neue', sans-serif; /* Optional: adds shadow for better visibility */
  }

  </style>
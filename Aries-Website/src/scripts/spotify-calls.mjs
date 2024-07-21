import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export async function getArtist(id = "3hOdow4ZPmrby7Q1wfPLEy") {
    const token = getLocalStorage("access_token");
    const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const artist = await response.json();
    return artist;
}

export async function getAlbums(id = "3hOdow4ZPmrby7Q1wfPLEy") {
    const token = getLocalStorage("access_token");
    const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single,compilation,appears_on`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const albums = await response.json();
    return albums.items;
}

export async function getTopTracks(id = "3hOdow4ZPmrby7Q1wfPLEy") {
    const token = getLocalStorage("access_token");
    const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const tracks = await response.json();
    return tracks.tracks;
}

export async function getRelatedArtists(id = "3hOdow4ZPmrby7Q1wfPLEy") {
    const token = getLocalStorage("access_token");
    const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/related-artists`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const artists = await response.json();
    return artists.artists;
}
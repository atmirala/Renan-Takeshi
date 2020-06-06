import React, { useState } from "react";
import { MainContainer, InputGrid, SpotifyItem } from "./styled";
import axios from "axios";

const urlSearchSpotify = "https://api.spotify.com/v1/search";

function SpotifySearch(props) {
  const { token, postTrack } = props;
  const [searchInput, setSearch] = useState("");
  const [tracks, setTracks] = useState();

  async function searchSpotify() {
    try {
      const headersSearchSpotify = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        urlSearchSpotify + `?q=${searchInput}&type=track&market=BR`,
        headersSearchSpotify
      );
      setTracks(response.data.tracks.items);
    } catch (err) {
      setTracks();
      console.log(err);
    }
  }

  function addTrack(item) {
    const body = {
      name: item.name,
      artist: item.artists.map((item) => item.name).join(", "),
      url: item.external_urls.spotify,
        // url: `http://spoti4.future4.com.br/${Math.ceil(Math.random() * 100)}.mp3`,
    };
    postTrack(body);
  }

  const renderedTracks =
    tracks &&
    tracks.map((item) => {
      return (
        <SpotifyItem key={item.id}>
          <span>
            {item.name} ({item.artists.map((item) => item.name).join(", ")})
          </span>
          <button
            onClick={() => {
              addTrack(item);
            }}
          >
            Adicionar
          </button>
        </SpotifyItem>
      );
    });

  return (
    <MainContainer>
      <hr />
      <InputGrid>
        <input
          placeholder="Pesquisar faixas/artistas no Spotify"
          value={searchInput}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={searchSpotify}>Pesquisar</button>
      </InputGrid>
      {renderedTracks}
    </MainContainer>
  );
}

export default SpotifySearch;

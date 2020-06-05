import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PlaylistSidebar from "./components/PlaylistSidebar/PlaylistSidebar";
import MusicList from "./components/MusicList/MusicList";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const url =
  "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const headers = { headers: { Authorization: "renan-takeshi-mello" } };

function App() {
  const [playlists, setPlaylists] = useState();
  const [tracks, setTracks] = useState();

  async function getAllPlaylists() {
    try {
      const response = await axios.get(url, headers);
      setPlaylists(response.data.result.list);
      console.table(response.data.result.list);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPlaylistTracks(id) {
    try {
      const response = await axios.get(url + `/${id}/tracks`, headers);
      setTracks(response.data.result.tracks);
      console.table(response.data.result.tracks);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllPlaylists();
  }, []);

  return (
    <MainContainer>
      <PlaylistSidebar playlists={playlists} getTracks={getPlaylistTracks} />
      {tracks ? <MusicList tracks={tracks} /> : <p>Selecione uma playlist</p>}
    </MainContainer>
  );
}

export default App;

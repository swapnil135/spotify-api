import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Credentials } from './Credentials'
import Datatable from './datatable'

function App() {

  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState([]);

  const spotify = Credentials()
  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientID + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
        console.log(tokenResponse.data.access_token);
        setToken(tokenResponse.data.access_token)
        axios('	https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        }).then(response => {
          const albumarray = []
          for (var v in response.data.items) albumarray.push(response.data.items[v])
          setAlbums(albumarray)
          console.log(albums)
        })
      })

  }, [])

  return (
    <div className="App">
      <Datatable data={albums}></Datatable>
    </div>
  );
}

export default App;

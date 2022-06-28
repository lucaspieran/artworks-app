import { Container } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import Artwork from "./components/Artworks/Artwork"
import ArtworksDetails from "./components/ArtworksDetails/ArtworksDetails"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <>
      <Navbar />

      <Container>
        <Routes>
          <Route path="/artworks" element={<Artwork />} />
          <Route path="/artwork/:id" element={<ArtworksDetails />} />
          <Route path="*" element={<Navigate to="/artworks" replace />} />
        </Routes>
      </Container>
    </>
  )
}

export default App

import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ArtworkDetail } from '../../interfaces/ArtworkDetails'
import { getArtworksById } from '../../store/slices/artwork'
import { AppDispatch } from '../../store';

const ArtworksDetails = () => {
  const dispatch: AppDispatch = useDispatch()
  const [artwork, setArtwork] = useState<ArtworkDetail>()
  const [error, setError] = useState<Boolean>(false)
  const { loading } = useSelector(state => state.artworks)
  const { id } = useParams()

  const fetchById = async () => {
    try {
      const resp = await dispatch(getArtworksById(id))
      setArtwork(resp.payload.data)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchById()
  }, [])

  if (error) return (<Typography align='center' marginTop={5}>An error has occurred, please try again</Typography>)

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: '#fff' }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {
        artwork && (
          <>
            <Typography variant='h4' align='center' marginTop={3}>{artwork.title}</Typography>

            <Grid container spacing={1} sx={{ boxShadow: 20, p: 5, marginY: 4 }} alignContent={'center'}>
              <Grid item xs={12} sm={12} md={12} sx={{ mx: 'auto', justifyContent: 'center', display: 'flex' }}>
                {
                  artwork.image_id ? (
                    <Box
                      component='img'
                      src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                      sx={{
                        width: 500,
                        height: 500,
                        marginTop: 2
                      }} />
                  ) : (
                    <Box
                      sx={{
                        width: 500,
                        height: 500,
                        marginTop: 2
                      }}>No image provided</Box>
                  )
                }
              </Grid>

              <Grid item>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ fontWeight: 'bold' }} marginTop={3}>Fiscal Year: </Typography>
                  <Typography marginTop={3}>{artwork.fiscal_year}</Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} marginTop={3}>Artist Display: </Typography>
                  <Typography marginTop={3} sx={{minWidth: 500}}> {artwork.artist_display}</Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ fontWeight: 'bold' }} marginTop={3}>Fiscal Year: </Typography>
                  <Typography marginTop={3}>{artwork.fiscal_year}</Typography>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ marginLeft: 5, display: 'flex', alignItems: 'end' }}>
                  <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'end' }} align='left' marginTop={2}>Origin: </Typography>
                  <Typography align='left'>{artwork.place_of_origin}</Typography>
                </Box>

                <Box sx={{ marginLeft: 5, display: 'flex', alignItems: 'end' }}>
                  <Typography sx={{ fontWeight: 'bold' }} align='left' marginTop={2}>Date Display:</Typography>
                  <Typography align='left'>{artwork.date_display}</Typography>
                </Box>

                <Box sx={{ marginLeft: 5, display: 'flex', alignItems: 'end' }}>
                  <Typography sx={{ fontWeight: 'bold' }} align='left' marginTop={2}>Artwork Type:</Typography>
                  <Typography align='left'>{artwork.artwork_type_title}</Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }} align='left' marginTop={2}>Artist title:</Typography>
                  <Typography align='left'>{artwork.artist_title}</Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )
      }
    </>
  )
}

export default ArtworksDetails
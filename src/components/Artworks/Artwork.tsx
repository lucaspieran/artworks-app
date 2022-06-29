import { Alert, Backdrop, Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { artworkState, getArtworks, searchArtworks } from '../../store/slices/artwork';
import { ArtworkInterface } from '../../interfaces/Artwork';
import { AppDispatch } from '../../store';
import { TableArtwork } from '../Table/TableArtwork';


const Artwork: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<String>('')
  const { list, loading, error } = useSelector((state: any) => state.artworks)
  const dispatch: AppDispatch = useDispatch()

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (search === '') return dispatch(getArtworks(1))

    dispatch(searchArtworks({ search, page }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    search === '' ? dispatch(getArtworks(page)) : dispatch(searchArtworks({ search, page }))
  }, [page])

  return (
    <>
      <Typography marginTop={3} align="center">
        ArtWorks
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: 3 }}>An error has occurred, please try again</Alert>}

      <Backdrop
        open={loading}
        sx={{ color: '#fff' }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ display: 'flex', flexDirection: 'column' }} component='form' onSubmit={handleSubmit}>
        <TextField onChange={handleChange} label="Search" variant="outlined" sx={{ width: '%70', marginY: 1 }} />
        <Button type="submit" color="primary" variant='contained' sx={{ width: 50 }}>Search</Button>
      </Box>

      {list.length === 0 && <Typography sx={{ marginTop: 5 }}>List is empty</Typography>}

      <TableArtwork
        list={list}
        page={page}
        handleChangePage={handleChangePage} />
    </>
  )
}

export default Artwork
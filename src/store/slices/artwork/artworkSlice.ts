import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ArtworkInterface, ArtworksResponse } from '../../../interfaces/Artwork'
import { artworkApiDetail, artworksApi, artworkSearch } from '../../../api/artworksApi'
import { ArtowrkDetailResponse } from '../../../interfaces/ArtworkDetails'

export interface artworkState {
  list: Array<ArtworkInterface>
  page: number
  loading: boolean
  error: boolean
}

const initialState: artworkState = {
  list: [],
  page: 1,
  loading: false,
  error: false
}

export const getArtworks = createAsyncThunk(
  'artwork/getArtworks',
  async (page: number) => {
    const response = await artworksApi.get<ArtworksResponse>(`&page=${page}`)
    return response.data
  }
)

export const getArtworksById = createAsyncThunk(
  'artwork/getArtworksById',
  async (id: number) => {
    const response = await artworkApiDetail.get<ArtowrkDetailResponse>(`/${id}`)
    return response.data
  }
)

export const searchArtworks = createAsyncThunk(
  'artwork/searchArtworks',
  async ({ search, page }: any) => {
    const response = await artworkSearch.get<ArtworksResponse>(`&page=${page}&q=${search}`)
    return response.data.data
  }
)

export const artworkSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArtworks.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(getArtworks.fulfilled, (state, action) => {
      state.list = action.payload.data
      state.loading = false
    })

    builder.addCase(getArtworks.rejected, (state, action) => {
      state.loading = false
      state.error = true
    })

    builder.addCase(getArtworksById.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(getArtworksById.fulfilled, (state, action) => {
      state.loading = false
    })

    builder.addCase(getArtworksById.rejected, (state, action) => {
      state.loading = false
      state.error = true
    })

    builder.addCase(searchArtworks.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(searchArtworks.fulfilled, (state, action) => {
      state.list = action.payload
      state.loading = false
    })

    builder.addCase(searchArtworks.rejected, (state, action) => {
      state.loading = false
      state.error = true
    })
  }
})

export default artworkSlice.reducer
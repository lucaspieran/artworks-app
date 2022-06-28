import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import { ArtworkInterface } from '../../interfaces/Artwork';
import { Button } from '@mui/material';

interface Props {
  list: Array<ArtworkInterface>
  page: number
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
}

export const TableArtwork = ({ list, page, handleChangePage }: Props) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Departament</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Artist Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Origin</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((row: ArtworkInterface) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell align='right'>{row.department_title}</TableCell>
              <TableCell align='right'>{row.artist_title}</TableCell>
              <TableCell align='right'>{row.place_of_origin}</TableCell>
              <TableCell>
                <Button variant="contained" color='secondary'>
                  <Link style={{ textDecoration: 'none', color: '#fff' }} to={`/artwork/${row.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TablePagination
              count={100}
              page={page}
              rowsPerPageOptions={[11]}
              onPageChange={handleChangePage}
              rowsPerPage={list.length} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

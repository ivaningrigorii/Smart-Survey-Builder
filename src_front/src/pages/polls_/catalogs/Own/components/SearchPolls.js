import * as React from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import GridPoll from './GridPoll';
import { Pagination } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from './styles';

export default function SearchPolls() {
  const [data_request, setData] = React.useState();

  return (
    <Box sx={{ marginTop: 10, flexGrow: 1 }}>
      <GridPoll />
    </Box>
  );
}
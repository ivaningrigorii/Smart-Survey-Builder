import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

const SearchElement = () => {
  const handleClickSearch = () => {
    alert("Это пока не работает (");
  };
  const handlEnterKeyUp = (e) => {
    e.which = e.which || e.keyCode;
    if (e.which == 13) {
      alert("Это пока не работает (");
    }
  };

  return (
    <Box>
      <TextField
        size="small"
        sx={{
          marginLeft: "5%",
          backgroundColor: " #eceaec ",
          borderRadius: "5%",
        }}
        onKeyUp={handlEnterKeyUp}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickSearch}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
export default SearchElement;

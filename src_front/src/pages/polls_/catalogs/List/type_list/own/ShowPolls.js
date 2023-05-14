import { Container, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { reverse } from "named-urls";
import * as React from "react";
import routes from "../../../../../../routes";
import PollCard from "./PollCard";

const PAGE_SIZE = 6;

function finde_size_pagination_line(elements) {
  let count = Math.floor(elements / PAGE_SIZE);
  count = elements % PAGE_SIZE > 0 ? ++count : count;
  return count;
}

const ShowPolls = ({
  pollsOwnList,
  setPollsOwnList,
  make_get,
  pagination_data,
}) => {
  let pagination_count;

  const handleChange = (event, value) => {
    window.location.replace(reverse(routes.polls.cats.own, { page: value }));
  };

  return (
    <Box sx={{ minHeight: "80vh", marginTop: 5 }}>
      <Container>
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent={{ xs: "center", sm: "flex-start", md: "flex-start" }}
        >
          {pollsOwnList.map((poll) => {
            return (
              <Grid key={poll.id} item xs={12} sm={6} md={4}>
                <PollCard poll={poll} make_get={make_get} />
              </Grid>
            );
          })}
        </Grid>
        {(pagination_count = finde_size_pagination_line(
          pagination_data.count
        )) > 1 && (
          <Pagination
            count={pagination_count}
            page={Number(pagination_data.page)}
            onChange={handleChange}
            color="primary"
            sx={{
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "3vh",
            }}
          />
        )}
      </Container>
    </Box>
  );
};
export default ShowPolls;

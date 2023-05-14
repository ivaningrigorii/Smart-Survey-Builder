import { Delete, Edit, Poll, Reply } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { pink } from "@mui/material/colors";
import {
  createTheme,
  responsiveFontSizes, styled
} from "@mui/material/styles";
import { reverse } from "named-urls";
import { useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";
import routes from "../../../../../../routes";
import PollsServices from "../../PollsServices";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ps = new PollsServices();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PollCard = ({ poll, make_get }) => {
  const clipboard = useClipboard();
  const url =
    "http://" +
    window.location.host +
    reverse(routes.polls.passing.to, { slug: poll.slug });

  const handleMake = useCallback(
    (event) => {
      make_get();
    },
    [make_get]
  );

  const handleReloadCards = (event) => {
    let result = window.confirm("Вы желаете удалить опрос?");
    if (result) {
      ps.deletePoll(poll.id)
        .then((result) => {
          handleMake(event);
        })
        .catch((error) => {
          return false;
        });
    }
  };

  const handleEditCards = (event) => {
    let path = reverse(routes.polls.constructor, { poll: poll.id });
    window.location.replace(path);
  };

  const handleAnalyticsCards = (event) => {
    let path = reverse(routes.polls.analytics, { poll: poll.id });
    window.location.replace(path);
  };

  return (
    <Card sx={{ backgroundColor: " #f8f7f8 " }}>
      <CardMedia
        component="img"
        sx={{ height: { xs: "150px" } }}
        src={`data:image;base64,${poll.base64_image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {poll.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {poll.description}
        </Typography>
      </CardContent>
      <Stack justifyContent="flex-end" direction="row" alignItems="center">
        <IconButton onClick={handleReloadCards}>
          <Delete sx={{ color: pink[500] }} />
        </IconButton>
        <IconButton onClick={handleAnalyticsCards}>
          <Poll />
        </IconButton>
        <IconButton onClick={handleEditCards}>
          <Edit />
        </IconButton>
        {poll.option_is_published && (
          <IconButton
            onClick={() => {
              clipboard.copy(url);
              alert("Ссылка на опрос скопирована");
            }}
          >
            <Reply />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};
export default PollCard;

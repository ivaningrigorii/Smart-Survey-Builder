import { useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import { Grid, IconButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Poll, Reply, Delete, Edit } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import PollsServices from '../../PollsServices';

const ps = new PollsServices();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const PollCard = ({ poll, make_get }) => {

  const handleMake = useCallback(event => {
    make_get();
  }, [make_get, ]);
  

  const handleReloadCards = (event) => {
    let result = window.confirm("Вы желаете удалить опрос?");
    if (result) {
      ps.deletePoll(poll.id)
      .then((result)=>{ handleMake(event) })
      .catch((error)=>{return false})
    }
  }

  return (
    <Item>
      <Card sx={{ minWidth: 275, backgroundColor: ' #f8f7f8 ', }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <b>{poll.name}</b>
          </Typography>
          <Typography sx={{ mb: 1.5, marginTop: '3%', }} color="text.secondary">
            {poll.description}
          </Typography>
        </CardContent>
        <Grid alignItems="center">
          <IconButton onClick={handleReloadCards}><Delete sx={{ color: pink[500] }} /></IconButton>
          <IconButton><Poll /></IconButton>
          <IconButton><Edit /></IconButton>
          {poll.option_is_published &&
            <IconButton><Reply /></IconButton>}
        </Grid>

      </Card>
    </Item>
  );
}
export default PollCard;

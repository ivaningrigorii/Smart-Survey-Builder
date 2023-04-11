import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh'
  }
};
function CreatePollButton() {
  return (
    <div style={styles.center}>      
      <Button  sx={{ my: 2,  display: 'block' }} color="secondary" variant="contained" href="/createPoll" >
        Создать опрос
      </Button>
    </div>
  );
}
export default CreatePollButton;
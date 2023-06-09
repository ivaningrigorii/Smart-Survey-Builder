import React, { useEffect, useState, useRef } from 'react';
import Footer from "../../../../../../components/Footer/Footer";
import Header from "../../../../../../components/Header/Header";
import AuthServices from '../../../../../personal/Auth/AuthServices';
import routes from '../../../../../../routes';
import { Grid, Box, } from '@mui/material';
import { main } from '../../styles';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router';
import PollsServices from '../../PollsServices';
import ShowPolls from './ShowPolls';
import { Typography, } from '@mui/material';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';

const ps = new PollsServices();
const auths = new AuthServices();
const PAGE_SIZE = 6;

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStylesThis = makeStyles({
    grid_style: {
        marginTop: '5%',
    },
    enter: {
        marginTop: '5%',
    }
});


const PollsPage = () => {
    document.title = "Каталог созданные опросы";
    const [pollsOwnList, setPollsOwnList] = useState();
    const [delPoll, setDelPoll] = useState(false);
    const [paginationData, setPagintaionData] = useState({});
    const isChange = useRef(true);

    let { page } = useParams();
    page = page ? page : 1;

    const classes = main();
    const classes_this = useStylesThis();

    const make_get = () => {
        ps.getPollsOwn(page, PAGE_SIZE)
            .then((result) => {
                setPollsOwnList(result.results);
                setPagintaionData({
                    count: result.count,
                    page: page
                });
            })
            .catch((error) => {
                console.log(error);
                alert('Невозможно получить данные!');
            });
    };

    useEffect(() => {
        if (!isChange.current) {
            return;
        } else {
            isChange.current = false;
        }
        make_get();
    }, []);

    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Header />
                <Box>
                    <Grid justifyContent="center" sx={{mt: "15%", }}>
                        <Typography>
                            Созданные опросы
                        </Typography>
                    </Grid>

                    {pollsOwnList &&
                        <ShowPolls pollsOwnList={pollsOwnList} setPollsOwnList={setPollsOwnList}
                            make_get={make_get} pagination_data={paginationData} />
                    } {!pollsOwnList &&
                        <Grid alignItems="center">
                            <Box sx={{ minHeight: '500px', }} />
                        </Grid>
                    }
                    <Box className={classes_this.enter} />
                </Box>
                <Footer />
            </ThemeProvider>

        );
    }
}
export default PollsPage;
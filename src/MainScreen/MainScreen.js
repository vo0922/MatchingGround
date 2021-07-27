import React, { Component } from 'react'
import Navbar from './Navbar'
import NavDrawer from './NavDrawer'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default class MainScreen extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm">
                        <Typography variant = "h6" color = "primary">내 정보</Typography>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}/>
                    </Container>
                </React.Fragment>
            </div>
        )
    }
}

import React from 'react';
import NavBar from "./NavBar"
import Footer from "./Footer";
import CssBaseline from '@material-ui/core/CssBaseline'


function Layout(props){
    return (
        <React.Fragment>
            <CssBaseline />
            <NavBar {...props} />
            <div>
                {props.children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout;
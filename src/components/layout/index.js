import React from 'react'
import Header from '../Header/index.js'
import Sidebar from '../../containers/Home/Sidebar';


const Layout = (props) => {
    return (
        <>
            <Header />
            { props.sidebar ? <Sidebar child ={ props.children } /> : props.children }            
        </>
    )
}

export default Layout;

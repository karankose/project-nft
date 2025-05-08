
import React, { lazy } from "react";
import Sidebar from "../componts/screens/Sidebar";

const Layout = ({children})=>{
    return (
        <>
            <Sidebar>
                {children}
            </Sidebar>
        </>
    )
}

export default Layout;
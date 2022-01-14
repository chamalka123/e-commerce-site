import React from "react";
import "./Head.css";

function Header(){
    return (
        <header>
            <div className="nav-container">
                <div className="nav-brand">Winray</div>
                <div className="nav-item">HOME</div>
                <div className="nav-item">ABOUT</div>
                <div className="nav-item"> CONTACT US</div>
                <div className="nav-item"> MY ACCOUNT</div>
                <div className="nav-item"> ADMIN PANEL</div>
            </div>
        </header>
    );
}

export default Header;
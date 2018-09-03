import React from 'react';
import {logout} from "../../actions/auth";

const LogoutButton = () => {
    const clickHandler = ev => {
        logout();
    };

    return(
        <div>
            <button className="btn btn-lg btn-danger" onClick={clickHandler}>Logout</button>
        </div>
    );
};

export default LogoutButton;
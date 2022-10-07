import React from 'react';
import Navbar from "./navbar";
import { useState } from "react";
import "../CSS/page404.css";
function AvailableScheme() {
    // const [staff, setVerify] = useState();
    const staff = 0;
    return (
        <div>
            {staff ? (
                <div>
                    
                </div>

            ) : (
                <>
                    <Navbar />
                    <h1>AvailableScheme</h1>
                </>
            )}
        </div>
    );
}

export default AvailableScheme;
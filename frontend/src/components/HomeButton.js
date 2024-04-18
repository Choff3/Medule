import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate("/")}><img src="../medule.png" alt="Medule"/></button>
    );
};

export default HomeButton;
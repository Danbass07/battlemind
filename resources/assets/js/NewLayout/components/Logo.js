import React from "react";
import styled from "styled-components";

const Logo = props => {
    const MainWrapper = styled.div`
        width: 160px;
        background-color: ${props.theme.colorOne};
        border: 10px ridge ${props.theme.colorTwo};
        background-image: url(/images/${props.activeGroup}logo.png);
        background-size: cover;
        grid-area: 1 / 1 / 3 / 2; 
    `;
    return ( 
        <MainWrapper
            onClick={() => props.activeGroupChange()}
        />
    )
};

export default Logo;

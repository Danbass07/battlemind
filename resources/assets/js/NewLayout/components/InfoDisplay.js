import React from "react";
import styled from "styled-components";

const InfoDisplay = props => {
    const MainWrapper = styled.div`
        background-color: ${props.theme.colorOne};
        border: 4px ridge ${props.theme.colorTwo};
        color:${props.theme.colorFive};
        grid-area: 1 / 2 / 2 / 6;
        text-align: center;
    `;
    return <MainWrapper>
        HERE WILL DISPLAY ALL YOU NEED TO KNOW
    </MainWrapper>;
};

export default InfoDisplay;

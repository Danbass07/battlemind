import React from "react";
import styled from "styled-components";

const InfoDisplay = props => {
    const MainWrapper = styled.div`
        background-color: ${props.theme.colorOne};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        grid-area: 1 / 2 / 2 / 6;
        text-align: center;
        font-size: 1.7vh;
    `;
    return (
        <MainWrapper>
            Welcom to my gaming group. Do you know those games? If yes rate them
            for me. Add 2 of yours favourite game if you want.
        </MainWrapper>
    );
};

export default InfoDisplay;

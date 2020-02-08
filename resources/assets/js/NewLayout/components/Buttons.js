import React from "react";
import styled from "styled-components";

const Buttons = props => {
    const MainWrapper = styled.div`
        background-color: ${props.theme.colorOne};
        border: 5px ridge ${props.theme.colorTwo};
        grid-area: 2 / 2 / 3 / 6;
        display:flex;
        justify-content: space-around;
    `;
    const Button = styled.div`
        background-color: ${props.theme.colorOne};
        border: 5px solid ${props.theme.colorThree};
        color:${props.theme.colorFive};
        border-radius: 50%;
        height: 70px;
        width 70px;
        text-align: center;
        padding-top: 5%;
    `
    
    return <MainWrapper>
       <Button onClick={() => props.changeTheme(0)}>One</Button>
       <Button onClick={() => props.changeTheme(1)}>Two</Button>
       <Button onClick={() => props.changeTheme(2)}>Three</Button>
    </MainWrapper>;
};

export default Buttons;

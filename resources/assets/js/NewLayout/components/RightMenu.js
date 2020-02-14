import React, { useState }  from "react";
import styled from "styled-components";
import HypeCheck from "./Hype/HypeCheck";

const RightMenu = React.memo(props => {
   
    const MainWrapper = styled.div`
        height: 400px;
        width: 36%;
        background-color: ${props.theme.colorThree};
        border: 4px ridge ${props.theme.colorTwo};
        color:${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        display: flex;
        
    `;
    const Click = styled.div`
    width: 30px;
    height: 100%;
    background-color: ${props.theme.colorFour};
    writing-mode: vertical-rl;
        text-orientation: upright;
    `

    return <MainWrapper
    >     {!props.moved ? (
        <Click
            onClick={() => {
                props.moveSection(-64);
            }}
        >
            Open
        </Click>
    ) : (
        <Click
            onClick={() => {
                props.moveSection(-32);
            }}
        >
            Close
        </Click>
    )}
        <HypeCheck
        setUpVote={(votingList) => props.setUpVote(votingList)}
        user={props.user}
        group={props.group} />
    </MainWrapper>;
});

export default RightMenu;

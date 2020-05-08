import React, { useState } from "react";
import styled from "styled-components";
import HypeVote from "./Hype/HypeVote";

const LeftMenu = React.memo(props => {
    const MainWrapper = styled.div`
        width: 36%;
        background-color: ${props.theme.colorThree};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        display: flex;
    `;

    const Click = styled.div`
        width: 35px;
        height: 100%;
        background-color: ${props.theme.colorFour};
        margin-left: auto;
        writing-mode: vertical-rl;
        text-orientation: upright;
        border: 4px ridge ${props.theme.colorTwo};
    `;

    return (
        <MainWrapper>
            <HypeVote
                middleSectionMoveValue={props.middleSectionMoveValue}
                group={props.group}
                userId={props.userId}
            />

            {!props.moved ? (
                <Click
                    onClick={() => {
                        props.moveSection(-1);
                    }}
                >
                    Open
                </Click>
            ) : (
                <Click
                    onClick={() => {
                        props.moveSection(-33);
                    }}
                >
                    Close
                </Click>
            )}
        </MainWrapper>
    );
});

export default LeftMenu;

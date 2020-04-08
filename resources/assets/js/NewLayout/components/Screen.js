import React, { useState, useMemo } from "react";
import styled from "styled-components";
import HypeSet from "./Hype/HypeSet";

const Screen = React.memo(props => {
    const MainWrapper = styled.div`
        height: 400px;
        width: 30%;
        background-color: ${props.theme.colorOne};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        overflow-y: scroll;
    `;
    const Demo = styled.button`
        height: 40px;
        width: 60%;
    `;
    return (
        <MainWrapper>
            {props.activeGroup.id ? (
                <HypeSet
                    addType={(e, value) => props.addType(e, value)}
                    group={props.group}
                    user={props.userData.user}
                    activeGroup={props.activeGroup}
                    hypeLevels={[1, 2, 3, 4, 5]}
                    hypeLevelHandler={(e, typeId) =>
                        props.hypeLevelHandler(e, typeId)
                    }
                    theme={props.theme}
                />
            ) : (
                <React.Fragment>
                    <Demo onClick={() => props.demo()}>DEMO</Demo>
                    <form>
                        <input></input>
                    </form>
                </React.Fragment>
                
            )}
        </MainWrapper>
    );
});

export default Screen;

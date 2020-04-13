import React, { useState, useMemo } from "react";
import styled from "styled-components";
import HypeSet from "./Hype/HypeSet";
import Form from "./Form";

const Screen = React.memo(props => {
    let [value, newValue] = useState({
        value: ""
    });
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
                <React.Fragment>
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
                    <Form
                        theme={props.theme}
                        title="Add Game"
                        submitControll={(e, value) => {
                            props.addType(e, value);
                        }}
                    />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Demo onClick={() => props.demo()}>DEMO GROUP</Demo>
                </React.Fragment>
            )}

            {
                <Form
                    theme={props.theme}
                    title="Enter Club Code"
                    submitControll={(e, value) => {
                        e.preventDefault();
                        console.log(value);
                    }}
                />
            }
        </MainWrapper>
    );
});

export default Screen;

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import HypeSet from "./Hype/HypeSet";
import Form from "./Form";

const Screen = React.memo(props => {
    let [value, newValue] = useState({
        value: ""
    });
    const MainWrapper = styled.div`
        width: 29%;
        height: 100%;
        background-color: ${props.theme.colorOne};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
    `;
    const Demo = styled.button`
        height: 40px;
        width: 60%;
    `;

    return (
        <MainWrapper>
            {props.activeGroup.id ? (
                <HypeSet
                    group={props.group}
                    data={props.userData}
                    activeGroup={props.activeGroup}
                    hypeLevels={[1, 2, 3, 4, 5]}
                    hypeLevelHandler={(e, typeId) =>
                        props.hypeLevelHandler(e, typeId)
                    }
                    theme={props.theme}
                    addType={(e, value, category) =>
                        props.addType(e, value, category)
                    }
                    detailsController={() => props.detailsController()}
                    selectTypeToEdit={type => props.selectTypeToEdit(type)}
                />
            ) : (
                <React.Fragment>
                    <Demo onClick={() => props.demo()}>DEMO GROUP</Demo>
                    <Form
                        theme={props.theme}
                        title="Enter Club Code"
                        submitControll={(e, value) => {
                            e.preventDefault();
                            console.log("controller needs doing");
                        }}
                    />
                </React.Fragment>
            )}
        </MainWrapper>
    );
});

export default Screen;

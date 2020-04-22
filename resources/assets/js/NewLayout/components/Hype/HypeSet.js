import React, { useState } from "react";
import styled from "styled-components";
import Form from "../Form";

const MainWrapper = styled.div`
    width: 100%;
`;

const HypeWrapper = styled.div`
    position: relative;
    margin: auto auto;
    font-size: 26px;
    overflow-y: scroll;
    height: 332px;
    width: 108%;
`;

const HypeSetRow = styled.div`
    display: flex;
`;
const HypeRowElement = styled.div`
    word-wrap: break-word;
`;

const Select = styled.select`
    border-radius: 50%;
    height: 38px;
    margin: 5px 24px;
    padding-left: 12px;
`;
const TypeOptions = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Option = styled.option``;

const HypeSet = React.memo(props => {
    const Button = styled.button`
        width: 100%;
        background-color: ${props.theme.colorFour};
    `;
    const styleHypeSetRow = {
        borderBottom: "1px solid" + props.theme.colorTwo
    };

    const styleHypeRowElement = {
        color: props.theme.colorTwo
    };

    const styleSelect = {
        backgroundColor: props.theme.colorOne,
        border: " 2px dotted+" + props.theme.colorTwo,
        color: props.theme.colorTwo
    };

    const styleHypeRowElementOne = {
        width: "279px",
        fontSize: "20px",
        padding: "8px 0px 5px 0px"
    };

    const displayTypeRating = (type, index) => {
        const details = JSON.parse(type.details);

        if (details.category === props.data.details)
            return (
                <HypeSetRow style={styleHypeSetRow} key={type.type + index}>
                    <HypeRowElement
                        style={styleHypeRowElementOne}
                        onClick={() => props.selectTypeToEdit(index)}
                    >
                        {type.type}
                    </HypeRowElement>

                    <HypeRowElement style={styleHypeRowElement}>
                        <Select
                            style={styleSelect}
                            onChange={e => props.hypeLevelHandler(e, type.id)}
                        >
                            <Option
                                key={"default" + type.type}
                                defaultValue={type.pivot.hype}
                            >
                                {type.pivot.hype}
                            </Option>
                            )
                            {props.hypeLevels.map((level, index) => {
                                return (
                                    <Option
                                        key={type.type + index}
                                        value={level}
                                    >
                                        {level}
                                    </Option>
                                );
                            })}
                        </Select>
                    </HypeRowElement>
                </HypeSetRow>
            );
    };

    const mapUsers = () => {
        return props.group.users.map(user => {
            return user.types.map((type, index) => {
                if (
                    type.group_id === props.activeGroup.id &&
                    type.pivot.user_id === props.data.user.id
                ) {
                    return displayTypeRating(type, index);
                }
            });
        });
    };

    return (
        <MainWrapper>
            <TypeOptions>
                <Button onClick={() => props.detailsController()}>
                    {props.data.details} Games
                </Button>
            </TypeOptions>
            <HypeWrapper>
                {Array.isArray(props.group.users) ? mapUsers() : null}
            </HypeWrapper>
            <Form
                theme={props.theme}
                title="Add Game"
                submitControll={(e, value) => {
                    props.addType(e, value);
                }}
            />
        </MainWrapper>
    );
});

export default React.memo(HypeSet);

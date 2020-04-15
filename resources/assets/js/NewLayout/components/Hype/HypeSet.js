import React, { useState } from "react";
import styled from "styled-components";
import Form from "../Form";

const MainWrapper = styled.div`
    width: 100%;
`;

const HypeWrapper = styled.div`
    position: relative;
    margin: auto auto;
    margin-bottom: 10px;
    font-size: 26px;
    overflow-y: scroll;
    height: 250px;
    width: 108%;
`;

const HypeSetRow = styled.div`
    display: flex;
`;
const HypeRowElement = styled.div`
    margin-right: 5px;
    margin-left: auto;
    padding-left: 16px;
    word-wrap: break-word;
`;

const Select = styled.select`
    border-radius: 50%;
    height: 38px;
    margin: 5px 13px;
    padding-left: 12px;
`;
const TypeOptions = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Button = styled.button`
    width: 50%;
`;
const Option = styled.option``;

const HypeSet = React.memo(props => {
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
        return (
            <HypeSetRow style={styleHypeSetRow} key={type.type + index}>
                <HypeRowElement style={styleHypeRowElementOne}>
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
                                <Option key={type.type + index} value={level}>
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
                    type.pivot.user_id === props.user.id
                ) {
                    return displayTypeRating(type, index);
                }
            });
        });
    };

    return (
        <MainWrapper>
            <TypeOptions>
                <Button>Main Games</Button>
                <Button>Small Games</Button>
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

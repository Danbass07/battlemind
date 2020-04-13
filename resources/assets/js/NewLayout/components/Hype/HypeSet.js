import React, { useState } from "react";
import styled from "styled-components";

const HypeSet = React.memo(props => {
    const MainWrapper = styled.div`
        width: 99%;
    `;
    const Button = styled.button``;
    const HypeWrapper = styled.div`
        margin: auto auto;
        margin-bottom: 10px;
        font-size: 26px;
    `;
    const HypeList = styled.div`
        margin-top: 20px;
        margin-bottom: 10px;
    `;
    const HypeSetRow = styled.div`
        display: flex;
        border-bottom: 1px solid ${props.theme.colorTwo};
    `;
    const HypeRowElement = styled.div`
        margin-left: auto;
        color: ${props.theme.colorTwo};
        padding-left: 16px;
    `;
    const Select = styled.select`
        background-color: ${props.theme.colorOne};
        border: 2px dotted ${props.theme.colorTwo};
        border-radius: 50%;
        height: 38px;
        margin: 5px 5px;
        color: ${props.theme.colorTwo};
        padding-left: 12px;
    `;
    const Option = styled.option``;

    const displayTypeRating = (type, index) => {
        return (
            <HypeSetRow key={type.type + index}>
                <HypeRowElement>{type.type}</HypeRowElement>

                <HypeRowElement>
                    <Select onChange={e => props.hypeLevelHandler(e, type.id)}>
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
            <HypeWrapper>
                <HypeList>
                    {Array.isArray(props.group.users) ? mapUsers() : null}
                </HypeList>
            </HypeWrapper>
        </MainWrapper>
    );
});

export default React.memo(HypeSet);

import React, { useState } from "react";
import styled from "styled-components";
import TypeEdit from "./TypeEdit";

const BottomMenu = React.memo(props => {
    let [setComponentStatus, newComponentStatus] = useState(true);
    const MainWrapper = styled.div`
        height: 400px;
        width: 100%;
        background-color: ${props.theme.colorThree};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        transform: ${!setComponentStatus
            ? "translateY(-100%);"
            : "translateY(0);"};
    `;
    const Switch = styled.div`
        height: 30px;
        width: 100%;
        padding-top: 3px;
        background-color: ${props.theme.colorFive};
        color: ${props.theme.colorThree};
        margin-bottom: 15px;
    `;
    const RemoveType = styled.button``;

    const GroupUsers = styled.div`
        display: flex;
        background-color: ${props.theme.colorFive};
        color: ${props.theme.colorThree};
    `;
    return (
        <MainWrapper>
            {props.position === -33 ? (
                <React.Fragment>
                    <Switch
                        onClick={() => newComponentStatus(!setComponentStatus)}
                    >
                        {setComponentStatus
                            ? props.data.typeSelescted.type + " Open"
                            : "Close"}
                    </Switch>
                    <TypeEdit
                        refreshData={() => props.refreshData()}
                        data={props.data.typeSelescted}
                        theme={props.theme}
                    />
                    <RemoveType
                        onClick={() => {
                            console.log(props.data);
                            props.removeType(props.data.typeSelescted.id);
                        }}
                    >
                        Remove Game
                    </RemoveType>
                </React.Fragment>
            ) : null}
            {props.position === -64 ? (
                <React.Fragment>
                    <Switch
                        onClick={() => newComponentStatus(!setComponentStatus)}
                    >
                        {setComponentStatus ? "Meeting Settings Open" : "Close"}
                    </Switch>
                    {props.data.user.groups[
                        props.data.activeGroupIndex
                    ].users.map(user => {
                        return (
                            <GroupUsers key={user.id}>
                                <div>{user.name}</div>
                                <input
                                    onChange={() =>
                                        props.activeUser(
                                            props.data.user.groups[
                                                props.data.activeGroupIndex
                                            ].id,
                                            user.id
                                        )
                                    }
                                    defaultChecked={
                                        user.pivot.active ? true : false
                                    }
                                    type="checkbox"
                                    name="group"
                                    value={user.id}
                                />
                            </GroupUsers>
                        );
                    })}
                </React.Fragment>
            ) : null}
        </MainWrapper>
    );
});

export default BottomMenu;

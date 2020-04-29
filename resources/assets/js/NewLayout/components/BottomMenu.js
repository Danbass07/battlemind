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
    `;
    const RemoveType = styled.button``;

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
                    <RemoveType onClick={() => props.removeType(props.data.id)}>
                        Remove Game
                    </RemoveType>
                </React.Fragment>
            ) : null}
            {props.position === -64 ? (
                <React.Fragment>
                    {console.log(props.data)}
                    <Switch
                        onClick={() => newComponentStatus(!setComponentStatus)}
                    >
                        {setComponentStatus ? "Meeting Settings Open" : "Close"}
                    </Switch>
                </React.Fragment>
            ) : null}
        </MainWrapper>
    );
});

export default BottomMenu;

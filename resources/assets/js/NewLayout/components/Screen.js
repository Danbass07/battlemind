import React, { useState } from "react";
import styled from "styled-components";
import HypeSet from "./HypeSet";

const Screen = React.memo(props => {
    const MainWrapper = styled.div`
        height: 400px;
        width: 30%;
        background-color: ${props.theme.colorOne};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        overflow-y:scroll;
      
    `;
   
    return (
        
        <MainWrapper >
        <HypeSet
            group={props.group}
            user={props.userData.user}
            activeGroup={props.activeGroup}
            hypeLevels={[1,2,3,4,5]} 
            hypeLevelHandler={(e, typeId) =>props.hypeLevelHandler(e, typeId)}
            theme={props.theme}
        />
        </MainWrapper>
    );
   
});

export default Screen;

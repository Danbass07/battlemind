import React, { useState }  from "react";
import styled from "styled-components";

const BottomMenu = React.memo(props => {
    let [setComponentStatus, newComponentStatus] = useState(true)
    const MainWrapper = styled.div`
        height: 400px;
        width: 100%;
        background-color: ${props.theme.colorThree};
        border: 4px ridge ${props.theme.colorTwo};
        color:${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        transform: ${!setComponentStatus ? 'translateY(-100%);' : 'translateY(0);'}
    `;
    const Switch = styled.div`
    height: 30px;
    width: 100%;
    padding-top: 3px;
    background-color: ${props.theme.colorFive};
    color: ${props.theme.colorThree};
    `;
    return <MainWrapper>
      <Switch  onClick={() => newComponentStatus(!setComponentStatus)}> 
      {setComponentStatus ? "Open" : "Close"}
        </Switch>
    </MainWrapper>;
});

export default BottomMenu;

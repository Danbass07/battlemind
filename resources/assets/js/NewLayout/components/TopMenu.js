import React, { useState }  from "react";
import styled from "styled-components";

const TopMenu = React.memo(props => {
    let [setComponentStatus, newComponentStatus] = useState({
        active: true, 
    })
    const MainWrapper = styled.div`
        height: 400px;
        width: 100%;
        background-color: ${props.theme.colorThree};
        border: 4px ridge ${props.theme.colorTwo};
        color:${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        position:relative;
        top: -380px;
        margin-bottom: -380px;
        text-align: bottom;
        transform: ${!setComponentStatus ? 'translateY(100%);' : 'translateY(0);'}
    `;
    return <MainWrapper
    onClick={() => newComponentStatus(!setComponentStatus)}>
       TopMenu
    </MainWrapper>;
});

export default TopMenu;

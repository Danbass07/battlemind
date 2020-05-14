import React, { useState } from "react";
import styled from "styled-components";

const TopMenu = React.memo(props => {
    let [setComponentStatus, newComponentStatus] = useState({
        active: true
    });
    let [name, newName] = useState({
        name: props.user.name
    });
    let [theme, newTheme] = useState({
        theme: ""
    });
    const MainWrapper = styled.div`
        height: 400px;
        width: 100%;
        background-color: ${props.theme.colorThree};
        border: 4px ridge ${props.theme.colorTwo};
        color: ${props.theme.colorFive};
        margin: auto auto;
        text-align: center;
        position: relative;
        top: -380px;
        margin-bottom: -380px;
        text-align: bottom;
        transform: ${!setComponentStatus
            ? "translateY(100%);"
            : "translateY(0);"};
    `;
    let Input = styled.input`
        margin-left: auto;
        background-color: props.theme.colorOne;
    `;
    let Label = styled.label`
        display: flex;
        margin-left: auto;
    `;
    const style = {
        backgroundColor: props.theme.colorOne,
        width: "58%",
        color: props.theme.colorTwo,
        border: "1px solid " + props.theme.colorThree
    };
    const style2 = {
        display: "flex",
        justifyContent: "space-between"
    };
    return (
        <MainWrapper onClick={() => newComponentStatus(!setComponentStatus)}>
            TopMenu
            {console.log(props.user)}
            <form
                style={style2}
                onSubmit={e => {
                    e.preventDefault();
                    console.log("submit");
                }}
            >
                <Label>Name :</Label>
                <Input
                    style={style}
                    type="text"
                    name="game"
                    value={name.name}
                    onChange={e => {
                        const InputValue = e.target.value;
                        newName({
                            value: InputValue
                        });
                    }}
                />
                <Label>Theme :</Label>
                <Input
                    style={style}
                    type="text"
                    name="game"
                    value={theme.thmem}
                    onChange={e => {
                        const InputValue = e.target.value;
                        newTheme({
                            theme: InputValue
                        });
                    }}
                />

                <Input type="submit" value="Submit" />
            </form>
        </MainWrapper>
    );
});

export default TopMenu;

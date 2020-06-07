import React, { useState } from "react";
import styled from "styled-components";

let Input = styled.input`
    margin-left: auto;
`;
let Label = styled.label`
    display: flex;
    margin-left: auto;
`;
const MainWrapper = styled.div`
    height: 185px;
    width: 100%;
    margin: auto auto;
    text-align: center;
    position: relative;
    top: -160px;
    margin-bottom: -160px;

    text-align: bottom;
`;
const Select = styled.select``;
const Option = styled.option``;
const TopMenu = React.memo(props => {
    let [setComponentStatus, newComponentStatus] = useState({
        active: true
    });
    let [name, newName] = useState({
        name: props.user.name
    });
    let [theme, newTheme] = useState({
        theme: 0
    });

    let Button = styled.button`
        margin-top: 73px;
        width: 100%;
        height: 27px;
        background-color: ${props.theme.colorOne};
        color: ${props.theme.colorTwo};
        z-index: 4;
    `;

    const styleMainWrapper = {
        backgroundColor: props.theme.colorThree,
        color: props.theme.colorTwo,
        border: "4px ridge " + props.theme.colorTwo,
        transform: !setComponentStatus ? "translateY(100%)" : "translateY(0)"
    };

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
        <MainWrapper style={styleMainWrapper}>
            TopMenu
            <form
                style={style2}
                onSubmit={e => {
                    e.preventDefault();
                    props.refreshData();
                    axios.put(`/users/${props.user.id}`, {
                        name: name.name,
                        theme: theme.theme
                    });
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
                            name: InputValue
                        });
                    }}
                />
                <Label>Theme :</Label>

                <Select
                    onChange={e => {
                        const InputValue = e.target.value;
                        newTheme({
                            theme: InputValue
                        });
                    }}
                >
                    <Option value={0}>Rakdos</Option>
                    <Option value={1}>Azorius</Option>
                    <Option value={2}>Simic</Option>
                </Select>

                <Input
                    type="submit"
                    value="Submit"
                    onClick={props.refreshData}
                />
            </form>
            <Button onClick={() => newComponentStatus(!setComponentStatus)}>
                PROFILE
            </Button>
        </MainWrapper>
    );
});

export default TopMenu;

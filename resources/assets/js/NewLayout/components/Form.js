import React, { useState } from "react";
import styled from "styled-components";

const MainWrapper = styled.div``;
let Input = styled.input`
    margin-left: auto;
`;
let Label = styled.label`
    display: flex;
    margin-left: auto;
`;
const Form = React.memo(props => {
    let [value, newValue] = useState({
        value: ""
    });
    const style = {
        backgroundColor: props.theme.colorOne,
        width: "100%"
    };
    const style2 = {
        display: "flex",
        justifyContent: "space-between"
    };
    return (
        <MainWrapper>
            <form
                style={style2}
                onSubmit={e => {
                    props.submitControll(e, value.value);
                }}
            >
                <Label>{props.title} :</Label>
                <Input
                    style={style}
                    type="text"
                    name="game"
                    value={value.value}
                    onChange={e => {
                        const InputValue = e.target.value;
                        newValue({
                            value: InputValue
                        });
                    }}
                />

                <Input type="submit" value="Submit" />
            </form>
        </MainWrapper>
    );
});

export default Form;

import React, { useState }  from "react";
import styled from "styled-components";

const MainWrapper = styled.div`

`;
const Form = React.memo(props => {
    let [value, newValue] = useState({
        value: ""
    });
  
    return <MainWrapper>
            <form onSubmit={e =>{props.submitControll(e, value.value)}}>
                <label>
                    {props.title} :
                    <input
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
                </label>
                <input type="submit" value="Submit" />
            </form>

    </MainWrapper>;
});

export default Form;

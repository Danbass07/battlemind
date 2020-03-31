import React, { useState } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
    width: 99%;
`;
const Button = styled.button``;
const HypeWrapper = styled.div`
    margin: auto auto;
    margin-bottom: 200px;
    font-size: 26px;
`;
const HypeList = styled.div`
    margin-top: 20px;
    margin-bottom: 200px;
`;
const HypeSet = React.memo(props => {
    let [value, newValue] = useState({
        value: ""
    });

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
    // const addType = e => {
    //     e.preventDefault();
    //     console.log("tr");
    // };
    return (
        <React.Fragment>
            <React.Fragment></React.Fragment>
            <MainWrapper>
                {/* <Button onClick={() => this.props.hypenotizer()}>
                CLICK HERE TO SAVE
            </Button> */}

                <HypeWrapper>
                    {props.activeGroup.id === 3 ? (
                        <form onSubmit={e => props.addType(e, value)}>
                            <label>
                                Game:
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
                    ) : null}
                    <HypeList>
                        {Array.isArray(props.group.users)
                            ? props.group.users.map(user => {
                                  return user.types.map(type => {
                                      if (
                                          type.group_id ===
                                              props.activeGroup.id &&
                                          type.pivot.user_id === props.user.id
                                      ) {
                                          return (
                                              <HypeSetRow key={type.type}>
                                                  <HypeRowElement>
                                                      {type.type}
                                                  </HypeRowElement>

                                                  <HypeRowElement>
                                                      <Select
                                                          onChange={e =>
                                                              props.hypeLevelHandler(
                                                                  e,
                                                                  type.id
                                                              )
                                                          }
                                                      >
                                                          <Option
                                                              key={
                                                                  "default" +
                                                                  type.type
                                                              }
                                                              defaultValue={
                                                                  type.pivot
                                                                      .hype
                                                              }
                                                          >
                                                              {type.pivot.hype}
                                                          </Option>
                                                          )
                                                          {props.hypeLevels.map(
                                                              (
                                                                  level,
                                                                  index
                                                              ) => {
                                                                  return (
                                                                      <Option
                                                                          key={
                                                                              type.type +
                                                                              index
                                                                          }
                                                                          value={
                                                                              level
                                                                          }
                                                                      >
                                                                          {
                                                                              level
                                                                          }
                                                                      </Option>
                                                                  );
                                                              }
                                                          )}
                                                      </Select>
                                                  </HypeRowElement>
                                              </HypeSetRow>
                                          );
                                      }
                                  });
                              })
                            : null}
                    </HypeList>
                </HypeWrapper>
            </MainWrapper>
        </React.Fragment>
    );
});

export default React.memo(HypeSet);

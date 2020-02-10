import React, { useState }  from "react";
import styled from "styled-components";

const HypeSet = React.memo(props => {
    let [setComponentStatus, newComponentStatus] = useState({
        active: true, 
    })
    console.log(props);
    const MainWrapper = styled.div`
   
    `;
    return <MainWrapper>
                  <button
                    className="mega-button"
                    onClick={() => this.props.hypenotizer()}
                >
                    CLICK HERE TO SAVE
                </button>
                <div className="hype-wrapper">
                    <div className={"hype-list"}>
                    {Array.isArray(props.group.users)
                        ? props.group.users.map(user => {

                                return user.types.map(type => {

                                    if (type.group_id === props.activeGroup && type.pivot.user_id === props.user.id) {

                                        return (
                                            <div className="hype-set-row" key={type.type}>
                                                <div className="hype-row-element">
                                                    {type.type}
                                                </div>
                                                <div className="hype-row-element">
                                                    <select
                                                    className={'hype-options'}
                                                        onChange={e =>
                                                            this.props.hypeLevelHandler(
                                                                e,
                                                                type.id
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            key={
                                                                "default" + type.type
                                                            }
                                                            defaultValue={type.pivot.hype}
                                                        >
                                                            {type.pivot.hype}
                                                        </option>
                                                        )
                                                {props.hypeLevels.map(
                                                            (level, index) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            type.type +
                                                                            index
                                                                        }
                                                                        value={level}
                                                                    >
                                                                        {level}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        );
                                    }

                                })
                            })

                        : null}
                        </div>
                </div>
    </MainWrapper>;
});

export default HypeSet;

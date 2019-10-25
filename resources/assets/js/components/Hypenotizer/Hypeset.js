import React, { Component } from "react";

class Hypeset extends Component {
    render() {
console.log(this.props.group);
        return (
            <React.Fragment>
                <button
                    className="hype-button"
                    onClick={() => this.props.hypenotizer()}
                >
                    CLICK HERE TO SAVE
                </button>
                <div className="hype-wrapper">
                    {Array.isArray(this.props.group.users)
                        ? this.props.group.users.map(user => {

                                return user.types.map(type => {
                             
                                    if (type.group_id === this.props.activeGroup && type.pivot.user_id === this.props.user.id) {

                                        return (
                                            <div className="hype-row" key={type.type}>
                                                <div className="hype-row-element">
                                                    {type.type}
                                                </div>
                                                <div className="hype-row-element">
                                                    <select
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
                                                {this.props.hypeLevels.map(
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
            </React.Fragment>
        );
    }
}
export default Hypeset;

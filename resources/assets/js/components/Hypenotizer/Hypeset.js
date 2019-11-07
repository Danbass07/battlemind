import React, { Component } from "react";

class Hypeset extends Component {
    render() {
        console.log(this.props.group);
        return (
            // <React.Fragment>
            //     <button
            //         className="mega-button"
            //         onClick={() => this.props.hypenotizer()}
            //     >
            //         CLICK HERE TO SAVE
            //     </button>
            //     <div className="hype-wrapper">
            //         <div className={"hype-list"}>
            //             {Array.isArray(this.props.group.types)
            //                 ? this.props.group.types.map(type => {
            //                       if (
            //                           type.group_id === this.props.activeGroup
            //                       ) {
            //                           return (
            //                               <div
            //                                   className="hype-set-row"
            //                                   key={type.type}
            //                               >
            //                                   <div className="hype-row-element">
            //                                       {type.type}
            //                                   </div>
            //                                   <div className="hype-row-element">
            //                                       <select
            //                                           className={"hype-options"}
            //                                           onChange={e =>
            //                                               this.props.hypeLevelHandler(
            //                                                   e,
            //                                                   type.id
            //                                               )
            //                                           }
            //                                       >
            //                                           {this.props.group.users.map(user => {
                                                          
            //                                               if (
            //                                                   user.id ===
            //                                                   this.props.user.id
            //                                               ) {
            //                                                 return  user.types.map( userType => {
            //                                                       if (userType.id === type.id) {
                                                              
            //                                                      return (
            //                                                         <option
            //                                                         key={
            //                                                             "default" +
            //                                                             userType.type
            //                                                         }
            //                                                         defaultValue={
            //                                                             userType.pivot.hype
            //                                                         }
            //                                                     >
            //                                                         {
            //                                                             userType.pivot.hype
            //                                                         }
            //                                                     </option>
            //                                                      )
                                                                       
            //                                                         ;
            //                                                       }
            //                                                   })
                                                            
            //                                               }
            //                                           })}

            //                                           {this.props.hypeLevels.map(
            //                                               (level, index) => {
            //                                                   return (
            //                                                       <option
            //                                                           key={
            //                                                               type.type +
            //                                                               index
            //                                                           }
            //                                                           value={
            //                                                               level
            //                                                           }
            //                                                       >
            //                                                           {level}
            //                                                       </option>
            //                                                   );
            //                                               }
            //                                           )}
            //                                       </select>
            //                                   </div>
            //                               </div>
            //                           );
            //                       }
            //                   })
            //                 : null}
            //         </div>
            //     </div>
            // </React.Fragment>
            <React.Fragment>
                <button
                    className="mega-button"
                    onClick={() => this.props.hypenotizer()}
                >
                    CLICK HERE TO SAVE
                </button>
                <div className="hype-wrapper">
                    <div className={"hype-list"}>
                    {Array.isArray(this.props.group.users)
                        ? this.props.group.users.map(user => {

                                return user.types.map(type => {

                                    if (type.group_id === this.props.activeGroup && type.pivot.user_id === this.props.user.id) {

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
                </div>
            </React.Fragment>
        );
    }
}
export default Hypeset;

import React, { Component } from "react";
import styled from "styled-components";
import Logo from "./components/Logo";
import InfoDisplay from "./components/InfoDisplay";
import Buttons from "./components/Buttons";
import Screen from "./components/Screen";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import TopMenu from "./components/TopMenu";
import BottomMenu from "./components/BottomMenu";

class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            middleSectionMoveValue: -33,
            moved: false,
            theme: [
                {
                    colorOne: "#000000",
                    colorTwo: "#C7493A",
                    colorThree: "#A33327",
                    colorFour: "#917164",
                    colorFive: "#AD8174"
                },
                {
                    colorOne: "#7395AE",
                    colorTwo: "#5D5C61",
                    colorThree: "#938E94",
                    colorFour: "#B0A295",
                    colorFive: "#FFFFFF"
                },
                {
                    colorOne: "#7395AE",
                    colorTwo: "#5D5C61",
                    colorThree: "#938E94",
                    colorFour: "#B0A295",
                    colorFive: "#FFFFFF"
                }
            ]
        };
    }
    componentDidMount() {}

    moveSection(moveValue, modifier = true) {
        let moved = this.state.moved;
        if (modifier === false) {
            moved = !moved;
        }
        this.setState({
            middleSectionMoveValue: moveValue,
            moved: !moved
        });
    }

    render() {
        const MainWrapper = styled.div`
            height: 100%;
            width: 99%;
            background-color: black;
            min-width: 405px;
            overflow: hidden;
        `;

        const TopSection = styled.div`
            height: 182px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;
        `;
        const MiddleSection = styled.div`
            height: 385px;
            width: 290%;
            position: relative;
            display: flex;
            flex-direction: row;
            transform: translateX(${this.state.middleSectionMoveValue}%);
        `;

        // console.log(this.props.data);
        return (
            <MainWrapper>
                <TopMenu
                    theme={this.state.theme[this.props.data.user.theme]}
                    user={this.props.data.user}
                    refreshData={() => this.props.refreshData()}
                />

                <TopSection>
                    <Logo
                        theme={this.state.theme[this.props.data.user.theme]}
                        activeGroup={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ].id
                        }
                        activeGroupChange={this.props.activeGroupChange}
                    />

                    <InfoDisplay
                        theme={this.state.theme[this.props.data.user.theme]}
                    />
                    <Buttons
                        theme={this.state.theme[this.props.data.user.theme]}
                        changeTheme={themeNumber =>
                            this.props.changeTheme(themeNumber)
                        }
                    />
                </TopSection>

                <MiddleSection>
                    <LeftMenu
                        group={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ]
                        }
                        userId={this.props.data.user.id}
                        groupIndex={this.props.data.activeGroupIndex}
                        moved={this.state.moved}
                        moveSection={moveValue => this.moveSection(moveValue)}
                        theme={this.state.theme[this.props.data.user.theme]}
                        middleSectionMoveValue={
                            this.state.middleSectionMoveValue
                        }
                    />

                    <Screen
                        addType={(e, value, category) => {
                            this.props.addType(e, value, category);
                        }}
                        hypeLevelHandler={(e, typeId) =>
                            this.props.hypeLevelHandler(e, typeId)
                        }
                        activeGroup={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ]
                        }
                        theme={this.state.theme[this.props.data.user.theme]}
                        userData={this.props.data}
                        group={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ]
                        }
                        demo={() => this.props.demo()}
                        detailsController={() => this.props.detailsController()}
                        selectTypeToEdit={type =>
                            this.props.selectTypeToEdit(type)
                        }
                    />

                    <RightMenu
                        user={this.props.data}
                        group={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ]
                        }
                        moved={this.state.moved}
                        moveSection={moveValue => this.moveSection(moveValue)}
                        theme={this.state.theme[this.props.data.user.theme]}
                    />
                </MiddleSection>

                <BottomMenu
                    position={this.state.middleSectionMoveValue}
                    theme={this.state.theme[this.props.data.user.theme]}
                    data={this.props.data}
                    refreshData={() => this.props.refreshData()}
                    removeType={id => this.props.removeType(id)}
                    activeUser={(groupId, userId) =>
                        this.props.activeUser(groupId, userId)
                    }
                />
            </MainWrapper>
        );
    }
}

export default AppBody;

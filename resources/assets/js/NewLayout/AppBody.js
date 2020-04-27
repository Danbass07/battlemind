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
            middleSectionMoveValue: -32,
            moved: false,
            themeActive: 0,
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

    moveSection(moveValue) {
        this.setState({
            middleSectionMoveValue: moveValue,
            moved: !this.state.moved
        });
    }

    changeTheme(themeNumber) {
        this.setState({
            themeActive: themeNumber
        });
    }

    render() {
        const MainWrapper = styled.div`
            height: 100%;
            width: 100%;
            background-color: black;
            min-width: 425px;
            overflow: hidden;
        `;

        const TopSection = styled.div`
            height: 160px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;
        `;
        const MiddleSection = styled.div`
            height: 80%;
            width: 280%;
            position: relative;
            display: flex;
            flex-direction: row;
            transform: translateX(${this.state.middleSectionMoveValue}%);
        `;

        return (
            <MainWrapper>
                <div>
                    <TopMenu theme={this.state.theme[this.state.themeActive]} />
                </div>

                <TopSection>
                    <Logo
                        theme={this.state.theme[this.state.themeActive]}
                        activeGroup={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ].id
                        }
                        activeGroupChange={this.props.activeGroupChange}
                    />

                    <InfoDisplay
                        theme={this.state.theme[this.state.themeActive]}
                    />
                    <Buttons
                        theme={this.state.theme[this.state.themeActive]}
                        changeTheme={themeNumber =>
                            this.changeTheme(themeNumber)
                        }
                    />
                </TopSection>

                <MiddleSection>
                    <LeftMenu
                        groupIndex={this.props.data.activeGroupIndex}
                        moved={this.state.moved}
                        moveSection={moveValue => this.moveSection(moveValue)}
                        theme={this.state.theme[this.state.themeActive]}
                    />

                    <Screen
                        addType={(e, value) => this.props.addType(e, value)}
                        hypeLevelHandler={(e, typeId) =>
                            this.props.hypeLevelHandler(e, typeId)
                        }
                        activeGroup={
                            this.props.data.user.groups[
                                this.props.data.activeGroupIndex
                            ]
                        }
                        theme={this.state.theme[this.state.themeActive]}
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
                        theme={this.state.theme[this.state.themeActive]}
                    />
                </MiddleSection>

                <BottomMenu
                    theme={this.state.theme[this.state.themeActive]}
                    data={this.props.data.typeSelescted}
                    refreshData={() => this.props.refreshData()}
                />
            </MainWrapper>
        );
    }
}

export default AppBody;

import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div``;
const TypeEditForm = styled.form``;
const Option = styled.option``;
const Select = styled.select`
    border-radius: 50%;
    height: 38px;
    margin: 5px 24px;
    padding-left: 12px;
`;
let Label = styled.label`
    display: flex;
    margin-left: auto;
`;
let Input = styled.input`
    margin-left: auto;
`;
class TypeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            type: "",
            minPlayers: 0,
            maxPlayers: 1,
            category: "small",
            lastTimePlayed: "00-00-0000",
            timesPlayed: 0
        };
    }
    componentDidMount() {
        if (this.props.data && this.props.data.details) {
            const details = JSON.parse(this.props.data.details);
            this.setState({
                id: this.props.data.id,
                type: this.props.data.type,
                minPlayers: details.minPlayers,
                maxPlayers: details.maxPlayers,
                category: details.category,
                lastTimePlayed: details.lastTimePlayed,
                timesPlayed: details.timesPlayed
            });
        }
    }
    changeController(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    updateType(e) {
        e.preventDefault();

        const details = {
            minPlayers: this.state.minPlayers,
            maxPlayers: this.state.maxPlayers,
            category: this.state.category,
            lastTimePlayed: this.state.lastTimePlayed,
            timesPlayed: this.state.timesPlayed
        };

        axios
            .put(`/types/${this.state.id}`, {
                type: this.state.type,
                details: JSON.stringify(details)
            })
            .then(() => {
                this.props.refreshData();
            });
    }

    render() {
        const style = {
            backgroundColor: this.props.theme.colorOne,
            width: "60%",
            color: this.props.theme.colorTwo,
            border: "1px solid " + this.props.theme.colorThree
        };
        const style2 = {
            display: "flex",
            justifyContent: "space-between"
        };

        const styleMainWrapper = {
            backgroundColor: this.props.theme.colorThree,
            border: "4px ridge " + this.props.theme.colorTwo,
            color: this.props.theme.colorFive
        };
        const styleSelect = {
            backgroundColor: this.props.theme.colorOne,
            border: " 2px dotted+" + this.props.theme.colorTwo,
            color: this.props.theme.colorTwo
        };

        return (
            <MainWrapper style={styleMainWrapper}>
                <TypeEditForm onSubmit={e => this.updateType(e)}>
                    <Label>NAME :</Label>
                    <Input
                        style={style}
                        type="text"
                        name="type"
                        value={this.state.type}
                        onChange={e => {
                            this.changeController(e);
                        }}
                    />
                    <Select
                        value={this.state.category}
                        style={styleSelect}
                        type="text"
                        name="category"
                        onChange={e => {
                            this.changeController(e);
                        }}
                    >
                        <Option>main</Option>
                        <Option>small</Option>`
                    </Select>
                    <Input
                        style={style}
                        type="number"
                        name="minPlayers"
                        value={this.state.minPlayers}
                        onChange={e => {
                            this.changeController(e);
                        }}
                    />
                    <Input
                        style={style}
                        type="number"
                        name="maxPlayers"
                        value={this.state.maxPlayers}
                        onChange={e => {
                            this.changeController(e);
                        }}
                    />
                    <Input type="submit" value="Submit" />
                </TypeEditForm>
            </MainWrapper>
        );
    }
}

export default TypeEdit;

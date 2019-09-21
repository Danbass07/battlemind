import React, { Component } from "react";
import { Link } from "react-router-dom";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentToDisplay: [],
            content:'my',
        };
    }
    deleteHandler(id) {
        const isNotId = contentToDisplay => contentToDisplay.id !== id;
        const updatedContent = this.state.contentToDisplay.filter(isNotId);
        this.setState({ contentToDisplay: updatedContent });
        axios.delete(`/${this.props.object}s/${id}`);
    }
    renderContent(type) {

        return this.state.contentToDisplay.map(contentToDisplay => {
            if (contentToDisplay.type === type || this.props.object === 'league' || type === undefined || type === 'Show All') {
                return (
                    <div key={contentToDisplay.id} className="list-item">
                        <div className="list-item-name">
                            {contentToDisplay.name}
                        </div>
                        <div className="list-item-name">
                            {contentToDisplay.user_name}
                        </div>
                        <div className="list-item-name">
                            {contentToDisplay.type}
                        </div>
                        <Link
                            to={`/${this.props.object}s/${
                                contentToDisplay.id
                                }/edit`}
                            className="button-update"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() =>
                                this.deleteHandler(contentToDisplay.id)
                            }
                            className="button-delete"
                        >
                            Delete
                        </button>
                    </div>
                );
            }
        });
    }
    getContent() {
        if (this.props.object !== "none") {
            axios.get(`/${this.props.object}s`).then(response =>

                this.setState({
                    myContent: [...response.data.content[0]],
                    contentToDisplay: [...response.data.content[0]],
                    content:'my',
                })
            );
        }
        if (this.props.object !== "none") {
            axios.get(`/${this.props.object}s/${this.props.activeGroup}/friendsContent`).then(response =>
                this.setState({
                    friendsContent: [...response.data],
                })
            );
        }
        // activeGroup={this.state.activeGroup}
    }
    componentWillMount() {
        this.getContent();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.object !== this.props.object) {
            this.getContent();
        }
    }
    myOnlyButtonHandler() {
        this.setState({
            contentToDisplay: [...this.state.myContent],
            content:'my',
        });
    }
    myFriendsOnlyButtonHandler() {
        this.setState({
            contentToDisplay: [...this.state.friendsContent],
            content:'friends',
        });
    }
    allButtonHandler() {
        const all = this.state.myContent.concat(this.state.friendsContent);
        this.setState({
            contentToDisplay: [...all],
            content:'all',
        });
    }
    typeChangeHandler(e) {
        e.preventDefault();
        this.setState({
            type: e.target.value
        });
    }

    render() {
        return (
            <div className="workarea">
                <div className="list-button-area">
                    <button className={this.state.content === "my" ?"list-option-button-active": "list-option-button"}
                        onClick={() => this.myOnlyButtonHandler()}>
                        My Stuff
                </button>
                    <button className={this.state.content === "friends" ?"list-option-button-active": "list-option-button"}
                        onClick={() => this.myFriendsOnlyButtonHandler()}>
                        My Friends Stuff
                </button>
                    <button className={this.state.content === "all" ?"list-option-button-active": "list-option-button"}
                        onClick={() => this.allButtonHandler()}>
                        All Stuff
                </button>
                </div>

                {this.props.object !== 'league' ? <select
                    name="Choose a Type"
                    className="myform-control"
                    onChange={e => this.typeChangeHandler(e)}
                >
                    <option>Show All</option>
                    {this.props.types.map(type => (
                        <option value={type.name} key={type.id}>
                            {type.type}
                        </option>
                    ))}
                </select> : null}
                <div className="list-grid">
                    {this.renderContent(this.state.type)}
                </div>
            </div>
        );
    }
}
export default List;

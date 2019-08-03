import React, { Component } from 'react';


class Newscoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: 'planeswalker',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
            response: { status: "You are creating...:" },
        };

    }

    changeHandler(e) {
        this.setState({
            [e.target.placeholder]: e.target.value
        });
    }
    optionChangeHandler(e) {

        this.setState({
            type: e.target.value,
        });
    }


    submitHandler(e) {

        e.preventDefault();

        axios.post('/scoreboards', {
            name: this.state.name,
            type: this.state.type,

        }).then(response => {

            this.setState({
                name: '',
                type: '',
                response: response,
            });
        });


    }
    render() {
        return (
            <div className="Workarea">
                <form className="myform" onSubmit={(e) => this.submitHandler(e)} >

                    <input
                        className="myform-control"
                        placeholder="name"
                        onChange={(e) => this.changeHandler(e)}
                        required

                    />

                    <select
                        className="myform-control"


                        onChange={(e) => this.optionChangeHandler(e)}
                    >
                        {this.props.types.map(type => (

                            <option key={type.id}>{type.type}</option>

                        ))}
                    </select>

                    <button
                        type="submit"
                        className="submit-button"

                    >
                        Add new Scoreboard
                                </button>

                    <div className="response-display">
                        {this.state.response.status === 200 ? (
                            <h2 style={{ color: "green" }}>
                                'SUCCESS'{" "}
                            </h2>
                        ) : (
                                this.state.response.status !== "You are creating...:" ?
                                    <h2 style={{ color: "red" }}>
                                        'FAILED'
                        </h2> : null
                            )}
                    </div>

                </form>





            </div>
        );
    }
}
export default Newscoreboard

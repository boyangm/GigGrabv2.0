import React, { Component } from 'react';

class Giftgig extends Component {
    state = {
        title: '',
        instruments: [],
        location: '',
        description: '',
        moneyPaid: ''

    }

    redirectToTarget = () => {
        this.props.history.push('/');
    }

    handleChange = (event) => {
        const { name, value } = event.target;
            this.setState({ [name]: value })
        return console.log(this.state);
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { title, location, instruments, moneyPaid, description } = this.state;
        this.setState({
            title,
            description,
            location,
            instruments,
            moneyPaid
        }
        );
        event.target.reset();
        this.renderData(this.state)
        this.setState({
            title: '',
            instruments: [],
            location: '',
            description: '',
            moneyPaid: ''
        })

    }

    handleInstrumentChange = (event) => {
        const instrument = event.target.value;
        const prevState = this.state.instruments;

        if (prevState.length > 0) {
            prevState.map(item => {

                if (item === instrument) {
                    const removed = prevState.filter(item => {
                        return item !== instrument;
                    })
                    return this.setState({ instruments: removed })
                } else {

                    return this.setState({ instruments: [...prevState, instrument] })
                }
            })

        } else {
            this.setState({ instruments: [...prevState, instrument] })

        }
    };


    renderData = data => {
        fetch('/api/gigs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
            this.redirectToTarget();
        }).catch(err => {
            console.log(err)
        })

    }


    render() {

        return (
            <div className="profileCont">
                <h3>Gift a Gig</h3>
                <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <label for="title">Title:</label>
                    <input onChange={this.handleChange} value={this.state.name} type='text' name='name' />
                    <label for="location">Location:</label>
                    <input onChange={this.handleChange} value={this.state.name} type='text' name='name' />
                    <label for="moneyPaid">Amount:</label>
                    <input onChange={this.handleChange} value={this.state.name} type='text' name='name' />
                    <label for="description">Description:</label>
                    <textarea onChange={this.handleChange} value={this.state.bio} name='bio' />
                    <label for="instrument">Instrument:</label>
                    <select className="instrumentbox"  multiple={true} value={this.state.instruments} onChange={this.handleInstrumentChange}>
                        <option value="Guitar">Guitar</option>
                        <option value="Bass">Bass</option>
                        <option value="Drums">Drums</option>
                        <option value="Vocals">Vocals</option>
                        <option value="Keys">Keys</option>
                        <option value="Other">Other</option>
                    </select>
                    <h3>{this.state.instruments.map(item => `${item}, `)}</h3>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Giftgig
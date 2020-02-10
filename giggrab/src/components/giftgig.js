import React, { Component } from 'react';
import {Consumer} from './gigcontext'

/**
 *  class component for form that gift gigs to other users - boyang matsapola
 *
 * @class Giftgig
 * @extends {Component}
 */
class Giftgig extends Component {
    state = {
        title: '',
        instruments: [],
        location: '',
        description: '',
        moneyPaid: '',
        date: '',
        author: ''

    }

    // moves the window to back to home
    redirectToTarget = () => {
        this.props.history.push('/home');
    }

    //handles stte to reflect input change
    handleChange = (event) => {
        const { name, value } = event.target;
            this.setState({ [name]: value })
    }

    // sets the author always to local user.
    getAuthor = (author) =>{
        return this.setState({author})

    }

    // sets final logic upon submit
    handleSubmit = (event) => {
        event.preventDefault();
        const { title, location, instruments, moneyPaid, description, date } = this.state;
        this.setState({
            title,
            description,
            location,
            instruments,
            moneyPaid,
            date
        }
        );
        this.renderData(this.state)
     

    }

    componentDidMount(){
        const user =JSON.parse(localStorage.getItem('token'));
        this.setState({author: user._id})
    }

    // handles array logic for choosing instruments
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

    //updates the gigs employed of user
    updateMember = (author, id , action = 'push') => {
        fetch(`api/users/giftgigs/${author}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({gigId: id , action})
        }).then(res => {
            res.json()
        }).then(data => {
            return true
        })
            .catch(err => {
                console.log(err)
            })
        }

    // post route to post gig.
    renderData = data => {
        fetch('/api/gigs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data =>{
          this.updateMember(this.state.author, data._id)
                this.setState({
                    title: '',
                    instruments: [],
                    location: '',
                    description: '',
                    moneyPaid: '',
                    author: '',
                    date: ''
                })
                this.redirectToTarget();

            
        })
        .catch(err => {
            console.log(err)
        })

    }


    render() {

        return (
            <Consumer>
                {(state, actions) =>
                (state.isAuth='true')

                ?(<div className="profileCont">
                <h3 className = 'profileTitle'>Gift a Gig</h3>
                <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <label for="title">Title:</label>
                    <input onChange={this.handleChange} value={this.state.title} type='text' name='title' />
                    <label for="date">date:</label>
                    <input onChange={this.handleChange} value={this.state.date} type='date' name='date' />
                    <label for="location">Location:</label>
                    <input onChange={this.handleChange} value={this.state.location} type='text' name='location' />
                    <label for="moneyPaid">Amount:</label>
                    <input onChange={this.handleChange} value={this.state.moneyPaid} type='text' name='moneyPaid' />
                    <label for="description">Description:</label>
                    <textarea onChange={this.handleChange} value={this.state.description} name='description' />
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
            : this.props.history.push('/login')
                }
            </Consumer>
        )
    }
}

export default Giftgig
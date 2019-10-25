import React, { Component } from 'react';
import { API } from './utils/api'
import * as filestack from 'filestack-js';
const client = filestack.init('****');

class Profile extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        instruments: [],
        image: '',
        bio: ''

    }

    redirectToTarget = () => {
        this.props.history.push('/');
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const instruments = this.state.instruments;
        name === 'instruments' && this.state.instruments.indexOf(value) === -1
            ? this.setState({ [name]: [...instruments, value] })
            :
            this.setState({ [name]: value })
        return console.log(this.state);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { name, password, instruments, image, email, bio } = this.state;
        this.setState({
            name,
            email,
            bio,
            password,
            instruments,
            image,
        }
        );
        e.target.reset();
        this.renderData(this.state)
        this.setState({
            name: '',
            email: '',
            bio: ''
        })

    }

    handleInstrumentChange = (e) => {
        const instrument = e.target.value;
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

    getImage = (event) => {
        const files = event.target.files;
        const file = files.item(0);

        client.upload(file)
            .then(res => {
                console.log('success: ', res)
                this.setState({ image: res.url });
                console.log(this.state);
            })
            .catch(err => {
                console.log(err)
            });
    }

    renderData = data => {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(data);
            this.redirectToTarget();
        }).catch(err => {
            console.log(err)
        })

    }


    render() {

        return (
            <div className="profileCont">
                <h3>Create your Profile!</h3>
                <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <label for="name">Name:</label>
                    <input onChange={this.handleChange} value={this.state.name} type='text' name='name' />
                    <label for="password">Password:</label>
                    <input onChange={this.handleChange} value={this.state.password} type='text' name='password' />
                    <label for="email">Email:</label>
                    <input onChange={this.handleChange} value={this.state.email} type='text' name='email' />
                    <label for="proImage">Profile Image:</label>
                    <input id="fileInput" type="file" accept="image/png, image/jpeg" onChange={this.getImage} />
                    <label for="bio">Bio:</label>
                    <textarea onChange={this.handleChange} value={this.state.bio} name='bio' />
                    <label for="start">Instrument:</label>
                    <select className="instrumentbox" multiple={true} value={this.state.instruments} onChange={this.handleInstrumentChange}>
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

export default Profile
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as filestack from 'filestack-js';
const client = filestack.init('AFeiQyudCRNK8T2g46sKFz');

/**
 * stateful component to create user profile
 *
 * @class Profiles
 * @extends {Component}
 */
class Profile extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        instruments: [],
        image: '',
        bio: '',
        message: ''


    }
    // move back to login page
    redirectToTarget = () => {
        this.props.history.push('/login');
    }

    // handles state change
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    // handles the submit event and sends state to renderData
    handleSubmit = (event) => {
        event.preventDefault();
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
        if (this.ValidateEmail(email)) {
            this.renderData({ name, password, instruments, image, email, bio })

        }

    }



    //handles the select option part of the form
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


    // stores image to filestack
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

    // checks to make sure email is valid
    ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        this.setState({ message: "You have entered an invalid email address!" })
        return (false)
    }


    // send data to the backend
    renderData = data => {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (!data.message) {
                    console.log(data);
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        instruments: [],
                        image: '',
                        bio: ''
                    })
                    this.redirectToTarget();
                }
                this.setState({ message: data.message })
                console.log(data.message);
            })
            .catch(err => {
                console.log(err)
            })

    }


    render() {

        return (
            <div className="profileCont">
                <h3 className="createProf">Create Your Profile</h3>
                <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <label for="name">Name:</label>
                    <input onChange={this.handleChange} value={this.state.name} type='text' name='name' />
                    <label for="password">Password:</label>
                    <input onChange={this.handleChange} value={this.state.password} type='text' name='password' />
                    <p style={{ color: 'red' }}>{this.state.message}</p>
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
                    <Link to="/login"><button>Login!</button> </Link>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Profile
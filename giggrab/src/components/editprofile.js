import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as filestack from 'filestack-js';
const client = filestack.init('AFeiQyudCRNK8T2g46sKFz');

/**
 * form component for editing the user profile - boyang matsapola
 *
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
    state = {
        name: this.props.user.name || '',
        instruments: [],
        image: this.props.user.image || '' ,
        bio: this.props.user.bio || '',
        message: this.props.user.message || ''


    }
    // move back to login page
    redirectToTarget = () => {
        this.props.history.push('/home');
    }

    // handles state change
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        return console.log(this.state);
    }

    // handles the submit event and sends state to renderData
    handleSubmit = (event) => {
        event.preventDefault();
        const { name, instruments, image, bio  } = this.state;
        this.setState({
            name,
            bio,
            instruments,
            image
        }

        );
        this.renderData({ name, instruments, image, bio  })

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

    // send data to the backend
    renderData = data => {
        fetch(`/api/users/${this.props.user._id}`, {
            method: 'PUT',
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
        console.log(this.props.user)
        return (
            <div className="profileCont">
                <h3 className = "createProf">Edit Your Profile</h3>
                <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <label for="name">Name:</label>
                    <input onChange={this.handleChange} value={this.state.name} type='text' name='name' />
                    <p style={{ color: 'red' }}>{this.state.message}</p>
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
                    <Link to = "/login"><button>Login!</button> </Link>                
                    <button type="submit">Submit</button>
                    </form>
            </div>
        )
    }
}

export default EditProfile
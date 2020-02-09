import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getJwt } from '../helpers/jwt'
import { Consumer } from './gigcontext';

/**
 * functioning login page with 2 inputes and a post route - boyang matsapola
 *
 * @class Landing
 * @extends {Component}
 */
class Landing extends Component {
    state = {
        email: '',
        password: '',
        message: '',
        loginState: 'login'
    }
    loginRef = React.createRef();

    // handles state change related to input change
    handlevaluechange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

    }
    
    handletoggle = () =>{
        if( this.state.loginState === 'login'){
            this.setState({loginState:'login isTrue'} )
        }else{
            this.setState({loginState:'login'} )
        }
    }

    setScroll = () =>{
        const media = window.matchMedia('(min-width: 768px)')
        const point = this.loginRef.current.getBoundingClientRect().top;
        if (media.matches){
            if (point < -150){
                this.setState({loginState:'login scrolled'} )
            }else{
                this.setState({loginState:'login'} )
            }

        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.setScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.setScroll);
    }

    //post body on submit to check for user
    handleSubmit = (e, cb) => {
        e.preventDefault();
        const data = {
            email: this.state.email.toLowerCase(),
            password: this.state.password
        }
        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {


                if (data.message) {
                    this.setState({ message: data.message })
                    console.log(data.message)

                } else {

                    localStorage.setItem('token', JSON.stringify(data));
                    let change = cb()
                    change = true ? this.props.history.push('/home') : null
                }
            })
            .catch(err => {
                console.log(err)
            })

    }


    render() {

        return (
            <Consumer>
                {context =>
                    <div ref = {this.loginRef} className="landingCont">
                    <img onClick = {this.handletoggle} className= 'toggle' src="https://img.icons8.com/ios-filled/50/000000/menu.png"></img>
                        <div className='heroSpot'>
                            <h1 className="landingTitle">GIG GRAB</h1>
                            <h3 className="landingSubTitle">WHERE MUSICIANS EARN</h3>
                        </div>
                        <div className='about'>
                            <section className='split'>
                                <h3 className='subTitle'>Connect With Musicians Near you</h3>
                                <p> Our application is designed to help Talent and Talent buyers Connect. Talent buyers will post their available gigs to our Talent Pool. The Talent will then have the ability to bid on the gig. Once approved, the Talent is then able to see other Musicians that will be on the gig, how many performances they have completed, and their rating.</p>

                            </section>
                            <section className='split'>
                                <h3 className='subTitle'>Earn More As You Build Your Reputation</h3>
                                <p>The more you use Gig Grab, the better your results will be. All of the gigs that you post and perform are tracked, rated, and displayed to our Talent Pool. The higher your ratings, the more gigs will want you. This system also ensures that the Talent Buyers are getting the very best experience possible, from the very start. This also allows Musicians to see the quality of the event before they commit. </p>
                            </section>
                        </div>
                        <div className='about'>
                            <section id='instructions'>
                                <h3 className='subTitle'> Ready to Get Started?</h3>
                                <h3 className='pitchPoint'> Sign Up</h3>
                                <h3 className='pitchPoint'> Create A Profile</h3>
                                <h3 className='pitchPoint'> Start Bidding</h3>

                            </section>
                        </div>
                        {
                            context.state.isAuth
                            ? (
                     
                                    <div></div>
                            )
                                :(
                                    <div className = {this.state.loginState}>
                                <p className="landingLabel">{this.state.message}</p>
                                    <label className="landingLabel" > Email:</label>
                                    <input name="email" type="input" onChange={this.handlevaluechange} value={this.state.email} ></input>
                                    <label className="landingLabel" > Password:</label>
                                    <input type="password" name="password" onChange={this.handlevaluechange} value={this.state.password}></input>
                                <button onClick={(e) => this.handleSubmit(e, context.actions.authy)}>Log In</button>
                                <Link to="/signup"><button>Sign Up</button> </Link>
                        </div>
                                )
                        }
                    </div>
                }
            </Consumer>
        )
    }
}

export default Landing
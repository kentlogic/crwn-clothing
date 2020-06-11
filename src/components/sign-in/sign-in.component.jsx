import React from 'react'
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {value, name } = event.target;
        this.setState (
            {
                [name]: value
            }
        )
    }

    render () {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onChange={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        label='Email'
                        required />
                
                    <FormInput 
                        name='password' 
                        type='password'
                        handleChange={this.handleChange}
                        value={this.state.password}
                        label='Password'
                        required />

                    <div className='buttons'>
                        <CustomButton isGoogleSignIn  
                        onClick={signInWithGoogle}>
                            Sigin in with Google
                        </CustomButton>

                        <CustomButton type='submit'>
                            Sigin in
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
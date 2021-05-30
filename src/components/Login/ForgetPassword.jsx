import React, {Component} from 'react';
import './login.scss';
import Logo from '../../assets/image/Bedmal logo text.png'
import {getData} from "../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../assets/scripts/GeneralVariables";
class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
        }
    }
    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    formHandler = async (e) =>{
        e.preventDefault();
        let {email} = this.state;
        let loginItem = await getData(MAIN_URL, `admin/forgot-password`, 'post', {
            'username': email,
        }, false, true);
        // console.log(items)
        if (loginItem?.status == 200) {
            this.props.history.push({
                pathname: '/verify-code',
                state: { email: email }
            })
        }
    }
    backHandler = () =>{
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className='d-flex align-items-center justify-content-center flex-column my-5 mx-3'>
                <div className="dv-logo-login mb-5">
                    <img src={Logo} className='img-fluid' alt="bed mal"/>
                </div>
                <div className={"dv-form-width d-flex flex-column align-items-center justify-content-center"}>
                    <h3 className='mb-3 mt-4'>Forgot your password?</h3>
                    <p className='dv-form-p mb-5'>To reset your password, please enter the verification code.</p>
                    <form action="" className='w-100 d-flex flex-column mt-3' onSubmit={this.formHandler}>
                        <label htmlFor="dv-email" className='w-100 mb-5'>
                            <input type="text" id='dv-email' onChange={this.inputHandler} value={this.state.email} className='dv-input' placeholder='Email or Username' name='email' required={true}/>
                        </label>
                        <label htmlFor="dv-login-btn" className='mb-4 mt-5'>
                            <button className='dv-login-btn d-flex justify-content-center' type='submit'>next</button>
                        </label>
                        <label htmlFor="dv-login-btn">
                            <button className='dv-back-btn d-flex justify-content-center' type='button' onClick={this.backHandler}>Go to login</button>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgetPassword;
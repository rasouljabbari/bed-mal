import React, {Component} from 'react';
import './login.scss';
import Logo from '../../assets/image/Bedmal logo text.png'
import {getData} from "../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../assets/scripts/GeneralVariables";
class VerifyCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code : '',
        }
    }
    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    formHandler = async (e) =>{
        e.preventDefault();
        let {code} = this.state;
        let loginItem = await getData(MAIN_URL, `admin/forgot-password/verify`, 'post', {
            'username': this.props.location.state.email,
            'verification_code': code,
        }, false, true);
        if (loginItem?.status == 200) {
            localStorage.setItem('reset_token' , loginItem.reset_token)
            this.props.history.push('/set-new-password')
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
                    <h4>{this.props.location.state?.email}</h4>
                    <form action="" className='w-100 d-flex flex-column mt-5' onSubmit={this.formHandler}>
                        <label htmlFor="dv-code" className='w-100 mb-5'>
                            <input type="number" id='dv-code' onChange={this.inputHandler} value={this.state.code} className='dv-input' placeholder='verification code' name='code' required={true}/>
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

export default VerifyCode;
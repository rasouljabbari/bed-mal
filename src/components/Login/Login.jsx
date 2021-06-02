import React, {Component} from 'react';
import './login.scss';
import Logo from '../../assets/image/Bedmal logo text.png';
import {getData} from "../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../assets/scripts/GeneralVariables";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    forgetPasswordClick = () => {
        this.props.history.push('/forget-password')
    }
    formHandler = async (e) => {
        e.preventDefault();
        let {email, password} = this.state;

        let loginItem = await getData(MAIN_URL, `admin/login`, 'post', {
            'username': email,
            'password': password
        }, false, true);
        // console.log(items)
        if (loginItem?.status == 200) {
            localStorage.setItem('Token' , loginItem.token)
            localStorage.setItem('type' , loginItem.type)
            if(loginItem.type === 'super_admin'){
                this.props.history.push('/admin/orders')
            }else if(loginItem.type === 'vendor_admin'){
                this.props.history.push('/vendor/store')
            }
        }
    }

    render() {
        return (
            <div className='d-flex align-items-center justify-content-center flex-column my-5 mx-3'>
                <div className="dv-logo-login mb-5">
                    <img src={Logo} className='img-fluid' alt="bed mal"/>
                </div>
                <div className={"dv-form-width d-flex flex-column align-items-center justify-content-center"}>
                    <h3 className='mb-5'>Login</h3>
                    <form action="" className='w-100 d-flex flex-column' onSubmit={this.formHandler}>
                        <label htmlFor="dv-email" className='w-100 mb-4'>
                            <input type="text" id='dv-email' onChange={this.inputHandler} value={this.state.email}
                                   className='dv-input' placeholder='Email or Username' name='email' required={true}/>
                        </label>
                        <label htmlFor="dv-password" className='w-100 mb-4'>
                            <input type="password" id='dv-password' onChange={this.inputHandler}
                                   value={this.state.password} className='dv-input' placeholder='Password'
                                   name='password' required={true}/>
                        </label>
                        <label htmlFor="dv-forget-password" className='mb-5'>
                            <button id='dv-forget-password' className='dv-forget-password' type='button'
                                    onClick={this.forgetPasswordClick}>Forget your password
                            </button>
                        </label>
                        <label htmlFor="dv-login-btn" className='mt-5'>
                            <button className='dv-login-btn d-flex justify-content-center' type='submit'>Login</button>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
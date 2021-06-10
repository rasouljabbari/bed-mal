import React, {Component} from 'react';
import './login.scss';
import Logo from '../../assets/image/Bedmal logo text.png';
import {Modal} from "react-bootstrap";
import {getData} from "../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../assets/scripts/GeneralVariables";
class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm_password : '',show:false
        }
    }
    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    forgetPasswordClick = () =>{
        this.props.history.push('/forget-password')
    }
    formHandler = async (e) =>{
        e.preventDefault();
        let {confirm_password , password} = this.state;
        let loginItem = await getData(MAIN_URL, `admin/forgot-password/reset`, 'post', {
            'reset_token': localStorage.getItem('reset_token'),
            'password': password,
            'password_confirmation': confirm_password,
        }, false, true);
        // console.log(items)
        if (loginItem?.status == 200) {
            this.setState({show: true})
        }
    }
    backHandler = () =>{
        this.setState({show: false})
        this.props.history.push('/login')
    }
    closeModal = () =>{
        this.setState({show: false})
        this.props.history.push('/login')
    }
    render() {
        return (
            <>
                <div className='d-flex align-items-center justify-content-center flex-column my-5 mx-3'>
                    <div className="dv-logo-login mb-5">
                        <img src={Logo} className='img-fluid' alt="bed mal"/>
                    </div>
                    <div className={"dv-form-width d-flex flex-column align-items-center justify-content-center"}>
                        <h3 className='mb-5'>Enter the new password</h3>
                        <form action="" className='w-100 d-flex flex-column' onSubmit={this.formHandler}>
                            <label htmlFor="dv-password" className='w-100 mb-4'>
                                <input type="password" id='dv-password' onChange={this.inputHandler} value={this.state.password} className='dv-input' placeholder='Password' name='password' required={true}/>
                            </label>
                            <label htmlFor="dv-confirm_password" className='w-100 mb-5'>
                                <input type="password" id='dv-confirm_password' onChange={this.inputHandler} value={this.state.confirm_password} className='dv-input' placeholder='New password again' name='confirm_password' required={true}/>
                            </label>
                            <label htmlFor="dv-login-btn" className='mb-4 mt-5'>
                                <button className='dv-login-btn d-flex justify-content-center' type='submit'>Change password</button>
                            </label>
                            <label htmlFor="dv-login-btn">
                                <button className='dv-back-btn d-flex justify-content-center' type='button' onClick={this.backHandler}>Go to login</button>
                            </label>
                        </form>
                    </div>
                </div>
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-5">
                                <i className="lar la-check-circle dv-check-circle-icon"/>
                            </div>
                            <div className="col-12 mb-5">
                                <h5 className='dv-h5'>Password changed successfullyly</h5>
                            </div>
                            <div className="col-12 mt-5">
                                <button className='dv-back-btn d-flex justify-content-center' type='button' onClick={this.backHandler}>Go to login</button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default NewPassword;
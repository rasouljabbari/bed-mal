import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/Login/ForgetPassword";
import VerifyCode from "./components/Login/VerifyCode";
import NewPassword from "./components/Login/NewPassword";
import Orders from "./components/Super Admin/Orders/Orders";
import OrderView from "./components/Super Admin/Orders/Order-view";
import Borrowing from "./components/Super Admin/Borrowing/Borrowing";
import BorrowReceipts from "./components/Super Admin/Borrowing/BorrowReceipts";
import BorrowReceiptsSelected from "./components/Super Admin/Borrowing/BorrowReceiptsSelected";
import BorrowingActive from "./components/Super Admin/Borrowing/BorrowingActive";
import BorrowingInventory from "./components/Super Admin/Borrowing/BorrowingInventory";
import LoanReport from "./components/Super Admin/Borrowing/LoanReport";
import Departments from "./components/Super Admin/Departments/Departments";
import AdminTerms from "./components/Super Admin/ Admin Terms/AdminTerms";
import Vendors from "./components/Super Admin/Vendors/Vendors";
import EditOveride from "./components/Super Admin/Vendors/EditOveride";
import Loader from "./components/Loader/Loader";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    async componentDidMount() {

    }


    render() {
        return (
            <>
                {
                    localStorage.getItem('Token') ?
                    // localStorage.getItem('type') === 'super_admin' ?
                        <>
                            <Header/>
                            <div className='dv-content'>
                                <Switch>
                                    <Route exact path="/admin/orders" component={Orders}/>
                                    <Route exact path="/admin/orders/:order_id"
                                           component={OrderView}/>
                                    <Route exact path="/admin/borrowing" component={Borrowing}/>
                                    <Route exact path="/admin/borrow-receipts" component={BorrowReceipts}/>
                                    <Route exact path="/admin/borrow-receipts/:borrow_receipts_id"
                                           component={BorrowReceiptsSelected}/>
                                    <Route exact path="/admin/borrowing-active" component={BorrowingActive}/>
                                    <Route exact path="/admin/borrowing-inventory" component={BorrowingInventory}/>
                                    <Route exact path="/admin/borrowing-loan-report" component={LoanReport}/>
                                    <Route exact path="/admin/departments" component={Departments}/>
                                    <Route exact path="/admin/terms" component={AdminTerms}/>
                                    <Route exact path="/admin/vendors" component={Vendors}/>
                                    <Route exact path="/admin/edit-overide" component={EditOveride}/>
                                    <Redirect from="/" to="/admin/orders"/>
                                </Switch>
                            </div>
                        </> :
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/forget-password" component={ForgetPassword}/>
                            <Route exact path="/verify-code" component={VerifyCode}/>
                            <Route exact path="/set-new-password" component={NewPassword}/>
                            <Redirect from="/" to="/login"/>
                        </Switch>

                }


                <Loader id='loader'/>
            </>
        );
    }
}


export default (withRouter(App));



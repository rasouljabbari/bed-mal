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
import AddTerms from "./components/Super Admin/ Admin Terms/AddTerms";
import EditTerms from "./components/Super Admin/ Admin Terms/EditTerms";
import Transactions from "./components/Super Admin/Transactions/Transactions";
import Users from "./components/Super Admin/Users/Users";
import AddVendor from "./components/Super Admin/Vendors/AddVendor";
import Messages from "./components/Super Admin/Messages/Messages";
import Logins from "./components/Super Admin/Logins/Logins";
import NotFound from "./components/Not Found/NotFound";
import Store from "./components/Vendor/Store/Store";
import Products from "./components/Vendor/Store/Products";
import BorrowProducts from "./components/Vendor/Store/BorrowProducts";
import Fulfilment from "./components/Vendor/Store/Fulfilment";
import Collections from "./components/Vendor/Store/Collections";
import Permissions from "./components/Vendor/Store/Permissions";

class App extends Component {
    render() {
        return (
            <>
                {
                    localStorage.getItem('Token') ?
                        <>
                            <Header/>
                            <div className='dv-content'>
                                {
                                    localStorage.getItem('type') === 'super_admin' ?
                                        <Switch>
                                            {/****************** Super admin *************************/}
                                            <Route exact path="/" component={Orders}/>
                                            <Route exact path="/login" render={() => <Redirect to="/admin/orders"/>}/>
                                            <Route exact path="/admin/orders" component={Orders}/>
                                            <Route exact path="/admin/orders/:order_id" component={OrderView}/>
                                            <Route exact path="/admin/borrowing" component={Borrowing}/>
                                            <Route exact path="/admin/borrow-receipts" component={BorrowReceipts}/>
                                            <Route exact path="/admin/borrow-receipts/:borrow_receipts_id"
                                                   component={BorrowReceiptsSelected}/>
                                            <Route exact path="/admin/borrowing-active" component={BorrowingActive}/>
                                            <Route exact path="/admin/borrowing-inventory"
                                                   component={BorrowingInventory}/>
                                            <Route exact path="/admin/borrowing-loan-report" component={LoanReport}/>
                                            <Route exact path="/admin/departments" component={Departments}/>
                                            <Route exact path="/admin/terms" component={AdminTerms}/>
                                            <Route exact path="/admin/add-terms" component={AddTerms}/>
                                            <Route exact path="/admin/edit-terms" component={EditTerms}/>
                                            <Route exact path="/admin/vendors" component={Vendors}/>
                                            <Route exact path="/admin/edit-overide/:term_id" component={EditOveride}/>
                                            <Route exact path="/admin/add-vendor/" component={AddVendor}/>
                                            <Route exact path="/admin/transaction" component={Transactions}/>
                                            <Route exact path="/admin/users" component={Users}/>
                                            <Route exact path="/admin/messages" component={Messages}/>
                                            <Route exact path="/admin/logins" component={Logins}/>
                                            {/****************** Not found *************************/}
                                            <Route exact path="*" component={NotFound}/>
                                        </Switch> :
                                        <Switch>
                                            {/****************** Vendor *************************/}
                                            <Route exact path="/vendor/messages" component={Messages}/>
                                            <Route exact path="/vendor/store/details" component={Store}/>
                                            <Route exact path="/vendor/store/collections" component={Collections}/>
                                            <Route exact path="/vendor/store/fulfilment" component={Fulfilment}/>
                                            <Route exact path="/vendor/store/borrow-products" component={BorrowProducts}/>
                                            <Route exact path="/vendor/store/products" component={Products}/>
                                            <Route exact path="/vendor/store/permissions" component={Permissions}/>
                                            {/****************** Not found *************************/}
                                            <Route exact path="*" component={NotFound}/>
                                        </Switch>
                                }


                            </div>
                        </> :
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route path="/" component={Login}/>
                            <Route exact path="/forget-password" component={ForgetPassword}/>
                            <Route exact path="/verify-code" component={VerifyCode}/>
                            <Route exact path="/set-new-password" component={NewPassword}/>
                            <Route exact path="*" component={NotFound}/>
                        </Switch>

                }


                <Loader id='loader'/>
            </>
        );
    }
}


export default (withRouter(App));



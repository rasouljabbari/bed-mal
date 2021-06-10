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
import Fulfillment from "./components/Vendor/Store/Fulfillment";
import Collections from "./components/Vendor/Store/Collections";
import Permissions from "./components/Vendor/Store/Permissions";
import Dashboard from "./components/Vendor/Dashboard/Dashboard";
import VOrders from "./components/Vendor/Orders/VOrders";
import AddProduct from "./components/Vendor/Store/AddProduct";
import EditProduct from "./components/Vendor/Store/EditProduct";
import VendorTransactions from "./components/Vendor/VendorTransactions/VendorTransactions";
import VendorMessages from "./components/Vendor/VendorMessages/VendorMessages";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
            // permissions: []
        }
    }

    // async componentDidMount() {
    //     if (localStorage.getItem('Token')) {
    //         let storeDetails = await getData(MAIN_URL, `vendor/dashboard`, 'get', {}, true, true);
    //         if (storeDetails?.status === 200) {
    //             let key_arr = [];
    //             storeDetails.permissions?.map((item) => {
    //                 key_arr.push(item.key)
    //             })
    //             this.setState({permissions: key_arr})
    //         }
    //     }
    //
    // }



    render() {
        return (
            <>
                {
                    localStorage.getItem('Token') ?
                        <>
                            <Header isOpen={this.state.isOpen}/>
                            <div className='dv-content' >
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
                                            <Route exact path="/" component={Dashboard}/>
                                            <Route exact path="/vendor/dashboard" component={Dashboard}/>
                                            <Route exact path="/login"
                                                   render={() => <Redirect to="/vendor/dashboard"/>}/>
                                            {/*{*/}
                                            {/*    this.state.permissions?.map((itm)=>(*/}
                                            {/*        itm === 'store-details' ?*/}
                                            {/*        <>*/}
                                            <Route exact path="/vendor/store/details" component={Store}/>
                                            {/*</>*/}
                                            {/*: itm === 'collection' ?*/}
                                            {/*    <>*/}
                                            <Route exact path="/vendor/store/collections" component={Collections}/>
                                            {/*   </>*/}
                                            {/*: itm === 'logins' ?*/}
                                            {/*       <>*/}
                                            <Route exact path="/vendor/store/permissions" component={Permissions}/>
                                            {/*            </> : ''*/}
                                            {/*))*/}
                                            {/*}*/}

                                            <Route exact path="/vendor/store/fulfillment" component={Fulfillment}/>
                                            <Route exact path="/vendor/store/borrow-products"
                                                   component={BorrowProducts}/>
                                            <Route exact path="/vendor/store/products" component={Products}/>
                                            <Route exact path="/vendor/store/products/edit/:product_id" component={EditProduct}/>
                                            <Route exact path="/vendor/store/products/create" component={AddProduct}/>
                                            <Route exact path="/vendor/orders" component={VOrders}/>
                                            <Route exact path="/vendor/transaction" component={VendorTransactions}/>
                                            <Route exact path="/vendor/messages" component={VendorMessages}/>
                                            {/****************** Not found *************************/}
                                            <Route exact path="*" component={NotFound}/>
                                        </Switch>
                                }


                            </div>
                        </> :
                        <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route exact path="/login" component={Login}/>
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



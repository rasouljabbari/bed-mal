import React, {Component} from 'react';
import './orders.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Link} from "react-router-dom";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import Glass from "../../../assets/image/complete.png";
import OrderNoteImage from "../../../assets/image/Use borrow bags.png";
import {Row , Col , Tab , Nav} from "react-bootstrap";

class VOrders extends Component {
    constructor(props) {
        super(props);
        this.myRef2 = React.createRef()
    }

    componentDidMount() {
        setTitle('Order view')
    }

    handleMessage = (id) => {
        console.log(id)
    }

    handleCall = (id) => {
        console.log(id)
    }
    /**********************************************/
    // Lazy Load
    getDataOnScrolledBoards = async (obj) => {
        console.log(obj.target.offsetHeight + obj.target.scrollTop, obj.target.scrollHeight)
        return false
        // let offset = 0;
        // if (obj.target.offsetHeight + obj.target.scrollTop == obj.target.scrollHeight) {
        //     if (this.state.boards.length % 20 === 0 && this.state.isAllBoardsLoaded === true) {
        //         // this.setState({isboardsLoader: true});
        //         let moreData = await getData(MAIN_URL, `board?limit=20&offset=${this.state.boards.length}`, 'get',
        //             {
        //                 // search: this.state.search_value,
        //             }, true, true);
        //
        //         if (moreData) {
        //             this.setState(prevState => ({
        //                 items: {
        //                     ...prevState.items, ...moreData,
        //                     boards: this.state.boards.concat(moreData.items),
        //                 },
        //                 boards: this.state.boards.concat(moreData.items),
        //             }));
        //
        //             // console.log(moreData.boards.length);
        //
        //             if (moreData.boards?.length < 20) {
        //                 this.setState({isAllBoardsLoaded: false})
        //             }
        //         }
        //     }
        //
        // }
    }
    /**********************************************/

    acceptOrderHandler = async (id)=>{
        console.log(id)
    }
    handleReject = async (id)=>{
        console.log(id)
    }
    handleEdit = async (id)=>{
        console.log(id)
    }

    render() {
        return (
            <>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                   <h1>cwdcvd</h1>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h2>cdwcdweced</h2>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
            // <div className="row py-3 px-3 px-md-4 position-relative mb-5">
            //     <div className="col-12 position-relative">
            //         <div className="custom-height-right-items">
            //             <div className="bg-custom-light bg-custom-light-1 d-flex flex-column align-items-start p-4">
            //                 <span className='dv-span-color'>#O210428TCSS1</span>
            //                 <p className='dv-p-name'>Sophie Smith</p>
            //                 <span className="dv-date-right mb-5">17.56 - 28/04/21</span>
            //                 <h2 className='mb-5'>Delivery</h2>
            //                 <p className='dv-address-custom'>
            //                     32 Brondesbury Rd,
            //                     Brondesbury,
            //                     London,
            //                     MW4 6DU
            //                 </p>
            //                 <div className="dv-pending mb-2">
            //                     PENDING
            //                 </div>
            //                 <button className='dv-accept-order mb-3' onClick={()=>this.acceptOrderHandler(1)}>Accept Order</button>
            //                 <div className="d-flex align-items-center justify-content-start w-100">
            //                     <button className='mx-1 dv-reject' onClick={() => this.handleReject('11')}>Reject</button>
            //                     <button className='mx-1 dv-edit' onClick={() => this.handleEdit('11')}>Edit</button>
            //                 </div>
            //             </div>
            //
            //             <div className="bg-custom-light bg-custom-light-2">
            //                 <div className="d-flex flex-column align-items-start p-4 dv-lazyLoad mb-3" ref={this.myRef2} onScroll={this.getDataOnScrolledBoards}>
            //                     <h2 className='dv-right-header mb-4'>RECEIPT DETAILS</h2>
            //                     <table className='dv-orders-list-table'>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>1</td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">Espresso</span>
            //                                     <span className='dv-extra-item mb-2'>Extra Large</span>
            //                                     <span className='dv-extra-item mb-2'>Oat Milk</span>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="dv-img-glass-parent">
            //                                     <img
            //                                         onError={(e) => {
            //                                             e.target.onerror = null;
            //                                             e.target.src = `${placeHolder_img}`
            //                                         }}
            //                                         src={Glass} alt="bed mal" className='img-fluid'/>
            //                                 </div>
            //                             </td>
            //                             <td>
            //                                 <div className="d-flex flex-column align-items-start">
            //                                     <span className="dv-name-of-item mb-2">£2.45</span>
            //                                     <span className='dv-extra-item mb-2'>£0.50</span>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                     </table>
            //                 </div>
            //                 <div className="d-flex w-100 dv-bg-cc">
            //                     <div className="dv-order-note">
            //                         <div className="d-flex">
            //                             <div className="dv-img-order-note-parent">
            //                                 <img
            //                                     onError={(e) => {
            //                                         e.target.onerror = null;
            //                                         e.target.src = `${placeHolder_img}`
            //                                     }}
            //                                     src={OrderNoteImage} alt="bed mal" className='img-fluid'/>
            //                             </div>
            //                             <div className="d-flex flex-column align-items-start">
            //                                 <h3 className='dv-order-note-title'>ORDER NOTE</h3>
            //                                 <p className='dv-order-note-text'>Please use no milk products.</p>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     <div className="dv-total">
            //                         <div className="d-flex flex-column">
            //                             <h3 className='mb-1'>Delivery</h3>
            //                             <p className='mb-1'>Free</p>
            //                             <h3 className='mb-1'>Total</h3>
            //                             <p className='mb-1'>£39.65</p>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //
            //         </div>
            //     </div>
            //
            // </div>
        );
    }
}

export default VOrders;
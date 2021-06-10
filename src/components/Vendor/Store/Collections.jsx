import React, {Component} from 'react';
import './store.scss';
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Modal} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Menu from "./Menu";
import Swal from "sweetalert2";
import Trash from "../../../assets/image/Icon material-delete.svg";

class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllBoardsLoaded: true, items: [], sure_remove: false, add_collections: false, collections_name: '',
            permissions_item:[]
        }
    }

    async componentDidMount() {
        setTitle('Store')
        let collectionsItems = await getData(MAIN_URL, `vendor/collections`, 'get', {}, true, true);
        if (collectionsItems?.status === 200) {
            this.setState({items: collectionsItems?.collections})
        }
    }

    newCollections = () => {
        this.setState({add_collections: true , collections_name:''})
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addNewCollectionsModal = async (e) => {
        e.preventDefault()
        const {collections_name} = this.state
        this.setState({add_collections: false})

        let new_item = await getData(MAIN_URL, `vendor/collections/create`, 'post', {
            'name': collections_name,
        }, true, true);
        if (new_item?.status == 200) {
            let items = this.state.items;
            let newStatuses = items.concat(new_item?.item);
            Swal.fire({
                icon: 'success',
                title: 'created successfully',
            })
            this.setState({items: newStatuses});
        }
    }
    /*******************************/
    removeCollections = async (id) => {
        this.setState({sure_remove: true, removeSelectedId: id})
    }
    removeItemFromList = async () => {
        let arr = [];
        this.setState({sure_remove: false})
        let removeItem = await getData(MAIN_URL, `vendor/collections/remove/${this.state.removeSelectedId}`, 'post', {}, true, true);
        // console.log(items)
        if (removeItem?.status === 200) {
            this.state.items.map((item) => {
                if (this.state.removeSelectedId !== item.id) {
                    arr.push(item)
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'removed successfully',
            })
            this.setState({items: arr})
        }
    }
    /*************************/

    closeModal = () => {
        this.setState({sure_remove: false, add_collections: false})
    }


    downCollections = async (row_id, id, index) => {
        if (this.state.items.length === index+1){
            return false
        }
        else {
            let selectItem1 = this.state.items.find((item, inx) => {
                if (inx === index) return item
            })
            let selectItem2 = this.state.items.find((item, inx) => {
                if (inx === index + 1) return item
            })

            let collectionsItem = await getData(MAIN_URL, `vendor/collections/reorder`, 'post', {
                'collection_id1': selectItem1.id,
                'row_index1': selectItem2.row_index,
                'collection_id2': selectItem2.id,
                'row_index2': selectItem1.row_index,
            }, true, true);
            // console.log(items)
            if (collectionsItem?.status === 200) {
                let collectionsItems = await getData(MAIN_URL, `vendor/collections`, 'get', {}, true, true);
                // console.log(items)
                if (collectionsItems?.status === 200) {
                    this.setState({items: collectionsItems.collections})
                }
            }
        }
    }
    upCollections = async (row_id, id, index) => {
        if (index === 0){
            return false
        }
        else{
            let selectItem1 = this.state.items.find((item, inx) => {
                if (inx === index) return item
            })
            let selectItem2 = this.state.items.find((item, inx) => {
                if (inx === index - 1) return item
            })

            let collectionsItem = await getData(MAIN_URL, `vendor/collections/reorder`, 'post', {
                'collection_id1': selectItem1.id,
                'row_index1': selectItem2.row_index,
                'collection_id2': selectItem2.id,
                'row_index2': selectItem1.row_index,
            }, true, true);

            if (collectionsItem?.status === 200) {
                let collectionsItems = await getData(MAIN_URL, `vendor/collections`, 'get', {}, true, true);
                if (collectionsItems?.status === 200) {
                    this.setState({items: collectionsItems.collections})
                }
            }
        }
    }


    render() {
        const {items} = this.state;
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative mb-5'>
                    <>
                        <div className="dv-borrowing-content2 py-3 w-100">
                            <div className='row'>
                                <div
                                    className="col-12 mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
                                    <h2>Collections</h2>
                                    <button className='dv-department-btn' onClick={this.newCollections}>New collection</button>
                                </div>
                                <div className="col-12">
                                    <div className='dv-bg-light dv-box-shadow overflow-auto p-md-4'>
                                        {
                                            items?.length !== 0 ?
                                                <table className="table dv-department-table text-center">
                                                    <thead>
                                                    <tr>
                                                        <th className='pl-md-5 text-left' scope="col">Category name </th>
                                                        <th scope="col" className='text-right pr-4'>Reorder</th>
                                                        <th scope="col" className='text-center'>Delete</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        items?.map((row, i) => (
                                                            <tr key={i}>
                                                                <td className='pl-md-5 mb-0 text-left'>{row.name}</td>
                                                                <td className='text-right'>
                                                                    <div
                                                                        className="d-flex align-items-center justify-content-end">
                                                                        <i className="las la-arrow-down dv-department-icon mr-1"
                                                                           onClick={() => this.downCollections(row.row_index, row.id, i)}/>
                                                                        <i className="las la-arrow-up dv-department-icon ml-1"
                                                                           onClick={() => this.upCollections(row.row_index, row.id, i)}/>
                                                                    </div>
                                                                </td>
                                                                <td className='d-flex justify-content-center'>
                                                                    <div className='dv-department-icon'>
                                                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeCollections(row.id)}/>
                                                                    </div>
                                                                    {/*<i*/}
                                                                    {/*className="las la-trash dv-department-icon"*/}
                                                                    {/*onClick={() => this.removeCollections(row.id)}/>*/}

                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table> : <h1 className='text-center'>There is no item</h1>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal style={{textAlign: 'center'}} centered={true} show={this.state.sure_remove}
                               onHide={this.closeModal}>
                            <Modal.Body className='p-5'>
                                <div className="row justify-content-center">
                                    <div className="col-12 mb-4">
                                        <h5 className='dv-h5'>Are you sure ?</h5>
                                    </div>
                                    <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                        <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                                onClick={this.closeModal}>No
                                        </button>
                                        <button className='dv-access-btn d-flex justify-content-center' type='button'
                                                onClick={this.removeItemFromList}>Yes
                                        </button>
                                    </div>
                                </div>

                            </Modal.Body>
                        </Modal>
                        <Modal style={{textAlign: 'center'}} centered={true} show={this.state.add_collections}
                               onHide={this.closeModal}>
                            <Modal.Body className='p-5'>
                                <div className="row justify-content-center">
                                    <div className="col-12 mb-4">
                                        <h5 className='dv-h5'>Add a new collections</h5>
                                    </div>
                                    <form action="" className='w-100 mt-5 px-3 px-md-5'
                                          onSubmit={this.addNewCollectionsModal}>
                                        <label className='w-100' htmlFor="collections_name">
                                            <input type="text" name='collections_name' onChange={this.inputHandler}
                                                   value={this.state.collections_name} className='dv-input-department'/>
                                        </label>
                                        <div className=" mt-3 d-flex justify-content-center align-items-center">
                                            <button className='dv-cancel-btn d-flex justify-content-center'
                                                    type='button'
                                                    onClick={this.closeModal}>No
                                            </button>
                                            <button className='dv-access-btn d-flex justify-content-center'
                                                    type='submit'>Yes
                                            </button>
                                        </div>
                                    </form>

                                </div>

                            </Modal.Body>
                        </Modal>
                    </>
                </div>

            </div>
        );
    }
}

export default Collections;
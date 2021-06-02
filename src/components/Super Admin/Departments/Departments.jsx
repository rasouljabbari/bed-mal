import React, {Component} from 'react';
import './departments.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import LeftSideBarBorrowing from "../Borrowing/LeftSideBarBorrowing/LeftSideBarBorrowing";
import {Link} from "react-router-dom";
import {getData} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import {Modal} from "react-bootstrap";

class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllBoardsLoaded: true, items: [], show: false, add_department: false, department_name: ''
        }
    }

    async componentDidMount() {
        setTitle('Departments')
        let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, true);
        // console.log(items)
        if (departmentItems?.status === 200) {
            this.setState({items: departmentItems.items})
        }
    }

    newDepartment = () => {
        this.setState({add_department: true})
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addNewDepartmentModal = async (e) => {
        e.preventDefault()
        const {department_name} = this.state
        this.setState({add_department: false})

        let new_item = await getData(MAIN_URL, `admin/departments/create`, 'post', {
            'name': department_name,
        }, true, true);
        // console.log(items)
        if (new_item?.status == 200) {
            let items = this.state.items;
            let newStatuses = [new_item?.item].concat(items);
            this.setState({items: newStatuses});
        }
    }
    removeDepartment = async (id) => {
        this.setState({show: true, removeSelectedId: id})
    }
    removeItemFromList = async () => {
        let arr = [];
        this.setState({show: false})
        let removeItem = await getData(MAIN_URL, `admin/departments/remove/${this.state.removeSelectedId}`, 'get', {}, true, true);
        // console.log(items)
        if (removeItem?.status === 200) {
            this.state.items.map((item) => {
                if (this.state.removeSelectedId !== item.id) {
                    arr.push(item)
                }
            })
            this.setState({items: arr})
        }
    }

    closeModal = () => {
        this.setState({show: false, add_department: false})
    }


    downDepartment = async (row_id, id, index) => {
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
            console.log(selectItem1, selectItem2)

            let departmentItem = await getData(MAIN_URL, `admin/departments/reorder`, 'post', {
                'department_id1': selectItem1.id,
                'row_index1': selectItem2.row_index,
                'department_id2': selectItem2.id,
                'row_index2': selectItem1.row_index,
            }, true, true);
            // console.log(items)
            if (departmentItem?.status === 200) {
                console.log(departmentItem)
                let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, false);
                // console.log(items)
                if (departmentItems?.status === 200) {
                    console.log(departmentItems)
                    this.setState({items: departmentItems.items})
                }
            }
        }
    }
    upDepartment = async (row_id, id, index) => {
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

            let departmentItem = await getData(MAIN_URL, `admin/departments/reorder`, 'post', {
                'department_id1': selectItem1.id,
                'row_index1': selectItem2.row_index,
                'department_id2': selectItem2.id,
                'row_index2': selectItem1.row_index,
            }, true, true);

            if (departmentItem?.status === 200) {
                console.log(departmentItem)
                let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, false);
                // console.log(items)
                if (departmentItems?.status === 200) {
                    console.log(departmentItems)
                    this.setState({items: departmentItems.items})
                }
            }
        }
    }

    render() {
        const {items} = this.state;

        return (
            <>
                <div className=" dv-borrowing-content2 py-3 w-100">
                    <div className='container-fluid py-3 px-md-4'>
                        <div className='row'>
                            <div className="col-12 mb-3 d-flex justify-content-end">
                                <button className='dv-department-btn' onClick={this.newDepartment}>New department
                                </button>
                            </div>
                            <div className="col-12">
                                <div className='dv-bg-light overflow-auto p-md-4'>
                                    <table className="table dv-department-table text-center">
                                        <thead>
                                        <tr>
                                            <th scope="col">Department name</th>
                                            <th scope="col" className='text-right'>Reorder</th>
                                            <th scope="col" className='text-left'>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            items?.map((row, i) => (
                                                <tr key={i}>
                                                    <td>{row.name}</td>
                                                    <td className='text-right'>
                                                        <div className="d-flex align-items-center justify-content-end">
                                                            <i className="las la-arrow-down dv-department-icon mr-1"
                                                               onClick={() => this.downDepartment(row.row_index, row.id, i)}/>
                                                            <i className="las la-arrow-up dv-department-icon ml-1"
                                                               onClick={() => this.upDepartment(row.row_index, row.id, i)}/>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'><i
                                                        className="las la-trash dv-department-icon"
                                                        onClick={() => this.removeDepartment(row.id)}/></td>
                                                </tr>
                                            ))
                                        }


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show}
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
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.add_department}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Add a new department</h5>
                            </div>
                            <form action="" className='w-100 mt-5 px-3 px-md-5' onSubmit={this.addNewDepartmentModal}>
                                <label className='w-100' htmlFor="department_name">
                                    <input type="text" name='department_name' onChange={this.inputHandler}
                                           value={this.state.department_name} className='dv-input-department'/>
                                </label>
                                <div className=" mt-3 d-flex justify-content-center align-items-center">
                                    <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                            onClick={this.closeModal}>No
                                    </button>
                                    <button className='dv-access-btn d-flex justify-content-center' type='submit'
                                            onClick={this.removeItemFromList}>Yes
                                    </button>
                                </div>
                            </form>

                        </div>

                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default Departments;
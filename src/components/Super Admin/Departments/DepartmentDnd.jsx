import React, {Component} from 'react';
import './departments.scss'
import ReactDragListView from "react-drag-listview";
import {Table} from 'antd'
import Trash from "../../../assets/image/Icon material-delete.svg";
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";

class DepartmentDnd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            add_department: false,show:false
        };
        this.columns = [
            {
                title: "Department name",
                dataIndex: "name"
            },
            {
                title: "Reorder",
                key: "operate",
                render: (text, record, index) =>
                    <div className="d-flex align-items-center justify-content-end">
                        <a className="drag-handle" href="#"><i
                            className="las la-arrow-down dv-department-icon mr-1"/></a>
                        <a className="drag-handle" href="#"><i className="las la-arrow-up dv-department-icon ml-1"/></a>
                    </div>
            },
            {
                title: "Delete",
                key: "delete",
                render: (text, record, index) =>
                    <div className='dv-department-icon'>
                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment(JSON.stringify(record.id))}/>
                    </div>
            }
        ];

        const that = this;
        this.dragProps = {
            async onDragEnd(fromIndex, toIndex) {
                console.log(fromIndex, toIndex)
                const data = [...that.state.data];

                const item = data.splice(fromIndex, 1)[0];
                data.splice(toIndex, 0, item);

                let main_row_index;
                if (fromIndex < toIndex) {
                    main_row_index = data[toIndex - 1].row_index
                } else {
                    main_row_index = data[toIndex + 1].row_index
                }


                let departmentItems = await getData(MAIN_URL, `admin/departments/reorder`, 'post', {
                    department_id: item.id,
                    row_index: main_row_index
                }, true, true);
                if (departmentItems?.status === 200) {
                    that.setState({
                        data
                    });
                }

            },
            handleSelector: "a",
        };
    }

    async componentDidMount() {
        setTitle('Departments')
        let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, true);
        // console.log(items)
        if (departmentItems?.status === 200) {
            this.setState({data: departmentItems.items})
        }
    }

    newDepartment = () => {
        this.setState({add_department: true , department_name:''})
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
            let items = this.state.data;
            let newStatuses = items.concat(new_item?.item);
            this.setState({data: newStatuses});
        }
        Swal.fire({
            icon: 'success',
            title: 'created successfully',
        })
    }

    removeDepartment = async (id) => {
        console.log(id)
        this.setState({show: true, removeSelectedId: id})
    }
    removeItemFromList = async () => {
        let arr = [];
        this.setState({show: false})

        let removeItem = await getData(MAIN_URL, `admin/departments/remove/${this.state.removeSelectedId}`, 'get', {}, true, true);
        if (removeItem?.status === 200) {

            this.state.data.map((item) => {
                if (this.state.removeSelectedId != item.id) {
                    arr.push(item)
                }
            })
            this.setState({data: arr})
            Swal.fire({
                icon: 'success',
                title: 'removed successfully',
            })
        }
    }

    closeModal = () => {
        this.setState({show: false, add_department: false})
    }

    render() {
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
                            <div className='dv-bg-light overflow-auto p-4'>
                                <ReactDragListView {...this.dragProps}>
                                    <Table
                                        columns={this.columns}
                                        pagination={false}
                                        dataSource={this.state.data}
                                    />
                                </ReactDragListView>
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
                                    <button className='dv-access-btn d-flex justify-content-center' type='submit'>Yes
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

export default DepartmentDnd;
import React, { Component } from 'react';
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import Trash from "../../../assets/image/Icon material-delete.svg";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";

export default class DepartmentDnd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items : []
        }
    }


    async componentDidMount() {
        setTitle('Departments')
        let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, true);
        // console.log(items)
        if (departmentItems?.status === 200) {
            this.setState({items: departmentItems.items })
        }
    }

    handleRLDDChange = (newItems) => {
        console.log(newItems)
        this.setState({ items: newItems });
    }
    removeDepartment = async (id) => {
        this.setState({show: true, removeSelectedId: id})
    }
    removeItemFromList = async () => {
        let arr = [];
        this.setState({show: false})

        let removeItem = await getData(MAIN_URL, `admin/departments/remove/${this.state.removeSelectedId}`, 'get', {}, true, true);
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

    closeModal = () => {
        this.setState({show: false, add_department: false})
    }



    render() {
        const {items} = this.state

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
                                <div className='dv-bg-light p-md-4'>
                                    <div className='w-100 d-flex pb-3'>
                                        <div className='dv-department-name'>Department name</div>
                                        <div className='dv-reorder-department pr-4'>Reorder</div>
                                        <div className='text-left dv-delete-department'>Delete</div>
                                    </div>
                                    <RLDD
                                        className='dv-reorder-department-items'
                                        items={items}
                                        itemRenderer={(item) => {
                                            return (
                                                <>
                                                    <div className='dv-department-name'>{item.name}</div>
                                                    <div className='dv-reorder-department'>
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <i className="las la-arrow-down dv-department-icon mr-1"
                                                                // onClick={() => this.downDepartment(row.row_index, row.id, i)}
                                                            />
                                                            <i className="las la-arrow-up dv-department-icon ml-1"
                                                                // onClick={() => this.upDepartment(row.row_index, row.id, i)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='dv-delete-department'>
                                                        <div className='dv-department-icon'>
                                                            <img src={Trash} className='img-fluid' alt="bed mal"
                                                                onClick={() => this.removeDepartment(item.id)}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }}
                                        onChange={this.handleRLDDChange}
                                    />






                                    {/*<DragDropContext onDragEnd={this.onDragEnd}>*/}
                                    {/*    <Droppable droppableId="droppable">*/}
                                    {/*        {(provided, snapshot) => (*/}
                                    {/*            <div*/}
                                    {/*                ref={provided.innerRef}*/}
                                    {/*                className='dv-reorder-department-items'*/}
                                    {/*                style={getListStyle(snapshot.isDraggingOver)}>*/}
                                    {/*                {this.state.items.map((item, index) => (*/}
                                    {/*                    <Draggable*/}
                                    {/*                        key={item.id}*/}
                                    {/*                        draggableId={item.id}*/}
                                    {/*                        index={index}>*/}
                                    {/*                        {(provided, snapshot) => (*/}
                                    {/*                            <div*/}
                                    {/*                                ref={provided.innerRef}*/}
                                    {/*                                {...provided.draggableProps}*/}
                                    {/*                                {...provided.dragHandleProps}*/}
                                    {/*                                style={getItemStyle(*/}
                                    {/*                                    snapshot.isDragging,*/}
                                    {/*                                    provided.draggableProps.style*/}
                                    {/*                                )}>*/}
                                    {/*                                <div className='dv-department-name'>{item.name}</div>*/}
                                    {/*                                <div className='dv-reorder-department'>*/}
                                    {/*                                    <div className="d-flex align-items-center justify-content-center">*/}
                                    {/*                                        <i className="las la-arrow-down dv-department-icon mr-1"*/}
                                    {/*                                            // onClick={() => this.downDepartment(row.row_index, row.id, i)}*/}
                                    {/*                                        />*/}
                                    {/*                                        <i className="las la-arrow-up dv-department-icon ml-1"*/}
                                    {/*                                            // onClick={() => this.upDepartment(row.row_index, row.id, i)}*/}
                                    {/*                                        />*/}
                                    {/*                                    </div>*/}
                                    {/*                                </div>*/}
                                    {/*                                <div className='dv-delete-department'>*/}
                                    {/*                                    <div className='dv-department-icon'>*/}
                                    {/*                                        <img src={Trash} className='img-fluid' alt="bed mal"*/}
                                    {/*                                            // onClick={() => this.removeDepartment(row.id)}*/}
                                    {/*                                        />*/}
                                    {/*                                    </div>*/}
                                    {/*                                </div>*/}


                                    {/*                            </div>*/}
                                    {/*                        )}*/}
                                    {/*                    </Draggable>*/}
                                    {/*                ))}*/}
                                    {/*                {provided.placeholder}*/}
                                    {/*            </div>*/}
                                    {/*        )}*/}
                                    {/*    </Droppable>*/}
                                    {/*</DragDropContext>*/}
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
            </>

        );
    }
}


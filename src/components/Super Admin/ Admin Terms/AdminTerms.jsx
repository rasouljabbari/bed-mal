import React, {Component} from 'react';
import './admin-terms.scss'
import Trash from '../../../assets/image/Icon material-delete.svg'
import {Link} from "react-router-dom";
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import {Table} from "antd";
import ReactDragListView from "react-drag-listview";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";


class AdminTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doc_description: '',
            data: [{name: 'Privacy Policy'}, {name: 'Borrow Terms'}, {name: 'Terms of Use'}],
            show_terms: false
        }
        this.columns = [
            {
                title: "",
                dataIndex: "name",
                render: (text, record, index) =>
                    <div className='dv-terms-name'
                         onClick={() => this.showClickedTerm(JSON.stringify(record.id), index)}>{text}</div>
            },
            {
                title: "",
                key: "operate",
                render: (text, record, index) =>
                    <div className="d-flex align-items-center justify-content-end">
                        <a className="drag-handle" href="#"><i
                            className="las la-arrow-down dv-department-icon mr-1"/></a>
                        <a className="drag-handle" href="#"><i className="las la-arrow-up dv-department-icon ml-1"/></a>
                    </div>
            },
            {
                title: "",
                key: "delete",
                render: (text, record, index) =>
                    <div className='dv-department-icon'>
                        <img src={Trash} className='img-fluid' alt="bed mal"
                             onClick={() => this.removeTerms(JSON.stringify(record.id))}/>
                    </div>
            }
        ];
        const that = this;
        this.dragProps = {
            async onDragEnd(fromIndex, toIndex) {
                const data = [...that.state.data];

                const item = data.splice(fromIndex, 1)[0];
                data.splice(toIndex, 0, item);

                let main_row_index;
                if (fromIndex < toIndex) {
                    main_row_index = data[toIndex - 1].row_index
                } else {
                    main_row_index = data[toIndex + 1].row_index
                }

                that.setState({
                    data
                });
                // let departmentItems = await getData(MAIN_URL, `admin/departments/reorder`, 'post', {
                //     department_id: item.id,
                //     row_index: main_row_index
                // }, true, true);
                // if (departmentItems?.status === 200) {
                //     that.setState({
                //         data
                //     });
                // }

            },
            handleSelector: "a",
        };
    }

    async componentDidMount() {
        // setTitle('Departments')
        // let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, true);
        // // console.log(items)
        // if (departmentItems?.status === 200) {
        //     this.setState({data: departmentItems.items})
        // }
    }

    editTerms = () => {
        this.props.history.push('/admin/edit-terms')
    }

    showClickedTerm = async (id, index) => {
        this.setState({show_terms: true, show_term_index: index})
    }

    removeTerms = async (id) => {
        console.log(id)
        this.setState({show: true, removeSelectedId: id})
    }
    removeItemFromList = async () => {
        let arr = [];
        this.setState({show: false})

        // let removeItem = await getData(MAIN_URL, `admin/departments/remove/${this.state.removeSelectedId}`, 'get', {}, true, true);
        // if (removeItem?.status === 200) {
        //
        //     this.state.data.map((item) => {
        //         if (this.state.removeSelectedId != item.id) {
        //             arr.push(item)
        //         }
        //     })
        //     this.setState({data: arr})
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'removed successfully',
        //     })
        // }
    }

    closeModal = () => {
        this.setState({show: false, add_department: false})
    }

    render() {
        // if (this.state.show_terms) {
        //     let element, name, class_name_with_out_id, class_name_with_id;
        //     element = document.getElementsByClassName('ant-table-row')
        //     name = "active";
        //
        //     class_name_with_id = element[this.state.show_term_index].className
        //
        //     class_name_with_out_id = element
        //
        //     console.log(class_name_with_id, class_name_with_out_id)
        //     //
        //     let arr = []
        //     for (let i = 0; i < class_name_with_out_id.length; i++) {
        //         arr.push(class_name_with_out_id[i])
        //         console.log(class_name_with_out_id[i] , class_name_with_out_id)
        //     }
        //
        //     // if(arr.indexOf("tr.ant-table-row.ant-table-row-level-0.active") !== -1){
        //     //     console.log('fff')
        //     //     // element[this.state.show_term_index].className -= ' ' + name;
        //     //     element.classList.remove( 'active');
        //     //
        //     // }
        //     if(class_name_with_out_id)
        //     if (class_name_with_id.search('active') === -1) {
        //         class_name_with_out_id[this.state.show_term_index].className += ' ' + name;
        //     }
        //
        //
        //     console.log(arr, arr.indexOf("tr.ant-table-row.ant-table-row-level-0.active"))
        // }
        return (
            <>
                <div className='d-flex flex-column flex-xl-row dv-vendor'>
                    <div className="dv-terms-right-admin">
                        <div className="dv-btn-add-terms d-flex justify-content-center my-2">
                            <Link to={`/admin/add-terms`}
                                  className="dv-btn-term-new-doc d-flex align-items-center justify-content-center">
                                <span>New doc</span>
                                <i className='las la-plus dv-plus-icon pl-3'/>
                            </Link>
                        </div>

                        <div className="dv-terms-list">
                            <ReactDragListView {...this.dragProps}>
                                <Table
                                    columns={this.columns}
                                    pagination={false}
                                    dataSource={this.state.data}
                                />
                            </ReactDragListView>
                        </div>
                    </div>
                    <div className='dv-terms-right-content'>
                        <div className="row">
                            <div className="col-12 mb-4 d-flex justify-content-between px-4 px-md-5">
                                <h2 className='mb-0'>Borrow Terms</h2>
                                <button onClick={this.editTerms} className='dv-edit-terms'>Edit</button>
                            </div>
                            <div className="col-12 mb-4 d-flex justify-content-between px-4">
                                {
                                    this.state.doc_description ?
                                        <div className="dv-bg-light-terms">
                                            <p>{this.state.doc_description.replace(/\n\r?/g, '<br />')}</p>
                                        </div> :
                                        <div className="dv-bg-light-terms">
                                            <h2 className='text-center'>There is no item</h2>
                                        </div>
                                }
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

export default AdminTerms;
import React, {Component} from 'react';
import './admin-terms.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import LeftSideBarTerms from "./LeftSideBarTerms";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';



class AdminTerms extends Component {
    newDoc = () => {
        console.log('new doc')
    }
    removeDepartment = (id) =>{
        console.log(id)
    }
    downDepartment = (id) =>{
        console.log(id)
    }
    upDepartment = (id) =>{
        console.log(id)
    }
    state = {
        items: [

            <div className='dv-list-items d-flex align-items-center justify-content-around'>
                <span>Privacy Policy</span>
                <div className="d-flex align-items-center justify-content-end">
                    <i className="las la-arrow-down dv-terms-sidebar-icon" onClick={() => this.downDepartment('down')}/>
                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2" onClick={() => this.upDepartment('up')}/>
                    <i className="las la-trash dv-terms-sidebar-icon" onClick={() => this.removeDepartment('trash')}/>
                </div>
            </div>
            ,
            <div className='dv-list-items d-flex align-items-center justify-content-around'>
                <span>Privacy Policy</span>
                <div className="d-flex align-items-center justify-content-end">
                    <i className="las la-arrow-down dv-terms-sidebar-icon" onClick={() => this.downDepartment('down')}/>
                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2" onClick={() => this.upDepartment('up')}/>
                    <i className="las la-trash dv-terms-sidebar-icon" onClick={() => this.removeDepartment('trash')}/>
                </div>
            </div>
            ,
            <div className='dv-list-items d-flex align-items-center justify-content-around'>
                <span>Privacy Policy</span>
                <div className="d-flex align-items-center justify-content-end">
                    <i className="las la-arrow-down dv-terms-sidebar-icon" onClick={() => this.downDepartment('down')}/>
                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2" onClick={() => this.upDepartment('up')}/>
                    <i className="las la-trash dv-terms-sidebar-icon" onClick={() => this.removeDepartment('trash')}/>
                </div>
            </div>
            ,
        ],
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    componentDidMount() {
        setTitle('Legals');
    }

    render() {
        const SortableItem = SortableElement(({value}) => <>{value}</>);

        const SortableList = SortableContainer(({items}) => {
            return (
                <div className='dv-left-sidebar-terms'>
                    <div className="dv-btn-terms-parent-sidebar">
                        <button onClick={this.newDoc} className='dv-btn-term-new-doc'>New doc</button>
                    </div>
                    <div className='dv-navbar-terms'>
                        <div className="d-flex flex-column w-100">
                            {items.map((value, index) => (
                                <SortableItem key={`item-${value}`} index={index} value={value}/>
                            ))}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className='d-flex flex-column flex-md-row'>
                {/*<LeftSideBarTerms/>*/}

                <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>

                <div className="dv-right-content-terms py-3 px-3">
                    <div className="row">
                        <div
                            className="col-12 d-flex flex-column flex-sm-row mb-3 px-md-4 justify-content-between align-items-center">
                            <h1>Borrow Terms</h1>
                            <button className='dv-terms-edit-btn'>Edit</button>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="dv-terms-content p-3 p-md-5">
                                <p>
                                    1. All of our borrow products are free for 5 days.

                                </p>
                                <p>
                                    2. Return to any partnering store on-time, in good condition.

                                </p>
                                <p>
                                    3. Good condition, means in a reusable state or last use due to
                                    wear and tear only. Damage is not wear and tear.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminTerms;
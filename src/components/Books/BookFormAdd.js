import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

const STATUS_BOOK = {
    full : 0,
    soldout: 1
};

class BookFormAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            maSach: '',
            tenSach: '',
            tenTG: '',
            ngayXB: moment().format('YYYY-MM-DD'),
            trangThaiSach: STATUS_BOOK.full
        };
    }

    // On submit Form Add and Edit Books
    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onSaveBook(this.state);
        this.onClearDataForm();
        this.props.onCloseForm();
    }
    // handleChangeFormAdd
    handleChangeFormAdd = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
        
    }
    // OnClick btn Huy Bo thi remove Data vua nhap
    onClearDataForm = () => {
        
        this.setState({
            maSach: '',
            tenSach: '',
            tenTG: '',
            ngayXB: moment().format('YYYY-MM-DD'),
            trangThaiSach: STATUS_BOOK.full
        });
        
    }
    // LifeCycle khi nhan Edit
    componentDidMount = () => {

        if(this.props.bookItemEdit && this.props.bookItemEdit.id !== null) {
            this.setState({
                id: this.props.bookItemEdit.id,
                maSach: this.props.bookItemEdit.maSach,
                tenSach: this.props.bookItemEdit.tenSach,
                tenTG: this.props.bookItemEdit.tenTG,
                ngayXB: moment(this.props.bookItemEdit.ngayXB).format('YYYY-MM-DD'),
                trangThaiSach: this.props.bookItemEdit.trangThaiSach === STATUS_BOOK.full ? 0 : 1
            })
        } else {
            this.onClearDataForm();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.bookItemEdit !== null) {
            this.setState({
                id: nextProps.bookItemEdit.id,
                maSach: nextProps.bookItemEdit.maSach,
                tenSach: nextProps.bookItemEdit.tenSach,
                tenTG: nextProps.bookItemEdit.tenTG,
                ngayXB: moment(nextProps.bookItemEdit.ngayXB).format('YYYY-MM-DD'),
                trangThaiSach: nextProps.bookItemEdit.trangThaiSach === STATUS_BOOK.full ? 0 : 1
            })
        }
        // truong hop Edit -> Add
        else if(nextProps && !nextProps.book) {
            this.onClearDataForm();
        }
    }
    
    render() {
        // Redux mapStateToProps convert state trong store => props
        var { onCloseForm, isDisplayFormAdd } = this.props; 
    
        if(!isDisplayFormAdd) return null ;
        return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">{ !this.state.id ? 'Thêm sách' : 'Cập nhật Sách'}</h3>
                        <span   className="fa fa-times-circle"
                                onClick={ onCloseForm }>
                        </span>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-group">
                                <label>Mã Sách :</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="maSach"
                                        value={this.state.maSach}
                                        onChange={this.handleChangeFormAdd}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Tên Sách :</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="tenSach"
                                        value={this.state.tenSach}
                                        onChange={this.handleChangeFormAdd}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Tên Tác Giả :</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="tenTG"
                                        value={this.state.tenTG}
                                        onChange={this.handleChangeFormAdd}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Ngày XB :</label>
                                <input  type="date" 
                                        className="form-control" 
                                        name="ngayXB"
                                        value={this.state.ngayXB}
                                        onChange={this.handleChangeFormAdd}
                                        />
                            </div>
                            <label>Trạng Thái Sách:</label>
                            <select     className="form-control" 
                                        required="required"
                                        name="trangThaiSach"
                                        value={this.state.trangThaiSach}
                                        onChange={this.handleChangeFormAdd}>
                                <option value={0}>Full</option>
                                <option value={1}>Sold out</option>
                            </select>
                            <br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">{ this.state.id !== '' ? 'Lưu' : 'Thêm'}</button>
                                &nbsp;
                                &nbsp;
                                <button type="submit" className="btn btn-danger" onClick={this.onClearDataForm}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}

// Redux

const mapStateToProps = (state) => {
    return {
        isDisplayFormAdd: state.isDisplayForm,
        bookItemEdit: state.UpdateBookItem
    }
}

const mapDispatchToProps = (dispatch, props) => ({

    onSaveBook: (book) => {  // onSaveBook la 1 dispatch da dc chuyen thanh props
        dispatch(actions.saveBook(book))
    },
    onCloseForm: () => {
        dispatch(actions.closeForm());
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(BookFormAdd);
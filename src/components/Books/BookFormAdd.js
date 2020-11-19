import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './../../actions/index'

class BookFormAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            maSach: '',
            tenSach: '',
            tenTG: '',
            ngayXB: moment().format('YYYY-MM-DD'),
            trangThaiSach: 0
        };
    }
    
    onRemoveFormAdd = () => {
        this.props.onRemoveFormAdd();
    }

    // On submit Form Add Books
    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onAddBook(this.state);
        this.onClearDataForm();
        this.onRemoveFormAdd();
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
            ngayXB: '',
            trangThaiSach: 0
        })
    }
    // LifeCycle khi nhan Edit
    componentDidMount = () => {
        
        if(this.props.bookEdit && this.props.bookEdit !== null) {
            this.setState({
                id: this.props.bookEdit.id,
                maSach: this.props.bookEdit.maSach,
                tenSach: this.props.bookEdit.tenSach,
                tenTG: this.props.bookEdit.tenTG,
                ngayXB: moment(this.props.ngayXB).format('YYYY-MM-DD'),
                trangThaiSach: this.props.bookEdit.trangThaiSach
            })
        } else {
            this.onClearDataForm();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps !== null && nextProps.book !== null) {
            this.setState({
                id: nextProps.book.id,
                maSach: nextProps.book.maSach,
                tenSach: nextProps.book.tenSach,
                tenTG: nextProps.book.tenTG,
                ngayXB: moment(this.props.ngayXB).format('YYYY-MM-DD'),
                trangThaiSach: nextProps.book.trangThaiSach
            })
        }
        // truong hop Edit -> Add
        else if(nextProps && !nextProps.book) {
            this.setState({
                id: '',
                maSach: '',
                tenSach: '',
                tenTG: '',
                ngayXB: moment().format('YYYY-MM-DD'),
                trangThaiSach: 0
            })
        }
    }
    
    render() {
        // console.log(this.state.ngayXB);
        return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">{ this.state.id !== '' ? 'Cập nhật sách' : 'Thêm Sách'}</h3>
                        <span   className="fa fa-times-circle"
                                onClick={this.onRemoveFormAdd}>
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

    }
}

const mapDispatchToProps = (dispatch, props) => ({

    onAddBook: (book) => {  // onAddBook la 1 dispatch da dc chuyen thanh props
        dispatch(actions.addBook(book))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(BookFormAdd);
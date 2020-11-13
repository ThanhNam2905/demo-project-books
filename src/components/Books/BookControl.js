import React, { Component } from 'react';
import BookControlSearch from './BookControlSearch';
import BookControlSort from './BookControlSort';

class BookControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* Conponent Search */}
                <BookControlSearch onHandleSearch={this.props.onHandleSearch}/>
                {/* Conponent Sort */}
                <BookControlSort onSortBy={this.props.onSortBy}/>
              </div>
        );
    }
}

export default BookControl;
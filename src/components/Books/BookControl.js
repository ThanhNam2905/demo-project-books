import React, { Component } from 'react';
import BookControlSearch from './BookControlSearch';
import BookControlSort from './BookControlSort';

class BookControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* Conponent Search */}
                <BookControlSearch/>
                {/* Conponent Sort */}
                <BookControlSort/>
              </div>
        );
    }
}

export default BookControl;
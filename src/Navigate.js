import React from 'react';
import { Link } from 'react-router-dom';

class Navigate extends React.Component {
    render() {
        return (
            <div className="navigate">
                <Link to="/" className="nav">Home</Link>
                <Link to="/add" className="nav">Add movie</Link>
            </div>
        )
    }
}

export default Navigate;
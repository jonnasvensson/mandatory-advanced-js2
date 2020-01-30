import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: {}, 
            error: false,
        }
    }
    componentDidMount() { 
        let id = this.props.match.params.id;
        console.log('ID', id);

        axios.get("http://3.120.96.16:3001/movies/" + id)
        .then(response => {
            let movie = response.data;
            console.log(movie);
            
            if (movie) {
                this.setState({ movie: movie });
            }
        })
        .catch(err => {
            console.log('Err', err);
            this.setState({ error: true })
        })
        
    }
    render() {
        if (this.state.error) {
            return <p style={{ color: "red" }}>This movie does not exist anymore, someone else has already deleted the fabulous movie!</p>;
        }
        let movie = this.state.movie

        return (
            <div>
                <Helmet>
                    <title>{movie.title}</title>
                </Helmet>
                <div>
                    <h4>Title</h4>
                    <p>{movie.title}</p>
                </div>
                <div>
                    <h4>Director</h4>
                    <p>{movie.director}</p>
                </div>
                <div>
                    <h4>Rating</h4>
                    <p>{movie.rating}</p>
                </div>
                <div>
                    <h4>Description</h4>
                    <p>{movie.description}</p>
                </div>
                <Link to={'/edit/' + movie.id}><button className="addEditButton">Edit movie</button></Link>
            </div>
        )
    }
}

export default Details;
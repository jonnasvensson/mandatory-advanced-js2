import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            movie: {
                title: "",
                director: "",
                descrition: "",
                rating: "",
            },
            search: "",
            redirect: false,
        }
    }
    componentDidMount = () => {
        this.fetchMovies();
    }
    deleteOnClick = (id) => {
        console.log('hej');

        axios.delete("http://3.120.96.16:3001/movies/" + id)
            .then(() => {
                this.setState({ redirect: true });
                this.fetchMovies();
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchMovies = () => {
        axios.get("http://3.120.96.16:3001/movies/")
            .then(res => {
                this.setState({ movies: res.data });
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    upDateSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    renderTable() {

        return this.state.movies
            .filter(movie => {
                if (movie.title.toLowerCase().includes(this.state.search.toLowerCase()) || movie.director.toLowerCase().includes(this.state.search.toLowerCase())) return movie;
            })
            .map(movie => {
                const { id, title, director, rating } = movie
                return (
                    <tr key={id}>
                        <td><Link to={'/movies/' + movie.id}>{title}</Link></td>
                        <td>{director}</td>
                        <td>{rating}</td>
                        <td><button onClick={() => this.deleteOnClick(id)}>Delete movie</button></td>
                        <td><Link to={'/edit/' + movie.id}><button>Edit movie</button></Link></td>
                    </tr>
                )
            }
            )
    }

    render() {
        return (
            <div className="homeContainer">
                <div>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                </div>
                <input className="searchInput" type="text" placeholder="Search" value={this.state.search} onChange={this.upDateSearch} />
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home;


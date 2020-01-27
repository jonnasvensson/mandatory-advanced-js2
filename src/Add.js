import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                title: "",
                director: "",
                rating: "",
                description: "",
            },
            redirect: false,
            id: "",
        };
    }

    changeInput = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        let movie = Object.assign({}, this.state.movie);    //  Object.assign --> lägger ihop object (this.state.movie blir det tomma objectet!)
        movie[name] = value;
        this.setState({ movie });
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log('hej');

        axios.post("http://3.120.96.16:3001/movies", this.state.movie)
            .then((res) => {
                console.log(res.data.id);

                this.setState({ redirect: true, id: res.data.id })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let error, missingTitle, missingDirector, missingDescription, missingRating;

        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        if (this.state.error) {
            if (this.state.movie.title.length === 0) {
                missingTitle = <p style={{ color: "red" }}>Title is missing</p>
            }
            if (this.state.movie.director.length === 0) {
                missingDirector = <p style={{ color: "red" }}>Director is missing</p>
            }
            //  Ser ej vad som felar med description!
            /*             if (this.state.movie.description.length === 0) {
                            missingDescription = <p>Description was missing</p>
                        }
                        if (this.state.movie.rate.length === 0) {
                            missingRating = <p>Rating was missing</p>
                        }
             */
                    }
        return (
            <>
            <div>
                <Helmet>
                    <title>Add movie</title>
                </Helmet>
            </div>
            <form onSubmit={this.onSubmit}>
                    <div className="inputContainer">
                        <div className="inputDiv">
                            <h3>Title</h3>
                            <input
                                type="text"
                                value={this.state.movie.title}
                                name="title"
                                minLength="1"
                                maxLength="40"
                                onChange={this.changeInput}
                            />
                            {missingTitle}
                        </div>
                        <div className="inputDiv">
                            <h3>Director</h3>
                            <input
                                type="text"
                                value={this.state.movie.director}
                                name="director"
                                minLength="1"
                                maxLength="40"
                                onChange={this.changeInput}
                            />
                            {missingDirector}
                        </div>
                    </div>
                    <div className="inputDiv">
                        <h3>Description</h3>
                        <textarea className="description"
                            type="text"
                            value={this.state.movie.description}
                            name="description"
                            minLength="1"
                            maxLength="300"
                            onChange={this.changeInput}
                        />
                        {missingDescription}
                    </div>
                    <div className="inputDiv">
                        <h3>Rating</h3>
                    <input className="rating"
                            type="number"
                            value={this.state.movie.rating}
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            onChange={this.changeInput}
                        />
                        {missingRating}
                    </div>
                    <div>
                        <button className="addEditutton" type="submit">Add movie</button>
                    </div>
                </form>
            </>
        )
    }
}

export default Add;
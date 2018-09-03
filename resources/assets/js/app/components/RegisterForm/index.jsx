import React, {Component} from 'react';
import Button from 'react-bootstrap-button-loader';
import {createUser} from "../../actions/user";
import {Redirect} from 'react-router-dom';


export default class RegisterForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        isFetching: false,

        errors: {
            name: false,
            email: false,
            password: false,
            password_confirmation: false
        },

        userExists: false,
        userCreated: false
    };

    handleInputChange = event => {
        const { target } = event;
        const { name } = target;
        const value = target.value;

        let errors = {};
        Object.keys(this.state.errors).forEach(key => errors[key] = false);

        this.setState({
            [name]: value,
            errors
        });
    };

    validateForm = () => {
        let errors = this.state.errors;
        const r = /^\w+@\w+\.\w{2,4}$/i;
        if (this.state.name.length < 3) {
            errors.name = true;
        }
        if (!r.test(this.state.email)) {
            errors.email = true;
        }
        if (this.state.password.length < 6) {
            errors.password = true;
        }
        if (this.state.password !== this.state.password_confirmation) {
            errors.password_confirmation = true;
        }
        this.setState({errors});
        return !Object.values(errors).filter(value => value === true).length;
    };

    submitHandler = () => {
        const { name, email, password } = this.state;
        if (this.validateForm()) {
            this.setState({ isFetching: true });
            createUser({name, email, password}, (data) => {
                this.setState({ isFetching: false });
                if (data.status === 'error') {
                    this.setState({ userExists: true });
                }
                else {
                    this.setState({ userCreated: true });
                }
            });
        }
    };

    errorHint = field => {
        const errorMessages = {
            name: 'Incorrect name',
            email: 'Incorrect email',
            password: 'Password to short',
            password_confirmation: 'This field and password should be the same'
        };

        return (
            <span className="invalid-feedback" role="alert">
                                        <strong>{errorMessages[field]}</strong>
                                    </span>
        );
    };

    userExists = () => {
        if (!this.state.userExists) return;
        return (
            <div className="alert alert-danger">
                User with this E-mail already exist
                <button type="button" className="close" onClick={() => this.setState({ userExists: false })}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    };

    render() {
        const styles = {
            false: '',
            true: 'is-invalid'
        };

        if (this.state.userCreated) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-md-8">
                        {this.userExists()}
                        <div className="card">
                            <div className="card-header">Register</div>

                            <div className="card-body">

                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                    <div className="col-md-6">
                                        <input id="name" type="text"
                                               className={`form-control ${styles[this.state.errors.name]}`}
                                               name="name" value={this.state.name} autoFocus onChange={this.handleInputChange}/>
                                        {this.errorHint('name')}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                                        E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email"
                                               className={`form-control ${styles[this.state.errors.email]}`}
                                               name="email" value={this.state.email} onChange={this.handleInputChange}/>
                                        {this.errorHint('email')}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">
                                        Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password"
                                               className={`form-control ${styles[this.state.errors.password]}`}
                                               name="password" value={this.state.password} onChange={this.handleInputChange}/>
                                        {this.errorHint('password')}

                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password-confirm"
                                           className="col-md-4 col-form-label text-md-right">
                                        Confirm Password</label>

                                    <div className="col-md-6">
                                        <input id="password-confirm" type="password" className={`form-control ${styles[this.state.errors.password]}`}
                                               name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleInputChange}/>
                                        {this.errorHint('password_confirmation')}

                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <Button loading={this.state.isFetching} className="btn btn-primary" onClick={this.submitHandler}>
                                            Register
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React, {Component} from 'react';
import Button from 'react-bootstrap-button-loader';
import {observer, inject} from 'mobx-react';
import {login} from "../../actions/auth";
import {Redirect} from 'react-router-dom';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        isFetching: false,
        wrongUser: false,
    };

    clickHandler = ev => {
        const { email, password } = this.state;

        if (email === '' || password === '') return;

        this.setState({ isFetching: true });

        login(email, password, (errors) => {
            this.setState({
                isFetching: false,
                wrongUser: !errors
            })
        });
    };

    handleInputChange = event => {
        const { target } = event;
        const { name } = target;
        const value = target.value;

        this.setState({
            [name]: value
        });
    };

    wrongUser = () => {
        if (!this.state.wrongUser) return;
        return (
            <div className="alert alert-danger">
                Email or password is incorrect
                <button type="button" className="close" onClick={() => this.setState({ wrongUser: false })}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    };


    render() {
        if (this.props.authStore.isAuth) {
            return (
                <Redirect to="/"/>
            );
        }
        return (
            <form>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {this.wrongUser()}
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <div className="form-group row">
                                    <label htmlFor="email"
                                           className="col-sm-4 col-form-label text-md-right">E-mail</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email"
                                               className="form-control"
                                               value={this.state.email}
                                               name="email" required autoFocus onChange={this.handleInputChange}/>

                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password"
                                           className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password"
                                               className="form-control"
                                               value={this.state.password}
                                               name="password" required onChange={this.handleInputChange}/>

                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <Button type="submit" loading={this.state.isFetching} className="btn btn-primary" onClick={this.clickHandler}>
                                            Login
                                        </Button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}

export default inject('authStore')(observer(LoginForm));
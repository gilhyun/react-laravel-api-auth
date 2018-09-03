import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import '../../styles/laravel.css';
import {logout} from "../../actions/auth";
import {Preloader} from "../Preloader";
import FadeIn from 'react-fade-in';

class WelcomePage extends Component {

    header = () => {
        const { authStore } = this.props;
        if (authStore.isAuth) {
            return (
                <Fragment>
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <a className="a" onClick={logout} style={{'cursor': 'pointer'}}>Logout ({authStore.user.name})</a>
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </Fragment>
            );
        }
    };

    componentDidMount() {
        const { store } = this.props;
        store.isLoading = true;
        setTimeout(() => store.isLoading = false, 700);
    }

    render()
    {
        const { store } = this.props;

        if (store.isLoading) {
            return <Preloader/>;
        }

        return (
            <FadeIn>
                <div className="flex-center position-ref full-height">
                    <div className="top-right links">
                        {this.header()}
                    </div>

                    <div className="content">
                        <div className="title m-b-md">
                            Laravel
                        </div>

                        <div className="links">
                            <a href="https://laravel.com/docs">Documentation</a>
                            <a href="https://laracasts.com">Laracasts</a>
                            <a href="https://laravel-news.com">News</a>
                            <a href="https://forge.laravel.com">Forge</a>
                            <a href="https://github.com/laravel/laravel">GitHub</a>
                        </div>

                    </div>
                </div>
            </FadeIn>
        );
    }
}

export default inject('authStore', 'store')(observer(WelcomePage));
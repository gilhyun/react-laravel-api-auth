import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import '../../styles/laravel.css';
import FadeIn from 'react-fade-in';

export default class Page404 extends Component {

    render()
    {
        const { store } = this.props;

        return (
            <FadeIn>
                <div className="flex-center position-ref full-height">
                    <div className="top-right links">
                        <Link to={"/"}>Home</Link>
                    </div>

                    <div className="content">
                        <div className="title m-b-md">
                            404 not found
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


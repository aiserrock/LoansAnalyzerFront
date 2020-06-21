import React, {Component} from 'react'
import './Page404.scss'

export default class Page404 extends Component {
    render(){
        return(
            <div className={'page-404'}>
                <div className={'page-404__content'}>
                    <h1 className={'text-danger mb-2'}>Ошибка 404</h1>
                    <h2>Страница не найдена!☹</h2>
                </div>
            </div>
        )
    }
}
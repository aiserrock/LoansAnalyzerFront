import React, {Component} from 'react'
import './Table.scss'

export default class Table extends Component {
    componentDidMount = async () => {
        if (this.props.data.length === 0)
            await this.props.getData(0)
        this.props.changeDisplayedTen()
    }

    backHandler = async () => {
        if (this.props.activeTen > 0) {
            await this.props.changeActiveTen(this.props.activeTen - 1)
            this.props.changeDisplayedTen()
        }
    }

    forwardHandler = async () => {
        const currentNumberOfItems = Math.ceil(this.props.data.length / 10) - 1
        const num = Math.ceil(this.props.data.length / 10)  * 10
        if (this.props.activeTen === currentNumberOfItems && this.props.data.length >= num) {
            await this.props.getData(num)
            await this.props.changeActiveTen(this.props.activeTen + 1)
        } else if (this.props.activeTen < currentNumberOfItems) {
            await this.props.changeActiveTen(this.props.activeTen + 1)
        } else
            return null
        this.props.changeDisplayedTen()
    }

    render() {
        return (
            <>
                <div className="my-table">
                    {
                        this.props.renderTableBody()
                    }
                </div>
                <div className="d-flex">
                    <button className={'btn btn-secondary mr-auto'} onClick={this.backHandler}>
                        <i className="fa fa-angle-left" aria-hidden="true"/>
                    </button>
                    {
                        this.props.renderOptionButton ? this.props.renderOptionButton() : null
                    }
                    <button className={'btn btn-secondary ml-auto'} onClick={this.forwardHandler}>
                        <i className="fa fa-angle-right" aria-hidden="true"/>
                    </button>
                </div>
            </>
        )
    }
}
import React, {Component} from 'react'
import './Table.scss'

export default class Table extends Component {
    state = {
        currentNumberOfItems: 0,
        activeTen: 0,
    }

    componentDidMount = async () => {
        if (this.props.data.length === 0)
            await this.props.getData(0)
        else
            this.setState({
                currentNumberOfItems: Math.ceil(this.props.data.length / 10),
            })
        this.changeDisplayedTen()
    }

    backHandler = () => {
        if (this.state.activeTen > 0) {
            this.setState({
                activeTen: --this.state.activeTen,
            })
            this.changeDisplayedTen()
        }
    }

    forwardHandler = async () => {
        const num = this.state.currentNumberOfItems * 10 + 10
        if (this.state.activeTen === this.state.currentNumberOfItems && this.props.data.length >= num) {
            await this.props.getData(num)
            this.setState({
                currentNumberOfItems: ++this.state.currentNumberOfItems,
                activeTen: ++this.state.activeTen,
            })
        } else if (this.state.activeTen < this.state.currentNumberOfItems) {
            this.setState({
                activeTen: ++this.state.activeTen,
            })
        } else
            return null
        this.changeDisplayedTen()
    }

    changeDisplayedTen = () => {
        const num = this.state.activeTen * 10
        const displayedTen = []
        for (let i = num; i < num + 10; i++) {
            if (this.props.data[i])
                displayedTen.push(this.props.data[i])
            else break
        }
        this.props.changeDisplayTen(displayedTen)
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
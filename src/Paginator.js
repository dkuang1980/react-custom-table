import React, { Component, PropTypes } from 'react'


export default class Paginator extends Component {

  static propTypes = {
    paginatorClass: PropTypes.string,
    activePageClass: PropTypes.string,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    pageLimit: PropTypes.number,
    pageFormat: PropTypes.func,
    nextFormat: PropTypes.func,
    prevFormat: PropTypes.func,
    firstFormat: PropTypes.func,
    lastFormat: PropTypes.func,
    onPageClick: PropTypes.func
  }

  static defaultProps = {
    total: 0,
    pageSize: 10,
    pageLimit: 5,
    activePageClass: 'active'
  }

  constructor(props){
    super(props)

    const { total, pageSize } = props

    this.state = {
      totalPages: total % pageSize === 0 ? parseInt(total / pageSize) : parseInt(total / pageSize) + 1,
      activePage: 0
    }
  }

  componentWillUpdate(props, state){
    const { total, pageSize } = props
    const { activePage } = state
    const totalPages = total % pageSize === 0 ? total / pageSize : total / pageSize + 1

    this.setState({
      totalPages,
      activePage: activePage < totalPages ? totalPages : 0
    })
  }

  handlePageClick(page){
    const { onPageClick } = this.props

    this.setState({
      activePage: page
    })

    onPageClick && onPageClick(page)
  }

  render(){
    const { paginatorClass,
            activePageClass,
            total,
            pageLimit,
            firstFormat,
            lastFormat,
            nextFormat,
            prevFormat,
            pageFormat } = this.props

    const { totalPages,
            activePage, } = this.state

    let pagelowerBound = activePage - pageLimit / 2
    let pageUpperBound = activePage + pageLimit / 2

    if (pagelowerBound < 0){
      pagelowerBound = 0
      pageUpperBound = pageLimit - 1
    }

    if (pageUpperBound > total - 1){
      pagelowerBound = total - 1
      pageUpperBound = total - pageLimit
    }

    return (
      <ul className={paginatorClass}>
        {
          firstFormat && activePage > 0 ?
            <li onClick={this.handlePageClick.bind(this, 0)}>
              {firstFormat()}
            </li> : null
        }
        {
          prevFormat && activePage > 0 ?
            <li onClick={this.handlePageClick.bind(this, activePage - 1)}>
              {prevFormat()}
            </li> : null
        }
        {Array(totalPages).fill().map((_, i) =>
          {
            return (
              i >= pagelowerBound && i <= pageUpperBound ?
                <li
                  key={i}
                  onClick={this.handlePageClick.bind(this, i)}
                  className={i === activePage ? activePageClass : null}>
                  {pageFormat ? pageFormat(i) : i}
                </li> : null
            )
          }
        )}
        {
          nextFormat && activePage < total - 1 ?
            <li onClick={this.handlePageClick.bind(this, activePage + 1)}>
              {nextFormat()}
            </li> : null
        }
        {
          lastFormat && activePage < total - 1 ?
            <li onClick={this.handlePageClick.bind(this, total - 1)}>
              {lastFormat()}
            </li> : null
        }
      </ul>
    )
  }
}
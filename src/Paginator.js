import React, { Component, PropTypes } from 'react'


export default class Paginator extends Component {

  static propTypes = {
    paginatorClass: PropTypes.string,
    paginatorContainerClass: PropTypes.string,
    activePageClass: PropTypes.string,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    activePage: PropTypes.number,
    pageLimit: PropTypes.number,
    pagePageFormat: PropTypes.func,
    nextPageFormat: PropTypes.func,
    prevPageFormat: PropTypes.func,
    firstPageFormat: PropTypes.func,
    lastPageFormat: PropTypes.func,
    extraPageFormat: PropTypes.func,
    onPageClick: PropTypes.func
  }

  static defaultProps = {
    total: 0,
    pageSize: 10,
    activePage: 0,
    pageLimit: 5,
    activePageClass: 'active'
  }

  constructor(props){
    super(props)

    const { total, pageSize } = props

    this.totalPages = total % pageSize === 0 ? parseInt(total / pageSize) : parseInt(total / pageSize) + 1
  }

  componentWillUpdate(props){
    const { total,
            pageSize,
            activePage,
            onPageClick } = props

    this.totalPages = total % pageSize === 0 ? parseInt(total / pageSize) : parseInt(total / pageSize) + 1

    if (this.totalPages - 1 < activePage)
      onPageClick && onPageClick(0)
  }

  handlePageClick(page){
    const { onPageClick } = this.props

    onPageClick && onPageClick(page)
  }

  renderFirstPage(){
    const { firstPageFormat,
            activePage } = this.props

    return (
      firstPageFormat && activePage > 0 ?
        <li onClick={this.handlePageClick.bind(this, 0)}>
          {firstPageFormat()}
        </li> : null
    )
  }

  renderPrevPage(){
    const { prevPageFormat,
            activePage } = this.props

    return (
      prevPageFormat && activePage > 0 ?
        <li onClick={this.handlePageClick.bind(this, activePage - 1)}>
          {prevPageFormat()}
        </li> : null
    )
  }

  renderPages(){
    const { activePageClass,
            pageLimit,
            total,
            pageFormat,
            activePage } = this.props

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
       Array(this.totalPages).fill().map((_, i) =>
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
        })
    )
  }

  renderNextPage(){
    const { nextPageFormat,
            activePage } = this.props

    return (
      nextPageFormat && activePage > 0 ?
        <li onClick={this.handlePageClick.bind(this, activePage + 1)}>
          {nextPageFormat()}
        </li> : null
    )
  }

  renderLastPage(){
    const { lastPageFormat,
            total,
            activePage } = this.props

    return (
      lastPageFormat && activePage > 0 ?
        <li onClick={this.handlePageClick.bind(this, total - 1)}>
          {lastPageFormat()}
        </li> : null
    )
  }

  render(){
    const { paginatorContainerClass,
            paginatorClass,
            total,
            pageSize,
            pageLimit,
            extraFormat,
            activePage } = this.props

    return (
      <div className={paginatorContainerClass}>
        {extraFormat ? extraFormat(this.totalPages, activePage, total, pageSize) : null}

        <ul className={paginatorClass}>
          { this.renderFirstPage() }
          { this.renderPrevPage() }
          { this.renderPages() }
          { this.renderNextPage() }
          { this.renderLastPage() }
        </ul>
      </div>
    )
  }
}
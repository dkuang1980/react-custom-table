import React, { Component, PropTypes } from 'react'


export default class Paginator extends Component {

  static propTypes = {
    paginatorClass: PropTypes.string,
    activePageClass: PropTypes.string,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    activePage: PropTypes.number,
    pageLimit: PropTypes.number,
    pageTemplate: PropTypes.func,
    nextPageTemplate: PropTypes.func,
    prevPageTemplate: PropTypes.func,
    firstPageTemplate: PropTypes.func,
    lastPageTemplate: PropTypes.func,
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
    const { firstPageTemplate,
            activePage } = this.props

    return (
      firstPageTemplate && activePage > 0 ?
        <li onClick={this.handlePageClick.bind(this, 0)}>
          {firstPageTemplate()}
        </li> : null
    )
  }

  renderPrevPage(){
    const { prevPageTemplate,
            activePage } = this.props

    return (
      prevPageTemplate && activePage > 0 ?
        <li onClick={this.handlePageClick.bind(this, activePage - 1)}>
          {prevPageTemplate()}
        </li> : null
    )
  }

  renderPages(){
    const { activePageClass,
            pageLimit,
            total,
            pageTemplate,
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
                {pageTemplate ? pageTemplate(i) : i}
              </li> : null
          )
        })
    )
  }

  renderNextPage(){
    const { nextPageTemplate,
            activePage } = this.props

    return (
      nextPageTemplate && activePage < this.totalPages - 1 ?
        <li onClick={this.handlePageClick.bind(this, activePage + 1)}>
          {nextPageTemplate()}
        </li> : null
    )
  }

  renderLastPage(){
    const { lastPageTemplate,
            activePage } = this.props

    return (
      lastPageTemplate && activePage < this.totalPages - 1 ?
        <li onClick={this.handlePageClick.bind(this, this.totalPages - 1)}>
          {lastPageTemplate()}
        </li> : null
    )
  }

  render(){
    const { paginatorClass,
            total,
            pageSize,
            pageLimit,
            extraTemplate,
            activePage } = this.props

    return (
      <ul className={paginatorClass}>
        { this.renderFirstPage() }
        { this.renderPrevPage() }
        { this.renderPages() }
        { this.renderNextPage() }
        { this.renderLastPage() }
      </ul>
    )
  }
}
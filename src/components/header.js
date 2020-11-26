/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react"
import { Link } from "react-router-dom"

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="max-width">
          <div className="wrapper-logo">
            <a href="/" title="Contentstack">
              <img
                className="logo"
                src={this.props.header.logo.url}
                alt={this.props.header.logo.filename}
              />
            </a>
          </div>
          <nav>
            <ul>
              {this.props.header.navigation_menu.map((list) => (
                <li key={list.label}>
                  <Link
                    to={list.page_reference[0].url}
                    className={
                      this.props.activeTab === list.label ? "active" : ""
                    }
                  >
                    {list.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
export default Header

/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react"
import Stack from "../sdk/entry"
import Layout from "../components/layout"

export default class Error extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: undefined,
      footer: undefined,
    }
  }

  async componentDidMount() {
    try {
      const header = await Stack.getEntryWithRef(
        "header",
        "navigation_menu.page_reference",
        "en-us"
      )
      const footer = await Stack.getEntry("footer", "en-us")
      this.setState({
        header: header[0][0],
        footer: footer[0][0],
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    if (this.state.header && this.state.footer) {
      return (
        <Layout header={this.state.header} footer={this.state.footer}>
          <div className="error-page">
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          </div>
        </Layout>
      )
    }

    return ""
  }
}

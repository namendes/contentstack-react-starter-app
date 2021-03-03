/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react"
import Stack from "../sdk/entry"

import Layout from "../components/layout"
import RenderComponenets from "../components/render-components"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    }
  }

  async componentDidMount() {
    try {
      const result = await Stack.getSpecificEntryWithRef(
        "page",
        this.props.location.pathname,
        ["page_components.from_blog.featured_blogs"],
        "en-us"
      )
      const header = await Stack.getEntryWithRef(
        "header",
        "navigation_menu.page_reference",
        "en-us"
      )
      const footer = await Stack.getEntry("footer", "en-us")
      this.setState({
        entry: result[0],
        header: header[0][0],
        footer: footer[0][0],
        error: { errorStatus: false },
      })
    } catch (error) {
      console.error(error)
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      })
    }
  }

  render() {
    return !this.state.error.errorStatus && this.state.entry ? (
      <Layout
        header={this.state.header}
        footer={this.state.footer}
        seo={this.state.entry.seo}
        activeTab="Home"
      >
        <RenderComponenets pageComponents={this.state.entry.page_components} />
      </Layout>
    ) : this.state.error.errorStatus ? (
      this.props.history.push("/error", [this.state.error])
    ) : (
      ""
    )
  }
}
export default Home

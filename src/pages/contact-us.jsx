/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from "react"
import Skeleton from "react-loading-skeleton"
import Stack from "../sdk/entry"

import Layout from "../components/layout"
import RenderComponents from "../components/render-components"

class ContactUs extends React.Component {
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
        activeTab="Contact Us"
      >
        <RenderComponents pageComponents={this.state.entry.page_components} />
      </Layout>
    ) : this.state.error.errorStatus ? (
      this.props.history.push("/error", [this.state.error])
    ) : (
      <Skeleton count={40} />
    )
  }
}
export default ContactUs

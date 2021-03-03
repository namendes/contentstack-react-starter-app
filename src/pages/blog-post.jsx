/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from "react"
import moment from "moment"
import ReactHtmlParser from "react-html-parser"
import Stack from "../sdk/entry"
import Layout from "../components/layout"

import ArchiveRelative from "../components/archive-relative"
import RenderComponents from "../components/render-components"

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      banner: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    }
  }

  async componentDidMount() {
    try {
      const banner = await Stack.getSpecificEntry("page", "/blog", "en-us")
      const blog = await Stack.getSpecificEntryWithRef(
        "blog_post",
        this.props.location.pathname,
        ["author", "related_post"],
        "en-us"
      )
      const header = await Stack.getEntryWithRef(
        "header",
        "navigation_menu.page_reference",
        "en-us"
      )
      const footer = await Stack.getEntry("footer", "en-us")
      this.setState({
        entry: blog[0],
        banner: banner[0],
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
        activeTab="Blog"
      >
        <RenderComponents
          pageComponents={this.state.banner.page_components}
          blogsPage
        />
        <div className="blog-container">
          <div className="blog-detail">
            <h2>{this.state.entry.title ? this.state.entry.title : ""}</h2>
            <p>
              {moment(this.state.entry.date).format("ddd, MMM D YYYY")},{" "}
              <strong>{this.state.entry.author[0].title}</strong>
            </p>
            {ReactHtmlParser(this.state.entry.body)}
          </div>
          <div className="blog-column-right">
            <div className="related-post">
              {this.state.banner.page_components[2].widget && (
                <h2>{this.state.banner.page_components[2].widget.title_h2}</h2>
              )}
              {this.state.entry.related_post && (
                <ArchiveRelative blogs={this.state.entry.related_post} />
              )}
            </div>
          </div>
        </div>
      </Layout>
    ) : this.state.error.errorStatus ? (
      this.props.history.push("/error", [this.state.error])
    ) : (
      ""
    )
  }
}
export default BlogPost

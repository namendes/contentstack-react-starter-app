/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from "react"

import moment from "moment"
import { Link } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"
import Stack from "../sdk/entry"
import Layout from "../components/layout"
import ArchiveRelative from "../components/archive-relative"
import RenderComponents from "../components/render-components"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      blogList: [],
      archived: [],
      header: undefined,
      footer: undefined,
      error: {
        errorStatus: false,
        errorCode: undefined,
        errorData: undefined,
      },
    }
  }

  async componentDidMount() {
    try {
      const blog = await Stack.getSpecificEntry(
        "page",
        this.props.location.pathname,
        "en-us"
      )
      const result = await Stack.getEntryWithRef(
        "blog_post",
        ["author", "related_post"],
        "en-us"
      )
      const header = await Stack.getEntryWithRef(
        "header",
        "navigation_menu.page_reference",
        "en-us"
      )
      const footer = await Stack.getEntry("footer", "en-us")

      const archive = []
      const blogLists = []
      result[0].forEach((blogs) => {
        if (blogs.is_archived) {
          archive.push(blogs)
        } else {
          blogLists.push(blogs)
        }
      })

      this.setState({
        entry: blog[0],
        header: header[0][0],
        footer: footer[0][0],
        blogList: blogLists,
        archived: archive,
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
          pageComponents={this.state.entry.page_components}
          blogsPage
        />
        <div className="blog-container">
          <div className="blog-column-left">
            {this.state.blogList?.map((bloglist, index) => (
              <div className="blog-list" key={index}>
                {bloglist.featured_image && (
                  <Link href={bloglist.url}>
                    <img
                      alt="blog img"
                      className="blog-list-img"
                      src={bloglist.featured_image.url}
                    />
                  </Link>
                )}
                <div className="blog-content">
                  {bloglist.title && (
                    <Link to={bloglist.url}>
                      <h3>{bloglist.title}</h3>
                    </Link>
                  )}
                  <p>
                    {moment(bloglist.date).format("ddd, MMM D YYYY")},{" "}
                    <strong>{bloglist.author[0].title}</strong>
                  </p>
                  {bloglist.body &&
                    ReactHtmlParser(bloglist.body.slice(0, 300))}
                  {bloglist.url ? (
                    <Link to={bloglist.url}>
                      <span>{"Read more -->"}</span>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="blog-column-right">
            {this.state.entry.page_components[1].widget && (
              <h2>{this.state.entry.page_components[1].widget.title_h2} </h2>
            )}
            <ArchiveRelative blogs={this.state.archived} />
          </div>
        </div>
      </Layout>
    ) : this.state.error.errorStatus ? (
      this.props.history.push("/error", [this.state.error])
    ) : this.state.error.errorStatus ? (
      this.props.history.push("/error", [this.state.error])
    ) : (
      ""
    )
  }
}

export default Blog

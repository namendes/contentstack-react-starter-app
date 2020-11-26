/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from "react"
import Stack from "../sdk/entry"
import Layout from "../components/layout"
import RelatedLinks from "../components/relatedLinks"

function dateSetter(params) {
  const date = new Date(params)
  const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date)
  const mm = new Intl.DateTimeFormat("en", { month: "short" }).format(date)
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date)
  return `${mm}-${dd}-${yy}`
}

class BlogPost extends React.Component {
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
      const blog = await Stack.getSpecificEntry(
        "blog_post",
        this.props.location.pathname.split("/blog")[1],
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
        <div className="blog-post">
          <div className="max-width flex padding-both tall">
            <div className="col-quarter">
              <div className="page-thumb padding-bottom">
                <img
                  src="https://via.placeholder.com/200x140"
                  alt="Blog Title"
                />
              </div>
            </div>
            <div className="col-half">
              <h2>{this.state.entry.title}</h2>
              <p className="blog-meta">
                <span className="date">
                  {dateSetter(this.state.entry.date)}
                </span>
                <span className="author">
                  {this.state.entry.author[0].title}
                </span>
              </p>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: `${this.state.entry.body}`,
                }}
              />
            </div>
            <div className="col-quarter">
              <div className="padding-left">
                {this.state.entry.related_post ? (
                  <RelatedLinks relatedPages={this.state.entry.related_post} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    ) : (
      ""
    )
  }
}
export default BlogPost

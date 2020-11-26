/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from "react"
import Stack from "../sdk/entry"
import Layout from "../components/layout"
import Banner from "../components/banner"

function dateSetter(params) {
  const date = new Date(params)
  const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date)
  const mm = new Intl.DateTimeFormat("en", { month: "short" }).format(date)
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date)
  return `${mm}-${dd}-${yy}`
}

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      header: undefined,
      footer: undefined,
      error: {
        errorStatus: false,
        errorCode: undefined,
        errorData: undefined,
        blogList: undefined,
      },
    }
  }

  async componentDidMount() {
    try {
      const blog = await Stack.getSpecificEntry(
        "page",
        this.props.location.pathname,
        "related_pages",
        "en-us"
      )
      const blogList = await Stack.getEntryWithRef(
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
      this.setState({
        entry: blog[0],
        header: header[0][0],
        footer: footer[0][0],
        blogList: blogList[0],
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
        <Banner
          title={this.state.entry.title}
          hero_banner={this.state.entry.page_components[0].hero_banner}
          short
        />
        <div className="max-width blog-roll padding-top">
          {this.state.blogList.map((post) => (
            <a
              className="blog-entry padding-bottom"
              href={`/blog${post.url}`}
              key={post.title}
            >
              <div className="thumb">
                <img
                  src="https://via.placeholder.com/200x140"
                  alt="Blog Title"
                />
              </div>
              <div className="content">
                <div className="inner">
                  <h3>{post.title}</h3>
                  <cite>
                    <span className="date">{dateSetter(post.date)}</span>
                    <span className="author">{post.author[0].title}</span>
                  </cite>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: `${post.body.slice(0, 180)}....`,
                    }}
                  />
                  <p className="cta">Read More</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Layout>
    ) : (
      ""
    )
  }
}

export default Blog

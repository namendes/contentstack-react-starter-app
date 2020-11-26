/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import React from "react"
import Stack from "../sdk/entry"
import Layout from "../components/layout"
import Banner from "../components/banner"
import Section from "../components/section"

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
      const result = await Stack.getSpecificEntry(
        "page",
        this.props.location.pathname,
        "related_pages",
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
        {this.state.entry.page_components.map((component, key) => {
          if (component.hero_banner) {
            return (
              <Banner
                key={key}
                hero_banner={component.hero_banner}
                title={this.state.entry.title}
              />
            )
          }
          if (component.section) {
            return (
              <Section
                key={key}
                section={component.section}
                relatedPages={this.state.entry.related_pages}
              />
            )
          }
        })}
      </Layout>
    ) : (
      ""
    )
  }
}
export default Home

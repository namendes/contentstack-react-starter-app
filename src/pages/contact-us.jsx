/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from "react"
import Stack from "../sdk/entry"
import Layout from "../components/layout"

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
        activeTab="Contact Us"
      >
        <div className="contact-us">
          <div className="max-width flex padding-both tall">
            <div className="col-half">
              <h2>{this.state.entry.title}</h2>
              {this.state.entry.page_components.map((component) => {
                if (component.rich_text) {
                  return (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${component.rich_text.rte}`,
                      }}
                    />
                  )
                }
                if (component.contact_details) {
                  return (
                    <div className="address-block padding-bottom">
                      <h3>Address</h3>
                      <p>{component.contact_details.address}</p>
                      <p className="phone">
                        <a href="tel:Phone">
                          {component.contact_details.phone}
                        </a>
                      </p>
                      <p className="email">
                        <a href="mailto:Email">
                          {component.contact_details.email}
                        </a>
                      </p>
                    </div>
                  )
                }
              })}
            </div>
            <div className="col-half">
              <div className="contact-form" />
            </div>
          </div>
        </div>
      </Layout>
    ) : (
      ""
    )
  }
}
export default ContactUs

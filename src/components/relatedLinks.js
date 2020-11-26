/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"

class RelatedLinks extends React.Component {
  render() {
    return (
      <div className="related-links">
        <h3>Related Pages</h3>
        {this.props.relatedPages.map((link) => (
          <p key={link.title}>
            <Link to={link.url}>{link.title}</Link>
          </p>
        ))}
      </div>
    )
  }
}
export default RelatedLinks

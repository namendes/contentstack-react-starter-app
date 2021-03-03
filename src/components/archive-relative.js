/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { Link } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"

export default function ArchiveRelative(props) {
  const { blogs } = props
  return (
    <>
      {blogs?.map((blog, idx) => (
        <Link to={blog.url} key={idx}>
          <div>
            <h4>{blog.title}</h4>
            {ReactHtmlParser(blog.body.slice(0, 80))}
          </div>
        </Link>
      ))}
    </>
  )
}

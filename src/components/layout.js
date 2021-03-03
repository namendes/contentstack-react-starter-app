/* eslint-disable react/prop-types */

import React from "react"
import Header from "./header"
import Footer from "./footer"

export default function Layout(props) {
  const { header, footer, activeTab, children } = props
  return (
    <>
      {header && <Header header={header} activeTab={activeTab} />}
      <main>{children}</main>
      {footer ? <Footer footer={footer} /> : ""}
    </>
  )
}

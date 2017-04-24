import React from "react"
import { Link } from "react-router"
import { prefixLink } from "gatsby-helpers"
import Helmet from "react-helmet"
import { config } from "config"
import { rhythm } from "../utils/typography"

import "../css/main.scss";

module.exports = React.createClass({
  propTypes() {
    return {
      children: React.PropTypes.any,
    }
  },
  render() {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" },
          ]}
        />
        <div
          style={{
            marginBottom: rhythm(1),
          }}
        >
          <div
            style={{
              margin: `0 auto`,
              position: "fixed",
              top: "30px",
              left: "30px",
            }}
          >
            <h1 style={{ margin: 0 }}>
              <Link
                to={prefixLink("/")}
              >
                AC
              </Link>
            </h1>
          </div>
        </div>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            paddingTop: 0,
            marginTop: "8rem"
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  },
})

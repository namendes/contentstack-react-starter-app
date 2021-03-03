/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { Link } from "react-router-dom"

export default function CardSection(props) {
  return (
    <div className="demo-section">
      {props.cards?.map((card, index) => (
        <div className="cards" key={index}>
          {card.title_h3 && <h3>{card.title_h3}</h3>}
          {card.description && <p>{card.description}</p>}
          <div className="card-cta">
            {card.call_to_action.title && card.call_to_action.href && (
              <Link to={card.call_to_action.href} className="btn primary-btn">
                {card.call_to_action.title}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

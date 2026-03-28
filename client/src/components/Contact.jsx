import React from 'react'
import Avatar from './Avatar';

function Contact({ avatar, name }) {

  return (
    <div className="contact">
      <Avatar img={avatar} />
      <div className="name">
        <p>{name}</p>
        <span></span>
      </div>
      <button>Follow</button>
    </div>
  )
}

export default Contact;

import React from 'react';
import { Link } from 'react-router-dom';
import createClass from 'create-react-class'

const Footer = createClass({
  render: function() {
    return (
      <p className="footer">
        <Link to="/">Redis Monitor</Link> &gt; Author By <a target="_blank" href="https://github.com/hustcc">hustcc</a>
      </p>
    )
  }
});

export default Footer;
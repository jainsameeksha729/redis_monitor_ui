import React from 'react';
import { Link } from 'react-router-dom';
import OnFireMixin from '../mixins/onFireMixin.jsx';
import createClass from 'create-react-class'

const Header = createClass({
  __ONFIRE__: 'Header',
  mixins: [OnFireMixin],  // 引入 mixin
  getInitialState: function() {
    return {title: 'Redis List', url: ''};
  },
  componentWillMount: function() {
    this.on('menus', function(title, url) {
      this.setState({title: title, url: url});
    }.bind(this));
  },
  render: function() {
    return (
      <p className="breadcrumb">
        <Link to="/"> Home </Link> &gt; <Link to={this.state.url}> {this.state.title} </Link>
      </p>
    )
  }
});

export default Header;
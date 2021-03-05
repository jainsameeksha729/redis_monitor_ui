import React from 'react';
import { Link } from 'react-router-dom';
import AdSense from 'react-adsense';
import OnFireMixin from './mixins/onFireMixin.jsx';
import TipShowMixin from './mixins/tipShowMixin.jsx';
import RequestsMixin from './mixins/xhrRequestsMixin.jsx';
import TimeAgo from 'timeago-react';
import createClass from 'create-react-class'
import axios from 'axios'
let base_url = 'https://redismonitornodejs.herokuapp.com';

class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redis_list: [],
      new_host: '',
      new_port: '',
      new_password: ''
    }
  }

  onBtnSubmit = async () => {
    console.log("thisss ", this.state)
    let host = this.state.new_host || '127.0.0.1';
    let port = this.state.new_port || 6379;
    let password = this.state.new_password || '';

    try {
      // base_url = 'http://locahost:3800'
      let data = await axios.post(base_url+'/api/v1/redis/add', {
        host, port,password
      })

      console.log("data", data, data.data)
      if(!data.data.success){
        TipShowMixin.showError("Ping Error!");
      }
      this.loadRedisList();
    } catch (error) {
      console.log(error)
      TipShowMixin.showError("No Data");
    }

  }

  onBtnExample = () => {
    this.setState({new_host: '127.0.0.1', new_password: '', new_port: 6379})
    
    // submit
    this.onBtnSubmit();
  }

  loadRedisList = async () => {
    try {
      let data = await axios.get(base_url+'/api/v1/redis/list')
      console.log("data", data)
      this.setState({redis_list: data.data});
      
    } catch (error) {
    }
    
  }

  componentDidMount() {
    this.loadRedisList()
  }

  onDelRedis = async (md5) => {
    
    try {
      let data = await axios.post(base_url+'/api/v1/redis/del', {
        md5
      })
      console.log("data del", data.data.status)

      if(data.data.status === 'Success')
      this.loadRedisList();

      else{
        TipShowMixin.showError(data.data.message);

      }

    } catch (error) {
    }

  }

  render() {
    return (
      <div>
        <h1>Redis Instance List - Redis Monitor Informations </h1>
        <AdSense.Google client='ca-pub-7292810486004926' slot='7806394673' />

        <form ref='form'>
          Host: <input type="text" placeholder="Redis host / ip" ref="new_host" onChange = {(e) => { this.setState({new_host: e.target.value})}}/>&nbsp;&nbsp;
          Port: <input type="number" placeholder="6379" ref="new_port" onChange = {(e) => { this.setState({new_port: e.target.value})}}/>&nbsp;&nbsp;
          Password: <input type="text" placeholder="password" ref="new_password" onChange = {(e) => { this.setState({new_password: e.target.value})}}/>&nbsp;&nbsp;
          <input type="button" onClick={this.onBtnSubmit} defaultValue="Add / Update" />&nbsp;
          <input type="button" onClick={this.onBtnExample} defaultValue="Example" />
        </form>

        <table width="100%" border="0" cellPadding="10" cellSpacing="1" style={{margin:'1em 0'}}>
          <tbody>
            <tr>
                <th width="40%" bgcolor="#DDEEFF">Redis Information</th>
                <th width="40%" bgColor="#DDEEFF">Add Datetime</th>
                <th width="20%" bgColor="#DDEEFF">Operation</th>
            </tr>
            {
              this.state.redis_list.map(function(redis, i) {
                return (
                  <tr key={i}>
                    <td><Link to={`/${redis.md5}`}>{redis.host}:{redis.port}</Link></td>
                    <td>
                      {redis.add_time} [<TimeAgo datetime={redis.add_time || new Date()} />]
                    </td>
                    <td><input type="button" onClick={this.onDelRedis.bind(this, redis.md5)} defaultValue="Delete" /></td>
                  </tr>
                )
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Index;
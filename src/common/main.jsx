import React from 'react';
import createClass from 'create-react-class'
import Header from './header.jsx';
import Footer from './footer.jsx';
import Index from '../index.jsx';
import OnFireMixin from '../mixins/onFireMixin.jsx';

class MainComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    console.log("heeeeeeeee")
    let children = this.props.children || <Index />;
    return (
      <div>
        {/* <Header /> */}
        { children }
        {/* <Footer /> */}
      </div>
    );
  }
    
}
// const MainComponent = createClass({

//   __ONFIRE__: 'MainComponent',
//   mixins: [OnFireMixin],  // 引入 mixin
//   render: function() {
//     console.log("heeeeeeeee")

//     let children = this.props.children || <Index />;
//     return (
//       <div>
//         <Header />
//         { children }
//         <Footer />
//       </div>
//     );
//   }
// });

export default MainComponent;
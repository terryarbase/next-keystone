import { Component } from 'react';

class App extends Component {

  render() {
  	const a = { test: 1 };
  	const b = {
  		...a,
  		...{
  			test: 2,
  		},
  	};
  	console.log(b);
    return (
      <div className='container'>
        test
      </div>
    );
  };
}

export default App;
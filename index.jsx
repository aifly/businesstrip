import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';


import Picker from 'antd-mobile/lib/picker';
import 'antd-mobile/lib/picker/style/css'

import { createForm } from 'rc-form';

import { district, provinceLite as province } from 'antd-mobile-demo-data';


import Obserable from './components/public/obserable';

var obserable = new Obserable();

 class App extends Component {
	constructor(props) {
		super(props);


		this.state = {
		
			
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		 const { getFieldProps } = this.props.form;
		return (
			<div className='zmiti-main-ui' >
				 <section className='zmiti-index-page'>
					<header>出差宝</header>
					<img src='./assets/images/showImage.jpg'/>

					<section className='zmiti-trip'>
						<div>
							<section className='zmiti-trip-destination'>出差目的地</section>
							<section className='zmiti-trip-city-C'>
								<aside>
									<Picker extra="请选择(可选)"
							          data={district}
							          triggerType='onClick'
							          disabled 
							          title="选择地区"
							          {...getFieldProps('district', {
							            initialValue: ['340000', '341500', '341502'],
							          })}
							          onOk={e => console.log('ok', e)}
							          onDismiss={e => console.log('dismiss', e)}
							        >
							         
							        </Picker>
								</aside>
								<aside>
									21
								</aside>
								<aside>
									3
								</aside>
							</section>
						</div>
					</section>
				 </section>
				 <section>
				 	
				 </section>
			</div>
		);
	}

 
	componentDidMount() {
		
	}
	 
}

const MainApp = createForm()(App);

ReactDOM.render(<MainApp></MainApp>,document.getElementById('fly-main-ui'));
	


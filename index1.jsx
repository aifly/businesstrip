import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';


import PickerView from 'antd-mobile/lib/picker-view';
import 'antd-mobile/lib/picker-view/style/css'

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
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],[
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],[
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },{
      label: '夏',
      value: '夏1',
    },{
      label: '夏',
      value: '夏2',
    },{
      label: '夏',
      value: '夏3',
    },{
      label: '夏',
      value: '夏4',
    },{
      label: '夏',
      value: '夏41',
    },
  ],
];
		return (
			<div className='zmiti-main-ui' >
				 <section className='zmiti-index-page'>
					<header>出差宝</header>
					<img src='./assets/images/showImage.jpg'/>

					<section className='zmiti-trip'>
						<div>
							<section className='zmiti-trip-destination'>出差目的地</section>
							 <PickerView className='aaa'
								        onChange={this.onChange}
								        value={this.state.value}
								        data={seasons}
								        cascade={false}
								      />
							<section className='zmiti-trip-city-C'>
								<aside>
									
								</aside>
								<aside>
									2
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
	


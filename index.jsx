import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import Picker from 'react-weui/build/packages/components/picker/picker';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Obserable from './components/public/obserable';

var obserable = new Obserable();

 class App extends Component {
	constructor(props) {
		super(props);

		var years = [],
			month = [],
			date = [];


		var cYear = new Date().getFullYear();

		for(var i =0;i<100;i++){
			if (i<31){
				date.push({
					label:i+1<10?'0'+(i+1):i+1,
					value:'2-'+(i+1<10?'0'+(i+1):i+1)
				})
			}
			if(i<12){
				month.push({
					label:i+1<10?'0'+(i+1):i+1,
					value:'1-'+(i+1)
				})
			}
			years.push({
				label:cYear+i,
				value:'0-'+(cYear+i)
			});
		}



		this.state = {
			showProvincePicker: false,
        	picker_value: '',
        	currentCountry:'',
        	currentProvinceName:'',
        	currentProvinceId:-1,
        	logoImg:'./assets/images/showImage.jpg',
        	currentCityId:-1,
        	currentCityName:'',
        	defaultProvinceSelect:[0],
        	defaultCitySelect:[0],
			provinceGroup: [{
	                items: [
	                    
	                ]
	        	}
	        ],
	        cityGroup:[{
	        		items:[]
	        	}
	        ],
	        dateGroup:[
	        	{
	        		items:years
	        	},
	        	{
	        		items:month
	        	},
	        	{
	        		items:date
	        	},

	        ],
	        reasonGroup:[
	        	{
	        		items:[
	        		]
	        	}
	        ],
	        jobGroup:[
	        {
	        	items:[
	        	]
	        }],
	        currentReasonName:'',
	        currentReasonId:'',
	        startdate:'',
	        enddate:''
			
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		window.s = this;
	}
	render() {
		return (
			<div className='zmiti-main-ui' >
				 <section className='zmiti-index-page'>
					<header>出差宝</header>
					<section className='zmiti-index-scroll-wrap' style={{height:this.viewH - 54}} ref='zmiti-index-scroll-wrap'>
						<div>
							<img src={this.state.logoImg}/>
							<section className='zmiti-trip'>
								<div>
									<section className='zmiti-trip-destination'>出差目的地</section>
									<section className='zmiti-trip-city-C'>
										<aside>
											  {this.state.currentCountry||'中国'}
										</aside>
										<aside  onTouchTap={(e)=>{ e.preventDefault();this.setState({showProvincePicker:true})}}>
											{this.state.currentProvinceName}
										</aside>
										<aside  onTouchTap={(e)=>{ e.preventDefault();this.setState({showCityPicker:true})}}>
											{this.state.currentCityName}
										</aside>
									</section>
								</div>
							</section>

							<section className='zmiti-trip'>
								<div>
									<section className='zmiti-trip-destination'>出差时间</section>
									<section className='zmiti-trip-date'>
										<aside onTouchTap={this.selectedDate.bind(this,'startdate')}>
											  {this.state.startdate}
											  <img src='./assets/images/date.png'/>
										</aside>
										<aside></aside>
										<aside onTouchTap={this.selectedDate.bind(this,'enddate')}>
											{this.state.enddate}
											<img src='./assets/images/date.png'/>
										</aside>
									</section>
								</div>


							</section>

							<section className='zmiti-trip'>
								<div>
									<section className='zmiti-trip-destination'>出差事由</section>
									<section className='zmiti-trip-city-C'>
										<aside style={{width:0,'WebkitBoxFlex':0,opacity:0}}></aside>
										<aside style={{textAlign:'left'}} onTouchTap={(e)=>{ e.preventDefault();this.setState({showReasonPicker:true})}}>
											{this.state.currentReasonName}
										</aside>
									</section>
								</div>
							</section>

							<section className='zmiti-trip'>
								<div>
									<section className='zmiti-trip-destination'>职务级别</section>
									<section className='zmiti-trip-city-C'>
										<aside style={{width:0,'WebkitBoxFlex':0,opacity:0}}></aside>
										<aside style={{textAlign:'left'}} onTouchTap={(e)=>{ e.preventDefault();this.setState({showJobPicker:true})}}>
											{this.state.currentJobName}
										</aside>
									</section>
								</div>
							</section>


						</div>
					</section>
					
				 </section>
				 <section>
				 	
				 </section>
				   <Picker
				   		defaultSelect={[0]}
	                    onChange={selected=>{
	                        let value = '',
	                        	label = '',
	                        	currentCityId = -1,
	                        	currentCityName = '';

	                        selected.forEach( (s, i)=> {
	                            value = this.state.provinceGroup[i]['items'][s].value;
	                            label = this.state.provinceGroup[i]['items'][s].label;
	                        	currentCityId = this.defaultProvince[s].cities[0].cityId;
	                        	currentCityName = this.defaultProvince[s].cities[0].name;
	                        	this.state.cityGroup[0].items.length = 0;
	                        	this.defaultProvince[s].cities.map((list,i)=>{
									this.state.cityGroup[0].items.push({
										label:list.name,
										value:list.cityId
									})
								});
	                        })
	                        this.setState({
	                        	defaultCitySelect:[0],
	                            currentProvinceId: value,
	                            currentProvinceName:label,
	                            showProvincePicker: false,
	                            currentCityId,
	                            currentCityName
	                        })
	                    }}
	                    lang={{ leftBtn: '取消', rightBtn: '确定' }}
	                    groups={this.state.provinceGroup}
	                    show={this.state.showProvincePicker}
	                   	onCancel={e=>{this.setState({showProvincePicker: false})}}
	                />
	                {this.state.showCityPicker && <Picker
	                	                 	defaultSelect={this.state.defaultCitySelect}
	                	                    onChange={selected=>{
	                	                        let value = '',
	                	                        	label = '',
	                	                        	currentCityId = -1,
	                	                        	currentCityName = '';
	                
	                	                        selected.forEach( (s, i)=> {
	                	                            value = this.state.cityGroup[i]['items'][s].value;
	                	                            label = this.state.cityGroup[i]['items'][s].label;
	                	                        })
	                	                        this.setState({
	                	                            currentCityId: value,
	                	                            currentCityName:label,
	                	                            showCityPicker: false,
	                	                            defaultCitySelect:selected
	                	                        })
	                	                    }}
	                	                    lang={{ leftBtn: '取消', rightBtn: '确定' }}
	                	                    groups={this.state.cityGroup}
	                	                    show={this.state.showCityPicker}
	                	                   	onCancel={e=>{this.setState({showCityPicker: false})}}
	                	                />}

	           						 {this.state.startdate && <Picker
	            					   className='zmiti-date-picker'
	            				   		defaultSelect={[
	            				   						0,
	            				   						this.state[this.selectedDateType||'startdate'].split('-')[1]-1,
	            				   						
	            				   						this.state[this.selectedDateType||'startdate'].split('-')[2]*1-1
	            				   						]}
	            	                    onChange={selected=>{
	            	                    	

	            	                         this.setState({
	            	                        
	            	                            showDatePicker: false,
	            	                        })


	            	                    }}
	            	                    lang={{ leftBtn: '取消', rightBtn: '确定' }}
	            	                    groups={this.state.dateGroup}
	            	                    onGroupChange={(selected)=>{
	            	                    	var index = selected.value.split('-')[0]*1;
	            	                    	var year = this.state[this.selectedDateType].split('-')[0];
	            	                    	var month = this.state[this.selectedDateType].split('-')[1];
	            	                    	var day =this.state[this.selectedDateType].split('-')[2];
	            	                    	switch(index){
	            	                    		case 0:
	            	                    		year = selected.label;
	            	                    		this.fixDay(year,month);
	            	                    		break;
	            	                    		case 1:
	            	                    		 month = selected.label;
	            	                    		 var count = this.getDaysInOneMonth(year,month);
	            	                    		 this.fixDay(year,month);
	            	                    		break;
	            	                    		case 2:
	            	                    		day = selected.label;
	            	                    		break;
	            	                    	}
	            	                    	if(day>this.getDaysInOneMonth(year,month)){
	            	                    		day=this.getDaysInOneMonth(year,month);
	            	                    	}
	            	                    	this.setState({
	            	                    		[this.selectedDateType]:[year,month,day].join('-')
	            	                    	})
	            	                    
	            	                    }}
	            	                    show={this.state.showDatePicker}
	            	                   	onCancel={e=>{this.setState({showDatePicker: false})}}
	            	                />}

    	                <Picker
					   		defaultSelect={[0]}
		                    onChange={selected=>{
		                        let value = '',
		                        	label = '';

		                        selected.forEach( (s, i)=> {
		                            value = this.state.reasonGroup[i]['items'][s].value;
		                            label = this.state.reasonGroup[i]['items'][s].label;
		                        })
		                        this.setState({
		                            showReasonPicker: false,
		                            currentReasonId:value,
		                            currentReasonName:label
		                        })
		                    }}
		                    lang={{ leftBtn: '取消', rightBtn: '确定' }}
		                    groups={this.state.reasonGroup}
		                    show={this.state.showReasonPicker}
		                   	onCancel={e=>{this.setState({showReasonPicker: false})}}
		                />

		                 <Picker
					   		defaultSelect={[0]}
		                    onChange={selected=>{
		                        let value = '',
		                        	label = '',
		                        	currentCityId = -1,
		                        	currentCityName = '';

		                        selected.forEach( (s, i)=> {
		                            value = this.state.jobGroup[i]['items'][s].value;
		                            label = this.state.jobGroup[i]['items'][s].label;
		                        })
		                        this.setState({
		                            showJobPicker: false,
		                            currentJobId:value,
		                            currentJobName:label
		                        })
		                    }}
		                    lang={{ leftBtn: '取消', rightBtn: '确定' }}
		                    groups={this.state.jobGroup}
		                    show={this.state.showJobPicker}
		                   	onCancel={e=>{this.setState({showJobPicker: false})}}
		                />
			</div>
		);
	}

	selectedDate(type,e){
		e.preventDefault();
		this.setState({
			showDatePicker:true
		});
		this.selectedDateType = type;

	}

	getDaysInOneMonth (year, month) {

		month = parseInt(month,10);
		var d = new Date(year, month,0);
	
		return d.getDate();

	}

	fixDay(year,month){

		console.log(year,month);
		
		var count = this.getDaysInOneMonth(year,month);

		var arr = [];
		for(var i = 0;i<count;i++){
			arr.push({
				label:i+1<10?'0'+(i+1):i+1,
				value:'2-'+(i+1<10?'0'+(i+1):i+1),
			})
		};

		this.state.dateGroup[2].items.lenght =0;
		this.state.dateGroup[2].items = arr;
		this.forceUpdate();
	}


	format(date){
		var month = date.getMonth()+1;
		month < 10 && (month = '0'+month);
		var d = date.getDate();
		d < 10 && (d = '0'+d);
		return date.getFullYear()+"-"+month+"-"+d;
	}
 
	componentDidMount() {
		this.request();

		this.scroll = new IScroll(this.refs['zmiti-index-scroll-wrap'],{
			scrollbars:true
		});

		setTimeout(()=>{
			this.scroll.refresh();
		},100);

		this.state.dateGroup[2].items.length = 0;



		this.setState({
			startdate:this.format(new Date()),
			enddate:this.format(new Date())
		})

		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		this.fixDay(year,month);
	}

	request(){
		$.ajax({
			type:window.ajaxType,
			url:window.baseUrl + 'travel/get_basedata',
			data:{
				companyid:window.companyid
			}
		}).done((data)=>{
			if(typeof data === 'string'){
				data = JSON.parse(data);
			}
			if(data.getret === 0){

				this.state.currentCountry = data.result.citys[0].name;
				
				
				data.result.citys[0].list.map((list,i)=>{
					this.state.provinceGroup[0].items.push({
						label:list.name,
						value:list.provinceId
					})
				});
				data.result.citys[0].list[0].cities.map((list,i)=>{
					this.state.cityGroup[0].items.push({
						label:list.name,
						value:list.cityId
					})
				});
				this.state.currentProvinceId = data.result.citys[0].list[0].provinceId;

				this.state.currentProvinceName = data.result.citys[0].list[0].name;
				this.state.currentCityId = data.result.citys[0].list[0].cities[0].cityId;
				this.state.currentCityName = data.result.citys[0].list[0].cities[0].name;
				this.defaultProvince = data.result.citys[0].list;
				this.state.currentReasonId = data.result.reason[0].reasonId;
				this.state.currentReasonName = data.result.reason[0].reasonName;
				data.result.reason.map((item,i)=>{
					this.state.reasonGroup[0].items.push({
						label:item.reasonName,
						value:item.reasonId
					})
				});

				this.state.currentJobId = data.result.duty[0].dutyId;
				this.state.currentJobName = data.result.duty[0].name;
				data.result.duty.map((item,i)=>{
					this.state.jobGroup[0].items.push({
						label:item.name,
						value:item.dutyId
					})
				});

				this.state.logoImg = data.result.logoImage;

				this.forceUpdate();
			}
		})
	}
	
	 
}


ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	


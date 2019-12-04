import { Store } from "webext-redux";
import reducers from '../../background/store';

console.log('Content script start.');


const config = {
	"shops": [
		{
			"name": "aliexpress",
			"link": "aliexpress.com",
			"selector": "div.product-price-current span.product-price-value"
		}
	]
}

let currentShop: {name: string , link:string , selector: string} = {
	name: '',
	link: '',
	selector: ''
};
if (document.URL.includes(config.shops[0].link)) {
	console.log(`Website: ${config.shops[0].name}`);
	currentShop = config.shops[0];
}

const element = document.querySelector(currentShop.selector);
const payload = {
	link: document.URL,
	content: element.innerText,
	price: Number.parseFloat(element.innerText)
}

const store = new Store();

store.ready().then(() => {
	console.log('Store ready.');
}).catch(() => {
	console.log('Store did not created.');
});


/*
//import * as React from 'react';
//import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
//import CounterApp from './containers/CounterApp';

import { createDomAnchor } from '../../scripts/dom';

createDomAnchor('counter-root');
const store = new Store();

store.ready().then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<CounterApp />
		</Provider>
		, document.getElementById('counter-root'));
});
*/

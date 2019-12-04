import { Store } from "webext-redux";

const config = {
	"shops": [
		{
			"name": "aliexpress",
			"link": "aliexpress.com",
			"selector": "div.product-price-current span.product-price-value"
		},
		{
			"name": "taobao",
			"link": "taobao.com",
			"selector": "#J_PromoPriceNum"
		}
	]
}
const getCurrentStore = () => {
	let current: { name: string, link: string, selector: string } = {
		name: '',
		link: '',
		selector: ''
	};
	config.shops.forEach(shop => {
		if (document.URL.includes(shop.link))
			current = shop;
	});
	return current;
}

var currentShop = getCurrentStore();
console.log(`Website: ${currentShop.name}`);

const element: HTMLElement | null = document.querySelector(currentShop.selector);
const payload = {
	link: document.URL,
	content: element ? element.innerText : '',
	price: Number.parseFloat(element ? element.innerText : '0')
}

const store = new Store();

window.addEventListener('focus', () => {
	document.body.click();
	currentShop = getCurrentStore();
	console.log(currentShop.name);
	const element: HTMLElement | null = document.querySelector(currentShop.selector);
	const payload = {
		link: document.URL,
		content: element ? element.innerText : '',
		price: Number.parseFloat(element ? element.innerText : '0')
	}
	store.dispatch({ type: 'DATA_STORE', payload })
})

store.dispatch({ type: 'DATA_STORE', payload });


/*
//import * as React from 'react';
//import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import CounterApp from './containers/CounterApp';
import { createDomAnchor } from '../../scripts/dom';

createDomAnchor('counter-root');

store.ready().then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<CounterApp />
		</Provider>
		, document.getElementById('counter-root'));
});
*/
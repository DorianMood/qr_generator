import { Store } from "webext-redux";

const config = {
	"shops": [
		{
			"name": "aliexpress",
			"link": "aliexpress.com",
			"selector": "div.product-price-current span.product-price-value",
			"imageSelector": ".magnifier-image"
		},
		{
			"name": "taobao",
			"link": "taobao.com",
			"selector": "#J_PromoPriceNum",
			"imageSelector": "#J_ImgBooth"
		},
		{
			"name": "ebay",
			"link": "ebay.com",
			"selector": "#convbidPrice",
			"imageSelector": "icImg"
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

let currentShop = getCurrentStore();
console.log(`Website: ${currentShop.name}`);

let payload = {
	link: '',
	content: '',
	price: 0
}
if (currentShop.name !== '') {
	const element: HTMLElement | null = document.querySelector(currentShop.selector);
	payload = {
		link: document.URL,
		content: element ? element.innerText : '',
		price: Number.parseFloat(element ? element.innerText : '0')
	}
}

const store = new Store();

window.addEventListener('focus', () => {
	currentShop = getCurrentStore();
	let payload = {
		link: '',
		content: '',
		price: 0
	}
	if (currentShop.name !== '') {
		const element: HTMLElement | null = document.querySelector(currentShop.selector);
		payload = {
			link: document.URL,
			content: element ? element.innerText : '',
			price: Number.parseFloat(element ? element.innerText : '0')
		}
	}
	store.dispatch({ type: 'DATA_STORE', payload })
})
console.log('before dispatch')
store.dispatch({ type: 'DATA_STORE', payload });


import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CounterApp from './containers/CounterApp';
import { createDomAnchor } from '../../scripts/dom';

createDomAnchor('counter-root');

store.ready().then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<CounterApp />
		</Provider>
		, document.getElementById('counter-root'));
});

import { Store } from "webext-redux";

const config = {
	"shops": [
		{
			"name": "aliexpress",
			"link": "aliexpress.com",
			"selector": "div.product-price-current span.product-price-value",
			"imageSelector": ".magnifier-image",
			"titleSelector": ".product-title"
		},
		{
			"name": "taobao",
			"link": "taobao.com",
			"selector": "#J_PromoPriceNum,#J_StrPrice>.tb-rmb-num",
			"imageSelector": "#J_ImgBooth",
			"titleSelector": ".tb-main-title"
		},
		{
			"name": "ebay",
			"link": "ebay",
			"selector": ".notranslate",
			"imageSelector": "#icImg",
			"titleSelector": "#itemTitle"
		},
		{
			"name": "tmall",
			"link": ".tmall.com",
			"selector": ".tm-price",
			"imageSelector": "#J_ImgBooth",
			"titleSelector": ".tb-detail-hd h1"
		}
	]
}

const regexp: RegExp = /([0-9]+(\.[0-9]*)*)/;

const getCurrentStore = () => {
	let current: { name: string, link: string, selector: string, imageSelector: string, titleSelector: string } = {
		name: '',
		link: '',
		selector: '',
		imageSelector: '',
		titleSelector: ''
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
	price: 0,
	imageLink: '',
	title: ''
}
if (currentShop.name !== '') {
	const element: HTMLElement | null = document.querySelector(currentShop.selector);
	const image: HTMLElement | null = document.querySelector(currentShop.imageSelector);
	const title: HTMLElement | null = document.querySelector(currentShop.titleSelector);
	payload = {
		link: document.URL,
		content: element ? element.innerText : '',
		price: Number.parseFloat(element ? regexp.exec(element.innerText)![0] : '0'),
		imageLink: image ? image!.attributes!.getNamedItem('src')!.value : '',
		title: title ? title.innerText : ''
	}
}

const store = new Store();

window.addEventListener('focus', () => {
	currentShop = getCurrentStore();
	let payload = {
		link: '',
		content: '',
		price: 0,
		imageLink: '',
		title: ''
	}
	if (currentShop.name !== '') {
		const element: HTMLElement | null = document.querySelector(currentShop.selector);
		const image: HTMLElement | null = document.querySelector(currentShop.imageSelector);
		const title: HTMLElement | null = document.querySelector(currentShop.titleSelector);
		payload = {
			link: document.URL,
			content: element ? element.innerText : '',
			price: Number.parseFloat(element ? regexp.exec(element.innerText)![0] : '0'),
			imageLink: image ? image!.attributes!.getNamedItem('src')!.value : '',
			title: title ? title.innerText : ''
		}
	}
	store.dispatch({ type: 'DATA_STORE', payload })
})
console.log(`before dispatch data: ${payload}`);
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
			{ payload.content !== '' ? (<CounterApp />) : (<></>) }
		</Provider>
		, document.getElementById('counter-root'));
});

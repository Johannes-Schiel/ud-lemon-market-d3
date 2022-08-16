import './../scss/style.scss';
import axios from 'axios';

// Elements
const GLOBAL = document.querySelector('#global');
const SEARCH_FORM = document.querySelector('#search');
const NAME = document.querySelector('#name');
const FULL_NAME = document.querySelector('#name-full');
const INFO = document.querySelector('#info');

const config = {
	headers: {
		Authorization: `Bearer ${import.meta.env.LEMON_MARKET_KEY}`,
	},
};

console.log(import.meta.env.LEMON_MARKET_KEY);

SEARCH_FORM.addEventListener('keyup', ($event) => search($event));

function search($event) {
	const isin = $event.target.value;
	if (isin.match('([A-Z]{2})([A-Z0-9]{9})([0-9]{1})')) {
		show();
		getDetails($event.target.value);
		// getDataOHLC($event.target.value);
	} else {
		clear();
	}
}

function getDetails(isin) {
	return axios
		.get(`https://data.lemon.markets/v1/instruments/?isin=${isin}`, config)
		.then(
			(res) => {
				clear();
				const result = res.data.results[0];
				if (result) {
					GLOBAL.appendChild(createDetail('isin', result.isin));
					GLOBAL.appendChild(createDetail('wkn', result.wkn));
					GLOBAL.appendChild(createDetail('symbol', result.symbol));
					GLOBAL.appendChild(createDetail('type', result.type));

					setName(result.title, result.name);
				}
			},
			() => {
				clear();
			}
		);
}

function clear() {
	GLOBAL.innerHTML = '';
	NAME.innerText = '';
	FULL_NAME.innerText = '';
}

function show() {
	INFO.classList.add('show');
}

function hide() {
	INFO.classList.remove('show');
}

function getDataOHLC(isin) {
	return axios
		.get(
			`https://data.lemon.markets/v1/ohlc/d1?isin=${isin}&from=2022-07-01&to=2022-08-16`,
			config
		)
		.then((res) => {});
}

function setName(name, fullName) {
	NAME.innerText = name;
	FULL_NAME.innerText = fullName;
}

function createDetail(label, value) {
	const detailElm = document.createElement('div');
	detailElm.classList.add('detail');
	const labelElm = document.createElement('div');
	labelElm.classList.add('label');
	labelElm.innerText = label;
	const valueElm = document.createElement('div');
	valueElm.classList.add('value');
	valueElm.innerText = value;
	detailElm.appendChild(labelElm);
	detailElm.appendChild(valueElm);
	return detailElm;
}

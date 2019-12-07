import { Reducer} from 'redux';
import { DataActions } from './actions';

export interface IData {
	link: string;
	content: string;
	price: number;
	imageLink: string;
	title: string;
}

const initialState: IData = {
	link: '',
	price: 0,
	content: '',
	imageLink: '',
	title: ''
};

const data: Reducer<IData, DataActions> = (state = initialState, action) => {
	const payload = action.payload ? action.payload : initialState;

	switch (action.type) {
		case 'DATA_STORE':
			return { ...state,
				link: payload.link,
				content: payload.content,
				price: payload.price,
				imageLink: payload.imageLink,
				title: payload.title
			};
		default:
			return state;
	}
};

export default data;

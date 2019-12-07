import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { IAppState } from '../background/store';
import { decrement, increment } from '../background/store/counter/actions';
import { QRCode } from 'react-qrcode-logo';
import { IData } from '../background/store/data';

interface IQrProps {
	data: IData;
	dispatch: Dispatch;
}

class Qr extends React.Component<IQrProps> {
	increment = () => {
		this.props.dispatch(increment());
	}
	decrement = () => {
		this.props.dispatch(decrement());
	}

	render() {
		let content = this.props.data.content === '' ?
		(<>
		<h1>This website is not supported.</h1>
		</>) :
		(<>
		
		<h1>Here is your QR. Scan it via App.</h1>
				<QRCode
                    value={JSON.stringify(this.props.data)}
                    qrStyle="dots"
                    size={300}
				/>
		</>);

		return (
			<CounterContainer >
				{content}
			</CounterContainer>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		data: state.data
	};
};

export default connect(mapStateToProps)(Qr);

const CounterContainer = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-width: 100px;
	padding: 5px;
	margin: 5px;
	background-color: ${p => p.theme.backgroundColor};
`;

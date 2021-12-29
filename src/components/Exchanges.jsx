import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from '../components/Loader';
import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const { data, isFetching } = useGetExchangesQuery();
	const exchangesList = data?.data?.exchanges;

	if (isFetching) return <Loader />;

	return (
		<>
			<Row>
				<Col>
					<Title level={2} className="heading">
						Exchanges
					</Title>
				</Col>
			</Row>
			<Row style={{ width: '100%' }}>
				<Col span={6}>Exchanges</Col>
				<Col span={6}>24h Trade Volume</Col>
				<Col span={6}>Markets</Col>
				<Col span={6}>Change</Col>
			</Row>
			<Row>
				<Col span={24}>
					{exchangesList.map((exchange) => (
						<Collapse>
							<Panel
								key={exchange.id}
								showArrow={false}
								header={
									<Row key={exchange.id} style={{ width: '100%' }}>
										<Col type="flex" span={6}>
											<Text>
												<strong>{exchange.rank}.</strong>
											</Text>
											<Avatar
												style={{ margin: '0 10px' }}
												src={exchange.iconUrl}
											/>
											<Text>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col span={6}>${millify(exchange.volume)}</Col>
										<Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
										<Col span={6}>{millify(exchange.marketShare)}%</Col>
									</Row>
								}
							>
								{HTMLReactParser(exchange.description || 'No description')}
							</Panel>
						</Collapse>
					))}
				</Col>
			</Row>
		</>
	);
};

export default Exchanges;

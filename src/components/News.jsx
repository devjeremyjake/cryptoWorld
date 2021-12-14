import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
	'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const { data: CryptoListing } = useGetCryptosQuery(100);
	const {
		data: cryptoNews,
		isFetching,
		isError,
	} = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? 6 : 15,
	});

	if (isFetching) return 'Loading.......';
	if (!cryptoNews?.value) return 'No News Found At This Time..';
	if (isError) return 'Error inNews Section';
	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch={'true'}
						className={'select-news'}
						placeholder={'Select a Crypto'}
						value={newsCategory}
						optionFilterProps="children"
						onChange={(value) => setNewsCategory(value)}
						filteroptions={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						<option value="Cryptocurrencies">Cryptocurrency</option>
						{CryptoListing?.data?.coins.map((coin) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews.value.map((news, i) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<Card hoverable="true" className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={4}>
									{news.name}
								</Title>
								<img
									style={{ maxWidth: '200px', maxHeight: '100px' }}
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt="news"
								/>
							</div>
							<p>
								{news.description > 100
									? `${news.description.substring(0, 100)}.....`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail?.contentUrl ||
											demoImage
										}
										alt={'news'}
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished).startOf('ss').fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;

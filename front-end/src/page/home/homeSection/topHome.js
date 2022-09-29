import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Row, Col, CardTitle, CardImg, CardSubtitle } from 'reactstrap';
import { fetchTopRoomList } from '../../../store';
import styles from './module/topHome.module.css';

const TopHome = () => {
    const hotel_list = [{
        image_url: process.env.PUBLIC_URL + "./images/hotel_1.webp"
    },
    {
        image_url: process.env.PUBLIC_URL + "./images/hotel_2.jpg"
    },
    {
        image_url: process.env.PUBLIC_URL + "./images/hotel_3.jpg"
    },
    {
        image_url: process.env.PUBLIC_URL + "./images/hotel_4.jpg"
    }
    ]
    const { data } = useQuery('top-room', () => fetchTopRoomList());
    return (
        <Row>
            <CardTitle className='h2 mb-4'>
                Phòng được yêu thích
            </CardTitle>
            {
                data != undefined ? data.map((item, index) => {
                    return (
                        <Col xs={3} className={styles.item_type} key={index}>
                            <Link to={`/detail?id=${item?.dataHotel?._id}&price=${item?.minPrice?.price}`}>
                                <CardImg src={hotel_list[index].image_url} className={styles.img_frame} />
                                <CardTitle className={`h5 mt-3 text-dark ${styles.title}`}>
                                    {
                                        item?.dataHotel?.name
                                    }
                                </CardTitle>
                                <CardSubtitle className='p text-dark'>Start from ${item?.minPrice?.price}</CardSubtitle>
                                <CardSubtitle className='p'>
                                    <span className={styles.rate}>{item?.dataHotel?.rating}</span>&nbsp;
                                </CardSubtitle>
                                <CardSubtitle className='text-dark'>
                                    {item?.dataHotel?.type}
                                </CardSubtitle>
                            </Link>
                        </Col>
                    )
                }) : ''
            }
        </Row>
    );
}

export default TopHome;

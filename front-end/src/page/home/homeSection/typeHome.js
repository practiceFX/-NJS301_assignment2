import React from 'react';
import { useQuery } from 'react-query';
import { CardTitle, Row, Col, CardImg, CardSubtitle } from 'reactstrap';
import { fetchRoomType } from '../../../store';
import styles from './module/typeHome.module.css';

const TypeHome = () => {
    const typeHome = [{
        urlImage: process.env.PUBLIC_URL + '/images/type_1.webp'
    },
    {
        urlImage: process.env.PUBLIC_URL + '/images/type_2.jpg'
    },
    {
        urlImage: process.env.PUBLIC_URL + '/images/type_3.jpg'
    },
    {
        urlImage: process.env.PUBLIC_URL + '/images/type_4.jpg'
    },
    {
        urlImage: process.env.PUBLIC_URL + '/images/type_5.jpg'
    },
    {
        urlImage: process.env.PUBLIC_URL + '/images/type_5.jpg'
    }]

    const { data } = useQuery('room', () => fetchRoomType());
    return (
        <div className={styles.wrapper}>
            <Row>
                <CardTitle className='h2 mb-4'>
                    Tìm kiếm loại phòng phù hợp với bạn
                </CardTitle>
                {
                    data != undefined ? data.map((item, index) => {
                        return (
                            <Col xs={2} className={styles.item_type} key={index}>
                                <CardImg src={typeHome[index].urlImage} className={styles.img_frame} />
                                <CardTitle className={`h5 mt-3 ${styles.title}`}>
                                    {
                                        item.name
                                    }
                                </CardTitle>
                                <CardSubtitle className='p'>{
                                    item.amount < 10 ? '0' + item.amount : item.amount
                                } Room</CardSubtitle>
                            </Col>
                        )
                    }) : ''
                }
            </Row>
        </div>
    );
}

export default TypeHome;

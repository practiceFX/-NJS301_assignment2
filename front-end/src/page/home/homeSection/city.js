import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Col, Row, CardText } from 'reactstrap';
import { fetchCityList } from '../../../store';
import { useQuery } from 'react-query'
import styles from './module/city.module.css';

const City = () => {
    const cityList = [
        {
            imageUrl: process.env.PUBLIC_URL + 'images/city_1.webp'
        },
        {
            imageUrl: process.env.PUBLIC_URL + 'images/city_2.webp'
        },
        {
            imageUrl: process.env.PUBLIC_URL + 'images/city_3.webp'
        }
    ]

    // get top city
    const { data } = useQuery('city', () => fetchCityList());


    return (
        <div className={styles.wrapper}>
            <Row >
                {
                    data != undefined ? data.map((item, index) => {
                        return (
                            <Col xs='4' className={styles.item_city} key={index}>

                                <Card key={index}>
                                    <CardImg src={cityList[index].imageUrl} className={styles.card_img} />
                                    <CardImgOverlay>
                                        <CardTitle className={`h4 ${styles.title}`}>
                                            {
                                                item.name
                                            }
                                        </CardTitle>
                                        <CardText className='h4 text-light'>
                                            {
                                                item.amount < 10 ? '0' + item.amount : item.amount
                                            } Địa điểm
                                        </CardText>
                                    </CardImgOverlay>
                                </Card>

                            </Col>
                        )
                    }) : ''
                }

            </Row>
        </div>
    );
}

export default City;

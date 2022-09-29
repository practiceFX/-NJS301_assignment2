import React from 'react';
import { Card, CardBody, CardTitle, Col, Input, Row, CardText, Button } from 'reactstrap';
import styles from './search.module.css';
// import { URLSearchParams } from "url"

import Navbar from '../../component/navbar/navbar';
import Foot from '../../component/foot/foot';

import { useQuery } from 'react-query';



const Search = () => {

    const { data } = useQuery('search-list');



    return (
        <React.Fragment>
            <Navbar />

            <div className='section_content'>
                <Row className={styles.wrapper}>
                    <Col className={styles.search_dashboard} xs={3}>
                        <CardTitle className="h2 mb-3">SEARCH</CardTitle>
                        <CardBody className='mb-4'>
                            <CardTitle className="h5 mb-2">Description</CardTitle>
                            <Input type="text" placeholder="" />
                        </CardBody>
                        <CardBody className='mb-4'>
                            <CardTitle className="h5 mb-2">Check in Date</CardTitle>
                            <Input type="text" />
                        </CardBody>
                        <CardBody>
                            <CardTitle className="h5 mb-3">Options</CardTitle>
                            <Row>
                                <Col xs="8" className={styles.item_option}>
                                    <CardText className='text-small'>Min price per night</CardText>
                                </Col>
                                <Col xs="4" className={styles.item_option}>
                                    <Input type="text" placeholder=""></Input>
                                </Col>
                                <Col xs="8" className={styles.item_option}>
                                    <CardText className='text-small'>Max price per night</CardText>
                                </Col>
                                <Col xs="4" className={styles.item_option}>
                                    <Input type="text" placeholder=""></Input>
                                </Col>
                                <Col xs="8" className={styles.item_option}>
                                    <CardText className='text-small'>Adult</CardText>
                                </Col>
                                <Col xs="4" className={styles.item_option}>
                                    <Input type="text" placeholder=""></Input>
                                </Col>
                                <Col xs="8" className={styles.item_option}>
                                    <CardText className='text-small'>Children</CardText>
                                </Col>
                                <Col xs="4" className={styles.item_option}>
                                    <Input type="text" placeholder=""></Input>
                                </Col>
                                <Col xs="8" className={styles.item_option}>
                                    <CardText className='text-small'>Room</CardText>
                                </Col>
                                <Col xs="4" className={styles.item_option}>
                                    <Input type="text" placeholder=""></Input>
                                </Col>
                            </Row >
                        </CardBody>
                    </Col>
                    <Col className={styles.search_content} xs={9}>
                        {
                            data != undefined ? data.map((item, index) => {
                                return (
                                    <Card className={styles.card_list_item} key={index}>
                                        <Row>
                                            <Col xs="4">
                                                <Card style={{ backgroundImage: `url("${(item.photos[0].split(','))[0]}")` }} className={styles.image_bg}></Card>
                                                {console.log(item.photos[0])}
                                            </Col>
                                            <Col xs="8">
                                                <Row>
                                                    <Col xs="8" className={`${styles.title} h4`}>{item.name}</Col>
                                                    <Col xs="3" ><strong>{item.rating}</strong></Col>
                                                    <Col xs="1" className={styles.rate}>{item.rating}</Col>
                                                    <Col xs="12">
                                                        <CardText>{item.distance}m from center</CardText>
                                                    </Col>
                                                    <Col xs="12">
                                                        <CardText className={styles.tag}>Free Breakfast</CardText>
                                                    </Col>
                                                    <Col xs="12">
                                                        <CardText className={styles.type}>{item.type}</CardText>
                                                    </Col>
                                                    {/* price and destination */}
                                                    <Col xs="8">
                                                        <CardText className="">{item.desc}</CardText>
                                                    </Col>
                                                    <Col xs="4">
                                                        <CardText className={`${styles.price} h3`}></CardText>
                                                    </Col>
                                                    {/* end  */}
                                                    {/* free cancelation */}
                                                    <Col xs='6'>
                                                        <CardText className={styles.free_cancel}>{item.free_cancel != true ? 'Free cancelation' : ''}</CardText>
                                                    </Col>
                                                    <Col xs="6">
                                                        <CardText className={styles.free_cancel2}>Includes taxes and fees</CardText>
                                                    </Col>
                                                    {/* end  */}
                                                    {/* see detail */}
                                                    <Col xs="8">
                                                        <CardText className={styles.see_detail}>{item.free_cancel != true ? 'You can cancel later, so look in this great price today!' : ''}
                                                        </CardText>
                                                    </Col>
                                                    <Col xs="4" className={styles.text_end}>
                                                        <Button color="primary" className={`${styles.see_detail}`}>See availability</Button>
                                                    </Col>
                                                    {/* end */}
                                                </Row>
                                            </Col>
                                        </Row >
                                    </Card>
                                )
                            }) : 'Not Found'
                        }

                    </Col >
                </Row >
            </div >

            <Foot />
        </React.Fragment>
    );
}

export default Search;

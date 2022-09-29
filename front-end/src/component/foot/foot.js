import React from 'react';
import { CardBody, CardTitle, Row, Col, Input, Button } from 'reactstrap';
import styles from './foot.module.css';

const Foot = () => {
    const footerData = [
        {
            "col_number": 1,
            "col_values": [
                "Countries",
                "Regions",
                "Cities",
                "Districts",
                "Airports",
                "Hotels"
            ]
        },
        {
            "col_number": 2,
            "col_values": [
                "Homes",
                "Apartments",
                "Resorts",
                "Villas",
                "Hostels",
                "Guest houses"
            ]
        },
        {
            "col_number": 3,
            "col_values": [
                "Unique places to stay",
                "Reviews",
                "Unpacked: Travel articles",
                "Travel communities",
                "Seasonal and holiday deals"
            ]
        },
        {
            "col_number": 4,
            "col_values": [
                "Car rental",
                "Flight Finder",
                "Restaurant reservations",
                "Travel Agents"
            ]
        },
        {
            "col_number": 5,
            "col_values": [
                "Curtomer Service",
                "Partner Help",
                "Careers",
                "Sustainability",
                "Press center",
                "Safety Resource Center",
                "Investor relations",
                "Terms & conditions"
            ]
        }
    ]

    return (
        <div className={styles.section_foot}>
            <CardBody className={styles.inner_section_topfoot}>
                <CardTitle className="h1">Save time, save money!</CardTitle>
                <CardTitle>Sign up and we'll send the best deals to you</CardTitle>
                <CardTitle className={styles.subcribe}>
                    <Row className={styles.inner_subcribe}>
                        <Input type="text" placeholder='Your Email' />
                        <Button color="primary" className={styles.button_subscribe}>Subscribe</Button>
                    </Row>
                </CardTitle>
            </CardBody>
            <CardBody className={styles.inner_section_bottomfoot}>
                <Row>
                    <Col xs="2" className={styles.item_foot}>
                        {
                            footerData[0].col_values.map((item, index) => (
                                <CardTitle className={styles.inner_item} key={index}>{item}</CardTitle>
                            ))

                        }
                    </Col>
                    <Col xs="2" className={styles.item_foot}>
                        {
                            footerData[1].col_values.map((item, index) => (
                                <CardTitle className={styles.inner_item} key={index}>{item}</CardTitle>
                            ))

                        }
                    </Col>
                    <Col xs="2" className={styles.item_foot}>
                        {
                            footerData[2].col_values.map((item, index) => (
                                <CardTitle className={styles.inner_item} key={index}>{item}</CardTitle>
                            ))

                        }
                    </Col>
                    <Col xs="2" className={styles.item_foot}>
                        {
                            footerData[3].col_values.map((item, index) => (
                                <CardTitle className={styles.inner_item} key={index}>{item}</CardTitle>
                            ))

                        }
                    </Col>
                    <Col xs="2" className={styles.item_foot}>
                        {
                            footerData[4].col_values.map((item, index) => (
                                <CardTitle className={styles.inner_item} key={index}>{item}</CardTitle>
                            ))

                        }
                    </Col>
                </Row>
            </CardBody>
        </div>
    );
}

export default Foot;

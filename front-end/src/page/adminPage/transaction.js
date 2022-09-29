import React from 'react';
import styles from './module/transaction.module.css';
import { Table, CardBody, Col, Row, CardText, Button } from 'reactstrap';
import SidebarDashboard from '../../component/adminPage/sidebar/sidebarDashboard';
import { useQuery } from 'react-query';
import { fetchAllTransactions } from '../../store';
import { formatDate } from '../../init/init';


const TransactionList = () => {
    const { data } = useQuery('transaction-list', () => fetchAllTransactions());
    return (
        <React.Fragment>
            <Row>
                <Col xs={2} className={`p-0`}>
                    <SidebarDashboard />
                </Col>
                <Col xs={10} className={styles.content}>
                    <CardBody className={styles.table_content}>

                        <Row className={`${styles.title_table} h3 mb-3 mt-3`}>
                            <Col xs={9}>
                                <CardText>Transactions List</CardText>
                            </Col>
                        </Row>

                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" />
                                    </th>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Hotel</th>
                                    <th>Room</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Payment Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data != undefined ? data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td>{item.user_id._id}</td>
                                                <td>{item.user_id.username}</td>
                                                <td>{item.hotel_id.name}</td>
                                                <td>{item.room.map((item1) => {
                                                    return (
                                                        <span>{item1}, </span>
                                                    )
                                                })}</td>
                                                <td>{
                                                    formatDate(item.dateStart)
                                                }</td>
                                                <td>{
                                                    item.price
                                                }</td>
                                                <td>{item.payment}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    }) : ''
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default TransactionList;

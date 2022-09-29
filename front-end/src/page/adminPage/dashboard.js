import React from 'react';
import SidebarDashboard from '../../component/adminPage/sidebar/sidebarDashboard';
import { CardBody, Row, Col, Card, CardText, CardTitle, Table } from 'reactstrap';
import styles from './module/dashboard.module.css';
import { fetchAllTransactions, isAuth } from '../../store';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query'
import { formatDate } from '../../init/init';

const Dashboard = () => {
    const listCard = [{
        title: 'USERS',
        amount: '100',
        icon: 'fa fa-user'
    }, {
        title: 'ORDERS',
        amount: '100',
        icon: 'fa fa-shopping-cart'
    }, {
        title: 'EARNINGS',
        amount: '100',
        icon: 'fa fa-usd'
    }, {
        title: 'BALANCE',
        amount: '100',
        icon: 'fa fa-wallet'
    }
    ];
    const navigate = useNavigate();
    const dataUser = useQuery('isAuth', () => isAuth());
    const { data } = useQuery('all-transaction', () => fetchAllTransactions());
    React.useEffect(() => {
        if (dataUser.data != undefined && dataUser.data != false) {
            if (dataUser.data[0].idAdmin != 'true') { (navigate('/')) }
        }
    }, [dataUser.data]);
    return (
        <React.Fragment>
            <Row>
                <Col xs={2} className={`p-0`}>
                    <SidebarDashboard></SidebarDashboard>
                </Col>
                <Col xs={10} className={styles.content}>
                    <CardBody>
                        <Row>
                            {
                                listCard.map((item, index) => {
                                    return (
                                        <Col xs={3} key={index}>
                                            <Card className={`p-3 ${styles.card_item}`}>
                                                <CardTitle className={`h5 ${styles.title}`}>{item.title}</CardTitle>
                                                <CardText>{item.amount}</CardText>
                                                <CardTitle className={styles.icon}><i className={item.icon}></i></CardTitle>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </CardBody>
                    <CardBody className={styles.table_content}>
                        <CardTitle className={`${styles.title_table} h3 mb-3 mt-3`}>Latest Transaction</CardTitle>
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
                                                <td>{item.user_id.fullname}</td>
                                                <td>{item.hotel_id.name}</td>
                                                <td>{item.room.map((item) => {
                                                    return (<span>{item},</span>)
                                                })}</td>
                                                <td>{
                                                    formatDate(item.dateStart)
                                                }</td>
                                                <td>{item.price}</td>
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

export default Dashboard;

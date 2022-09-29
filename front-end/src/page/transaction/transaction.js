import React from 'react';
import { CardTitle, Table } from 'reactstrap';
import styles from './transaction.module.css';
import Navbar from '../../component/navbar/navbar';
import Foot from '../../component/foot/foot';
import { useQuery } from 'react-query';
import { fetchTransactions, isAuth } from '../../store';
import { formatDate } from '../../init/init';

const Transaction = () => {
    const dataUser = useQuery('isAuth', () => isAuth());
    const { data } = useQuery('transaction-list', () => fetchTransactions(dataUser.data[0]._id))
    return (
        <React.Fragment>
            <Navbar />
            <div className='section_content'>
                <div className={styles.wrapper}>
                    <CardTitle className='h1 mb-4 text-center'>Your Transaction</CardTitle>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
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
                                            <td>{index + 1}</td>
                                            <td>{item.hotel_id.name}</td>
                                            <td>{item.room.map((item) => {
                                                return (<span>Phòng {item}, </span>)
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
                </div>
            </div>
            <Foot />
        </React.Fragment>
    );
}

export default Transaction;

import React from 'react';
import styles from './module/roomList.module.css';
import { Table, CardBody, Col, Row, CardText, Button } from 'reactstrap';
import SidebarDashboard from '../../component/adminPage/sidebar/sidebarDashboard';

const Roomlist = () => {
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
                                <CardText>Rooms List</CardText>
                            </Col>
                            <Col xs={3} className={styles.wrapper_button}>
                                <Button>Add New</Button>
                            </Col>
                        </Row>

                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" />
                                    </th>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Max People</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>1</td>
                                    <td> <Button>Delete</Button></td>
                                </tr>

                            </tbody>
                        </Table>
                    </CardBody>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Roomlist;

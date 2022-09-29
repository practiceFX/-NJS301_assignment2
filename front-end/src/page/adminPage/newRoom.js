import React from 'react';
import styles from './module/newRoom.module.css';
import { Row, Col, CardBody, Input, FormGroup, Label, CardText, Button, Form } from 'reactstrap';
import SidebarDashboard from '../../component/adminPage/sidebar/sidebarDashboard';
import { createNewRoom, fetchAllHotel, updateRoomHotel } from '../../store';
import { useMutation, useQuery } from 'react-query';
import { convertArray } from '../../init/init';

const NewRoom = () => {
    const { data } = useQuery('hotel-list', () => fetchAllHotel());
    const addRoom = useMutation((data) => createNewRoom(data));
    const updateRooomHotel = useMutation((data) => updateRoomHotel(data))

    const addNewRoom = (e) => {
        addRoom.mutate({
            title: e.target.title.value,
            price: e.target.price.value,
            maxPeople: e.target.maxPeople.value,
            desc: e.target.desc.value,
            roomNumbers: convertArray(e.target.roomNumbers.value)
        })
        updateRooomHotel.mutate({
            _id: e.target.idHotel.value,
            rooms: e.target.title.value
        })
    }
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
                                <CardText>Add New Room</CardText>
                            </Col>
                        </Row>
                        <form onSubmit={addNewRoom}>

                            <Row>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <input type="text" placeholder="Title" name="title" className='form-control' />
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <input type="text" placeholder="description" name="desc" className='form-control' />
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <input type="text" placeholder="Price" name="price" className='form-control' />
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Max people</Label>
                                        <input type="text" placeholder="MaxPeople" name="maxPeople" className='form-control' />
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Rooms</Label>
                                        <input type="textarea" name="roomNumbers" className='form-control' />
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Features</Label>
                                        <select className="form-select" name='idHotel'>
                                            {
                                                data != undefined ? data.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    )
                                                }) : ''
                                            }
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col xs={3} className={styles.wrapper_bt}>
                                    <Button type="submit" color='primary' className={styles.button_send}>Add</Button>
                                </Col>
                            </Row>

                        </form>
                    </CardBody>
                </Col>
            </Row>
        </React.Fragment >

    );
}

export default NewRoom;

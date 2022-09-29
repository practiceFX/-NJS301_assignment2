import React from 'react';
import styles from './module/hotelList.module.css';
import { Table, CardBody, Col, Row, CardText, Button, Form, FormGroup, Label, CardTitle, Input } from 'reactstrap';
import SidebarDashboard from '../../component/adminPage/sidebar/sidebarDashboard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createHotel, deleteHotel, fetchAllHotel, updateHotel, updateRoomHotel } from '../../store';
import { convertArray } from '../../init/init';

const HotelList = () => {

    const queryClient = useQueryClient();

    const { data } = useQuery('list-hotel', () => fetchAllHotel());



    const [hotelUpdate, sethotelUpdate] = React.useState('');


    const [activeNewForm, setactiveNewForm] = React.useState(false);
    const [activeUpdate, setactiveUpdate] = React.useState(false);



    const removeHotel = useMutation((data) => deleteHotel(data), {
        onSuccess: () => queryClient.invalidateQueries('list-hotel')
    });

    const addNewHotel = useMutation((data) => createHotel(data), {
        onSucess: () => queryClient.invalidateQueries('list-hotel')
    })

    const modifiedHotel = useMutation((data) => updateHotel(data), {
        onSucess: () => queryClient.invalidateQueries('list-hotel')
    });

    const handleAddNew = () => {
        setactiveNewForm(!activeNewForm);
        sethotelUpdate('');
    }
    const deleteHotelList = (idHotel) => {
        if (window.confirm('Bạn muốn xóa dữ liệu ?')) {
            removeHotel.mutate(idHotel);
        }
    }

    const addNewHotelList = (e) => {
        if (activeUpdate == false) {
            addNewHotel.mutate({
                name: e.target.name.value,
                type: e.target.type.value,
                city: e.target.city.value,
                address: e.target.address.value,
                distance: e.target.distance.value,
                photos: convertArray(e.target.photos.value),
                desc: e.target.desc.value,
                rating: '4.6',
                feating: e.target.feating.value,
                rooms: convertArray(e.target.rooms.value),
            })
        } else if (activeUpdate != false) {
            modifiedHotel.mutate({
                _id: hotelUpdate._id,
                name: e.target.name.value,
                type: e.target.type.value,
                city: e.target.city.value,
                address: e.target.address.value,
                distance: e.target.distance.value,
                photos: convertArray(e.target.photos.value),
                desc: e.target.desc.value,
                rating: '4.6',
                feating: e.target.feating.value,
                rooms: convertArray(e.target.rooms.value)
            })

        }
    }
    const handlEditNew = () => {
        let count = 0;
        let idEdit = 0;
        let checkitem = document.getElementsByClassName('checkbox-listhotels');
        for (let i = 0; i < checkitem.length; i++) {
            if (checkitem[i].checked == true) {
                count++;
                idEdit = checkitem[i].id;
            }
        }
        if (count > 1 || count == 0) {
            alert('Please choose one item');
        } else {
            setactiveUpdate(!activeUpdate);
            setactiveNewForm(!activeNewForm);
            let itemUpdate = data.find((item) => {
                if (item._id == idEdit) {
                    return item
                }
            })
            sethotelUpdate(itemUpdate);

        }
    }


    return (
        <React.Fragment>
            <Row>
                <Col xs={2} className={`p-0`}>
                    <SidebarDashboard />
                </Col>
                <Col xs={10} className={styles.content}>
                    {
                        activeNewForm == true ? (
                            <CardBody className={styles.table_content}>
                                <Row className={`${styles.title_table} h3 mb-3 mt-3`}>
                                    <Col xs={9}>
                                        <CardText>Add New Products</CardText>
                                    </Col>
                                </Row>

                                <form onSubmit={addNewHotelList}>

                                    <Row>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input type="text" placeholder="Name" name="name" defaultValue={hotelUpdate != '' ? hotelUpdate.name : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>Type</Label>
                                                <Input type="text" placeholder="Type" name="type" defaultValue={hotelUpdate != '' ? hotelUpdate.type : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>City</Label>
                                                <Input type="text" placeholder="City" name="city" defaultValue={hotelUpdate != '' ? hotelUpdate.city : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>Address</Label>
                                                <Input type="text" placeholder="Address" name="address" defaultValue={hotelUpdate != '' ? hotelUpdate.address : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>Distance from City Center</Label>
                                                <Input type="text" placeholder="500" name="distance" defaultValue={hotelUpdate != '' ? hotelUpdate.distance : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>Description</Label>
                                                <Input type="text" placeholder="description" name="desc" defaultValue={hotelUpdate != '' ? hotelUpdate.desc : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <FormGroup>
                                                <Label>URL Image</Label>
                                                <Input type="textarea" name="photos" defaultValue={hotelUpdate != '' ? hotelUpdate.photos[0] : ''} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={2}>
                                            <FormGroup>
                                                <Label>Features</Label>
                                                <select className="form-select" name="feating">
                                                    <option value={false}>No</option>
                                                    <option value={true}>Yes</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup>
                                                <Label>Rooms</Label>
                                                <Input type="textarea" name="rooms" defaultValue={hotelUpdate != '' ? hotelUpdate.rooms.toString() : ''} />
                                            </FormGroup>
                                        </Col>
                                        {
                                            activeUpdate != false ? (
                                                <Button type="submit" color='primary' className={styles.button_send}>Update</Button>
                                            ) : (
                                                <Button type="submit" color='primary' className={styles.button_send}>Add</Button>
                                            )
                                        }

                                        <Button color='primary' className={styles.button_send} onClick={handleAddNew}>Cancel</Button>
                                    </Row>

                                </form>
                            </CardBody>
                        ) : (
                            <CardBody className={styles.table_content}>
                                <Row className={`${styles.title_table} h3 mb-3 mt-3`}>
                                    <Col xs={8}>
                                        <CardText>Hotels List</CardText>
                                    </Col>
                                    <Col xs={4} className={styles.wrapper_button}>
                                        <Button onClick={handleAddNew}>Add New</Button>
                                        <Button onClick={() => handlEditNew()} className={`mx-2`}>Edit</Button>
                                    </Col>

                                </Row>

                                <Table>
                                    <thead>
                                        <tr>
                                            <th>

                                            </th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Title</th>
                                            <th>City</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data != undefined ? data.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <input type="checkbox" className='checkbox-listhotels' id={item._id} />
                                                        </td>
                                                        <td>{item._id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.type}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.city}</td>
                                                        <td> <Button onClick={() => deleteHotelList(item._id)}>Delete</Button></td>
                                                    </tr>
                                                )
                                            }) : 'error'
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        )
                    }
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default HotelList;

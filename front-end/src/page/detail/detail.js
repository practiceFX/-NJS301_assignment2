import React from 'react';
import { Button, CardTitle, Row, CardImg, CardText, Col, CardBody, Label, Input, FormGroup } from "reactstrap";
import './detail.css';
import { DateRangePicker } from 'react-date-range';
import Navbar from '../../component/navbar/navbar';
import Foot from '../../component/foot/foot';

import moment from 'moment';

import { fetchEmptyRoom, fetchHotelDetail, reverseRoom } from '../../store';
import { useQuery, useMutation } from 'react-query';


import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";


const Detail = () => {
    const [startDate, setstartDate] = React.useState(new Date());
    const [endDate, setendDate] = React.useState(new Date());

    let navigate = useNavigate();

    const selectionRange = { //get value Date
        startDate: startDate,
        endDate: endDate
    }


    // total booking amount
    const [amountOfDay, setamountOfDay] = React.useState('');
    const totalBooking = (startDate, endDate) => {
        let day = moment(endDate).diff(startDate, 'days');
        setamountOfDay(day);
    }
    //end


    const handleClickDate = (item) => { // save value Date
        setstartDate(item.range1.startDate);
        setendDate(item.range1.endDate);
        totalBooking(item.range1.startDate, item.range1.endDate);
    }

    const { data } = useQuery('detail-hotel', () => fetchHotelDetail(idHotel));
    const dataDetail = useQuery('detail-booking', () => fetchEmptyRoom(idHotel, startDate, endDate));
    console.log(dataDetail?.data)
    // const [dataRoomBooked, setdataRoomBooked] = React.useState([])
    // console.log(dataDetail)


    const [activeForm, setactiveForm] = React.useState(false);


    const handleForm = () => {
        setactiveForm(!activeForm);
    }


    // get id-hotel query
    const search = useLocation().search;
    const idHotel = new URLSearchParams(search).get('id');
    const minPrice = new URLSearchParams(search).get('price');



    const photoArray = (photoString) => {
        if (photoString > 1) {
            return photoString.split(',');
        }
        else {
            return photoString;
        }

        // return array;
    }



    const [amountPrice, setamountPrice] = React.useState(0);
    const [roomBooked, setroomBooked] = React.useState([]);
    const getPrice = (e, price, amountOfDay, number) => {
        if (e.target.checked == true) {
            let amount = price * amountOfDay;
            setamountPrice(amountPrice + amount);
            setroomBooked([...roomBooked, number])
        }
        if (e.target.checked == false) {
            let amount = price * amountOfDay;
            setamountPrice(amountPrice - amount);
            setroomBooked(roomBooked.filter(item => item == number))
        }
    }


    const mutation = useMutation(data => reverseRoom(data));
    const bookedRoom = (e) => {
        mutation.mutate({
            user_id: String(e.target.user_id.value),
            hotel_id: String(e.target.hotel_id.value),
            room: roomBooked,
            dateStart: startDate,
            endStart: endDate,
            price: amountPrice,
            payment: e.target.payment.value,
            status: 'booked'
        })
        navigate('/');
        alert('You have successfully booked your room');
    }

    return (
        <React.Fragment>

            <Navbar />

            <div className='section_content'>
                <div className="section-page section-page--detail">
                    <div className="section-page__inner">
                        <Row>
                            <Col xs="8" className="p-0"><CardTitle className="h1"><strong>{data != undefined ? data[0]?.name : ''}</strong></CardTitle></Col>
                            <Col xs="4" className="button-reserved">
                                <Button xs="4" color="primary" >
                                    Reserve or Book Now!
                                </Button>
                            </Col>
                            <Col xs="12" className="p-0">
                                <CardTitle className="my-1">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    &nbsp;<strong>{data != undefined ? data[0]?.address : ''}</strong></CardTitle>
                                <CardTitle className="my-1 h5 distance">Excellent Location - {data != undefined ? data[0]?.distance : ''} from center</CardTitle>
                                <CardTitle className="my-1 description">Book a stay over $114 at this property and get a free airport taxi</CardTitle>
                            </Col>
                            {/* 
            image category 
            */}
                            <Col xs="12" className='p-0 mt-5 mb-5'>
                                <Row>
                                    {
                                        data != undefined ? photoArray(data[0]?.photos).map((item, index) => {
                                            return (
                                                <Col xs="4" className="p-0" key={index}>
                                                    <CardImg src={item}></CardImg>
                                                </Col>
                                            )
                                        }) : ''

                                    }

                                </Row>
                            </Col>
                            {/* 
            end image category 
            */}
                            {/* 
            card description 
            */}
                            <Col xs="12">
                                <Row className="card-description">
                                    <Col xs="8" className="left">
                                        <CardTitle className="h2 title"><strong>{data != undefined ? data[0]?.name : ''}</strong></CardTitle>
                                        <CardText>
                                            {data != undefined ? data[0]?.desc : ''}
                                        </CardText>
                                    </Col>
                                    <Col xs="4" className="right">
                                        <CardBody className="inner-content">
                                            <CardTitle className="title h4"><strong>Prefect for a night stay!</strong></CardTitle>
                                            <CardText className="text">
                                                Located in the real heart of Krakow, this property has an excellent location score of {data != undefined ? data[0]?.rating : ''}!
                                            </CardText>
                                            <CardText className="h3 price"><strong>Only to ${minPrice}</strong> (1 nights)</CardText>
                                            <Button color='primary' className="w-100 p-3" onClick={handleForm}>Reserve or Book Now!</Button>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Col>
                            {/* 
            end card description 
            */}

                            {
                                activeForm == false ? '' : (
                                    <form onSubmit={bookedRoom}>

                                        <input type="hidden" name="hotel_id" value={data[0]._id} />
                                        <input type="hidden" name="user_id" value='632dad890c772027b02fbb26' />

                                        <Col xs="12">
                                            <Row>
                                                <Col xs="6">
                                                    <CardTitle className="h4 mb-3 mt-3">Dates</CardTitle>
                                                    <DateRangePicker
                                                        ranges={[selectionRange]}
                                                        onChange={handleClickDate}
                                                        className={`item-input item-input--date`}
                                                    />
                                                </Col>
                                                <Col xs="6">

                                                    <FormGroup>
                                                        <Label >Your Full Name</Label>
                                                        <Input type="text" disabled />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label >Your Email</Label>
                                                        <Input type="text" disabled />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label >Your Phone Number</Label>
                                                        <Input type="text" disabled />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label >Your Identity Card Number</Label>
                                                        <Input type="text" disabled />
                                                    </FormGroup>


                                                </Col>
                                            </Row>
                                        </Col>


                                        <Col xs="12">
                                            <CardTitle className="h4 mb-3 mt-3">Select Rooms</CardTitle>
                                        </Col>
                                        <Row>

                                            {
                                                dataDetail?.data?.allRoom.map((item, index) => {
                                                    return (
                                                        <Col xs={6} key={index} className="mb-4">
                                                            <Row>
                                                                <Col xs={8} >
                                                                    <CardTitle className="h5 mb-2">
                                                                        {item.title}
                                                                    </CardTitle>
                                                                    <CardTitle className="p mb-2">
                                                                        Max people: {item.maxPeople}
                                                                    </CardTitle>
                                                                    <CardTitle className="h5 mb-3">
                                                                        Price: ${item.price}

                                                                    </CardTitle>
                                                                </Col>
                                                                <Col xs={4} className="wrapper_select_room">

                                                                    {

                                                                    }
                                                                    <ul className="select_room">
                                                                        {
                                                                            item.roomNumbers.map((number, index) => {

                                                                                if (dataDetail?.data?.arrayRoomBook[0]?.room.includes(number)) {
                                                                                    return (
                                                                                        <li key={index} style={{ opacity: '0.6' }}>
                                                                                            <label>{number}</label><br />
                                                                                            <input type="checkbox" name="fav_language" onChange={(e) => { getPrice(e, item.price, amountOfDay, number) }} disabled />
                                                                                        </li>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <li key={index}>
                                                                                            <label>{number}</label><br />
                                                                                            <input type="checkbox" name="fav_language" onChange={(e) => { getPrice(e, item.price, amountOfDay, number) }} />
                                                                                        </li>
                                                                                    )
                                                                                }
                                                                            })

                                                                        }
                                                                    </ul>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    )
                                                })
                                            }


                                        </Row>




                                        <CardTitle className="h2">Total Bill: ${amountPrice} ({amountOfDay} night)</CardTitle>
                                        <Row>
                                            <Col xs={3} className="p-0 mt-3">
                                                <select className="form-select" defaultValue="" name='payment'>
                                                    <option value="Payment">Phương thức thanh toán</option>
                                                    <option value="cash">Tiền mặt</option>
                                                    <option value="credit">Thẻ tín dụng</option>
                                                </select>
                                            </Col>
                                            <Col xs={3}>
                                                <Button type="submit" color="primary" className="mt-3">
                                                    Reserve Now
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                )
                            }

                        </Row>

                    </div >
                </div >
            </div >


            <Foot />

        </React.Fragment >
    );
}

export default Detail;

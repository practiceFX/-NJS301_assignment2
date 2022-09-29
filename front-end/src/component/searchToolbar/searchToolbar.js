import React from 'react';
import './searchToolbar.css';
import { Row, Col, Input, Button, DropdownToggle, Dropdown, DropdownMenu, CardTitle, CardBody } from 'reactstrap';
import { DateRangePicker } from 'react-date-range';
import CounterInput from "react-counter-input";
import { useQuery, useQueryClient } from 'react-query';
import { searchHotel } from '../../store';
import { useNavigate } from 'react-router';

const SearchToolbar = () => {
    //status to show, hide picker when click 
    const navigate = useNavigate();

    const [activeDatePicker, setactiveDatePicker] = React.useState(true);
    //end

    const [startDate, setstartDate] = React.useState(new Date());
    const [endDate, setendDate] = React.useState(new Date());




    // save value of date when picker on DatePichker 
    const selectionRange = { //get value Date
        startDate: startDate,
        endDate: endDate
    }

    const handleChange = (item) => { // save value Date
        setstartDate(item.range1.startDate);
        setendDate(item.range1.endDate);
    }
    //end

    //convert to String and show on input date
    const convertDatrToString = (start, end) => {
        let startDate = start != '' ? (start.getDate() + ' - ' + start.getMonth() + ' - ' + start.getFullYear()) : null;
        let endDate = end != '' ? (end.getDate() + ' - ' + end.getMonth() + ' - ' + end.getFullYear()) : null;
        return startDate + ' to ' + endDate;
    }


    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const [adult, setadult] = React.useState(0);
    const [child, setchild] = React.useState(0);
    const [room, setroom] = React.useState(0)
    const [city, setcity] = React.useState('');
    const queryClient = useQueryClient();

    const { data, refetch } = useQuery('search-list', () => searchHotel(adult, child, city, startDate, endDate))
    refetch();
    const searchResults = (e) => {
        e.preventDefault();
        console.log(data)
        navigate('/search');
    }
    return (
        <form onSubmit={searchResults}>
            <Row className="search-area p-3">
                <Col xs="3">
                    <i className="fa fa-bed icon-input" aria-hidden="true"></i>
                    <Input type="text" className="item-input " placeholder="Where are you going?" onChange={e => setcity(e.target.value)} />
                </Col>
                <Col xs="3">
                    <i className="fa fa-calendar icon-input" aria-hidden="true"></i>
                    <Input type="text" onChange={() => convertDatrToString(startDate, endDate)} value={convertDatrToString(startDate, endDate)}
                        placeholder="06/24/2022 to 06/24/2022" className='item-input' onClick={() => setactiveDatePicker(!activeDatePicker)} />
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={(e) => handleChange(e)}
                        className={`item-input item-input--date ${activeDatePicker == true ? 'hide-datePicker' : ''}`}
                    />
                </Col>
                <Col xs="3">
                    <i className="fa fa-male icon-input" aria-hidden="true"></i>
                    {/* <Input type="text" className="item-input item-input--count" placeholder="1 adult - 0 children - 1room" /> */}
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="item-input item-input--count">
                        <DropdownToggle
                            data-toggle="dropdown"
                            tag="span"

                        >
                            1 adult - 0 children - 1 room
                        </DropdownToggle>
                        <DropdownMenu>
                            <CardTitle className='item-search-people'>
                                <CardBody className='text'>Người lớn</CardBody>
                                <CounterInput
                                    min={0}
                                    max={10}
                                    onCountChange={count => setadult(count)}
                                />
                            </CardTitle>
                            <CardTitle className='item-search-people'>
                                <CardBody className='text'>Trẻ em</CardBody>
                                <CounterInput
                                    min={0}
                                    max={10}
                                    onCountChange={count => setchild(count)}
                                />
                            </CardTitle>
                            <CardTitle className='item-search-people'>
                                <CardBody className='text'>Phòng</CardBody>
                                <CounterInput
                                    min={0}
                                    max={10}
                                    onCountChange={count => setroom(count)}
                                />
                            </CardTitle>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col xs="3" className="text-center">
                    <Button type="submit" color="primary" className="bt-search p-2 w-75 m-auto">Search</Button>
                </Col>
            </Row>
        </form>
    );
}

export default SearchToolbar;

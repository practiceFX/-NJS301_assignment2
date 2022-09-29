import React from 'react';
import styles from './navbar.module.css';
import { Button, CardBody, CardImg, Col, Row } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { isAuth, logOutUser } from '../../store';

const Navbar = () => {
    const navbarData = [
        {
            type: "Home",
            icon: "fa fa-home",
            path: "/"
        },
        {
            type: "Stays",
            icon: "fa fa-bed",
            path: "/stay"
        },
        {
            type: "Flights",
            icon: "fa fa-plane",
            path: "/flights"
        },
        {
            type: "Car rentals",
            icon: "fa fa-car",
            path: "/car"
        },
        {
            type: "Attractions",
            icon: "fa fa-bed",
            path: "/attractions"
        },
        {
            type: "Airport taxis",
            icon: "fa fa-taxi",
            path: "/airport"
        }
    ]
    const navigate = useNavigate();
    const { data } = useQuery('isAuth', () => isAuth());
    const dataLogout = useMutation((data) => logOutUser(data));
    const path = useLocation().pathname;
    const [isLogout, setisLogout] = React.useState(data);
    const logOut = () => {
        dataLogout.mutate(false);
        setisLogout(false);
    }
    React.useEffect(() => {
        if (isLogout == false) {
            if (path != '/login' && path != '/register') {
                navigate('/login');
            }
        }
    })
    return (
        <div className={styles.wrapper_navbar}>
            <div className={styles.section_header}>
                <Row className={styles.inner_header}>
                    <Col className={styles.logo} xs={7} >
                        <CardImg src={process.env.PUBLIC_URL + '/images/logo.png'} className={styles.logo} />
                        <span className='h3'>Booking website</span>
                    </Col>

                    <Col className={styles.action_header} xs={5}>
                        {
                            data != undefined && data.length > 0 ? (
                                <React.Fragment>
                                    <Button className={styles.button_action} color="primary" onClick={() => logOut()}>Log out</Button>
                                    <Link to="/transaction">
                                        <Button className={`${styles.button_action} ml-3`} color="primary">Transaction</Button>
                                    </Link>
                                    <span className='pr-5 text-light'>{data[0].email}</span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Link to='/login'><Button className={styles.button_action} color="primary">Login</Button></Link>
                                    <Link to='/register'>
                                        <Button className={styles.button_action} color="primary">Register</Button>
                                    </Link>
                                </React.Fragment>
                            )
                        }
                    </Col>
                </Row>
            </div>
            <CardBody className={styles.section_navbar}>
                <Row className={styles.inner_navbar}>
                    {
                        navbarData.map((item, index) => (
                            <Col xs="2" className={styles.navbar_item} key={index}>
                                <Link to={item.path}>
                                    <i className={`${item.icon}  ${styles.icon_item}`} aria-hidden="true"></i> &nbsp;
                                    <span className={styles.text_link}>{item.type}</span>
                                </Link>
                            </Col>
                        ))
                    }
                </Row>
            </CardBody>
        </div >
    );
}

export default Navbar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardBody, CardTitle } from 'reactstrap';
import styles from './sidebar.module.css';

const SidebarDashboard = () => {
    const sidebarList = [{
        title: 'MAIN',
        list: [
            {
                icon: 'fa fa-dashboard',
                name: 'Daskboard',
                path: '/admin/home'
            }
        ]
    }, {
        title: 'LIST',
        list: [
            {
                icon: 'fa fa-user',
                name: 'Users',
                path: ''
            },
            {
                icon: 'fa fa-home',
                name: 'Home',
                path: '/admin/home-list'
            },
            {
                icon: 'fa fa-bed',
                name: 'Room',
                path: ''
            },
            {
                icon: 'fa fa-exchange',
                name: 'Transaction',
                path: '/admin/tran-list'
            }
        ]
    },
    {
        title: 'NEW',
        list: [
            {
                icon: 'fa fa-home',
                name: 'New Hotel',
                path: ''
            },
            {
                icon: 'fa fa-bed',
                name: 'New Room',
                path: '/admin/new-room'
            }
        ]
    },
    {
        title: 'USER',
        list: [
            {
                icon: 'fa fa-sign-out',
                name: 'Log out'
            }
        ]
    }
    ]
    const path = useLocation().pathname;
    return (
        <CardBody className={styles.wrapper}>
            <CardTitle className={`h4 ${styles.title}`}>DASHBOARD</CardTitle>
            {
                sidebarList.map((item, index) => {
                    return (
                        <ul className={`${styles.list_name} p-0`} key={index}>
                            <CardTitle>{item.title}</CardTitle>
                            {
                                item.list.map((item1, index1) => {
                                    return (
                                        <ul className={styles.item_list_name} key={index1}>
                                            <Link to={item1.path}>
                                                <li className={`${path == item1.path ? 'active-sidebar-admin' : ''} p-2`}>
                                                    <i className={`${item1.icon} ${styles.icon} ${path == item1.path ? 'active-item-sidebar' : ''}`} ></i>&nbsp;
                                                    <span>{item1.name}</span>
                                                </li>
                                            </Link>
                                        </ul>
                                    )
                                })
                            }
                        </ul>
                    )
                })
            }
        </CardBody >
    );
}

export default SidebarDashboard;

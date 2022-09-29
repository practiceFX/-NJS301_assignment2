import React from 'react';
import { Route, Routes } from 'react-router';

import './App.css';

import Home from './page/home/home';
import Detail from './page/detail/detail';
import Search from './page/search/search';

import Transaction from './page/transaction/transaction';
import Dashboard from './page/adminPage/dashboard';
import HotelList from './page/adminPage/hotelList';
import RoomList from './page/adminPage/roomlist';
import TransactionList from './page/adminPage/transaction';
import NewRoom from './page/adminPage/newRoom';
import Login from './page/login/login';
import Register from './page/Register/register';





const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/search' element={<Search />} />
        <Route path='/register' element={<Register />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/home' element={<Dashboard />} />
        <Route path='/admin/home-list' element={<HotelList />} />
        <Route path='/admin/room-list' element={<RoomList />} />
        <Route path='/admin/tran-list' element={<TransactionList />} />
        <Route path='/admin/new-room' element={<NewRoom />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

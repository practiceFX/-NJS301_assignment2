import React from 'react';
import Banner from '../../component/bannerHead/banner'

import SearchToolbar from '../../component/searchToolbar/searchToolbar';
import City from './homeSection/city';
import TopHome from './homeSection/topHome';
import TypeHome from './homeSection/typeHome';

import Navbar from '../../component/navbar/navbar';
import Foot from '../../component/foot/foot';

const Home = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Banner />
            <div className='section_content'>
                <SearchToolbar />
                <City />
                <TypeHome />
                <TopHome />
            </div>
            <Foot />
        </React.Fragment>
    );
}

export default Home;

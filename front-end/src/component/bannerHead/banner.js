import React from 'react';
import Slider from 'react-slick';
import { CardImg, CardTitle } from 'reactstrap';
import styles from './banner.module.css';


const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

const slideItem = [{
    title: 'KHÁM PHÁ NGÀY HỘI BÓNG ĐÁ LỚN NHẤT THỂ GIỚI TẠI QUATAR',
    urlImage: process.env.PUBLIC_URL + '/images/slider1.webp'
},
{
    title: 'DU LỊCH TẠI SINGAPO MÙA HÈ NÀY',
    urlImage: process.env.PUBLIC_URL + '/images/slider2.png'

},
{
    title: 'ĐẶT VÉ ĐẾN VŨNG TÀU MÙA LỄ HỘI',
    urlImage: process.env.PUBLIC_URL + '/images/slider3.jpg'
}]
const Banner = () => {
    return (
        <div className={styles.wrapper_slider}>
            <Slider {...setting}>
                {
                    slideItem.map((item, index) => {
                        return (
                            <div key={index}>
                                <CardImg style={{ backgroundImage: "url(" + item.urlImage + ")" }} className={styles.image_banner} />
                                <CardTitle className={`${styles.text_banner} h2`}>
                                    {
                                        item.title
                                    }
                                </CardTitle>
                            </div>
                        )
                    })
                }
            </Slider >
        </div>
    );
}

export default Banner;

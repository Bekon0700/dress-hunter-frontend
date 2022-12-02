import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8&w=1000&q=80',
    'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8amVhbnN8ZW58MHx8MHx8&w=1000&q=80',
    'https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/whirlpoolv2/en-us/marketing-content/site-assets/page-content/oc-articles/how-to-wash-jeans/How-to-Wash-Jeans-4.jpg?fmt=png-alpha&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0&scl=1&constrain=fit,1',
]

const HomeSlider = () => {
    const settings = {
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 6000,
        cssEase: "linear"
    };
    return (
        <div className='w-11/12 lg:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center py-12'>
            <div className='w-5/6'>
                <p className='text-4xl lg:text-7xl font-light'>we bring <br/><span className='text-[#FFAE5D] font-bold'> your demand</span><br/> at your doorstep!</p>
            </div>
            <div>
                <Slider {...settings} className='-z-20'>
                    {
                        data.map((img, id) => {
                            return <img src={img} key={id} className='h-96 lg:h-[600px] w-full rounded-lg' />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default HomeSlider
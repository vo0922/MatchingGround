import React from "react";
import Carousel from "react-slick";
import LocationOn from "@material-ui/icons/LocationOn";
import {Card, Grid, Typography} from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SectionCarousel(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    height:400,
  };
  return (
        <Card>
          <Carousel {...settings}>
            <div>
              <img
                src="backgroundimage/background5.jpg"
                alt="First slide"
                className="slick-image"
                height="400px"
                width="100%"
              />
              <div className="slick-caption">
                <Typography variant="h5" style={{textAlign:"center", marginTop:10,}}>
                  <LocationOn className="slick-icons" />대구한의대학교 운동장
                </Typography>
              </div>
            </div>
            <div>
              <img
                src="backgroundimage/background2.jpg"
                alt="Second slide"
                className="slick-image"
                height="400px"
                width="100%"
              />
              <div className="slick-caption">
              <Typography variant="h5" style={{textAlign:"center", marginTop:10}}>
                  <LocationOn className="slick-icons" />눅눅이 경기장
                </Typography>
              </div>
            </div>
            <div>
              <img
                src="backgroundimage/background3.jpg"
                alt="Third slide"
                className="slick-image"
                height="400px"
                width="100%"
              />
              <div className="slick-caption">
                <Typography variant="h5" style={{textAlign:"center", marginTop:10}}>
                  <LocationOn className="slick-icons" />엘모 경기장
                </Typography>
              </div>
            </div>
          </Carousel>
        </Card>
  );
}
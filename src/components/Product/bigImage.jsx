import React from "react";

export const BigImage = (props) => {
        const {clickedProduct, img, handleMinImageClick,handlePrevClick,handleNextClick} =props;
        return (
            <div className="big_image_content">
                <button onClick={handlePrevClick}>&#60;</button>
                <img onClick={handleMinImageClick} src={clickedProduct[0].urls[img]} alt=""/>
                <button onClick={handleNextClick}>&#62;</button>

            </div>
        )

}
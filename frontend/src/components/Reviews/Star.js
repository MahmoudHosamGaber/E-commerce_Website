import React, { useState, useEffect } from 'react';
const Star = ({avg, index, color, size}) => {
    return ( 
        <>
            <span>
                <i  style={{ color, size }}
                    className={
                    avg>=index 
                        ? "fas fa-star"
                        : avg >= index-0.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
                }></i>
            </span>

        </>
     );
}
Star.defaultProps = {
    color: '#f1c40f',
    size: '1.5em',
}
export default Star;
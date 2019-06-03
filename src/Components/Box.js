import React from 'react'

const Box = (props) => {
    const { box } = props;
    return (
        <div
            onClick = {()=>{props.onFieldClick(props.box)}}
            className={box.computer && box.active
            ? `box red`
            : box.user && box.active
                ? `box user`
                : box.active
                    ? `box active`
                    : `box`} 
        ></div>
    )
}

export default Box

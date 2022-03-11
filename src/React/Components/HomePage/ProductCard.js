
import React from 'react'

import { IoMdCart } from "react-icons/io";

export default function ProductCard ({productName , price , inStock ,imgUrl , onAddChart}) {
    return(
        <>
         <div className='CardWrapper'>
                 <img src={imgUrl} className='CardWrapperImage' alt={'image not Found 404'}/>
                 <p className='text-center'>{productName}</p>
                 <p className='text-center'>{price + ' : '}قیمت فروخت</p>
                 <p className={`text-center ${parseInt(inStock) <=0 ? 'text-danger' : 'text-info'}`}>{inStock} <IoMdCart/></p>
                 <button type="button" className="btn btn-dark AddBtnCard w-100"
                   onClick={(e)=>{
                       e.preventDefault()
                       onAddChart()
                   }}
                 >چارٹ میں شامل کریں</button>
         </div>
        </>
    )
}
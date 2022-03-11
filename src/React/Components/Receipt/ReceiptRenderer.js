
import React, {useEffect, useState} from 'react'

import Receipt from "./Receipt"

export default function ReceiptRenderer (props) {

    const [name , SetName]       = useState('')
    const [number , SetNumber]   = useState('')
    const [address , SetAddress] = useState('')

    const filterProducts = props.saledRecord.filter((product ,idx)=> product.name.toLowerCase().includes(name.toLowerCase()) && product.contactNumber.includes(number) && product.address.toLowerCase().includes(address.toLowerCase()))



    return(
        <>
         <div className={`ReceiptMainDiv d-flex w-100 h-100 flex-column NoBorder`}>
             <div className={'d-flex container justify-content-center mt-2 INotPrintAble'}>
                 <form>
                     <div className="row">
                         <div className="col">
                             <input type={'text'} className={'startDate form-control shadow-sm px-4 font-monospace border-bottom border-primary INotPrintAble'} placeholder={'Search By Name'}
                                    onChange={(e)=>{
                                        SetName(e.target.value)
                                    }} value={name}
                             />
                         </div>
                         <div className="col">
                             <input type={'number'} className={'mx-1 EndDate form-control shadow-sm px-4 font-monospace border-bottom border-primary INotPrintAble'} placeholder={'Search By Number'} maxLength={'11'}
                                    onChange={(e)=>{
                                        SetNumber(e.target.value)
                                    }} value={number}
                             />
                         </div>
                         <div className="col">
                             <input type={'text'} className={'mx-1 EndDate form-control shadow-sm px-4 font-monospace border-bottom border-primary INotPrintAble'} placeholder={'Search By Address'}
                                    onChange={(e)=>{
                                        SetAddress(e.target.value)
                                    }} value={address}
                             />
                         </div>
                     </div>
                 </form>
             </div>
             {filterProducts && filterProducts.reverse().map((product , idx)=><Receipt key = {idx} billObj={product} canShowPrintBtn={true} idx={idx}/>)}
         </div>
        </>
    )
}

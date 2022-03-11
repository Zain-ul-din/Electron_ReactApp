import React, {useRef, useState} from 'react'


import { STDDateFormat} from "../App"



// user Receipt Renderer

const Receipt = ({billObj , canShowPrintBtn , idx})=>{

   return (
       <>
           <div className={'d-flex h-25 mb-5 w-100 INotPrintAble'}></div>
           <div className={` ReceiptContainer p-5 mt-5 ${'idx'+idx} INotPrintAble mt-5` } >
               <h1 className='text-center '>چوہدری ٹریڈرز - ساہوکا</h1>

               <div className='InvoiceInputDate text-start mt-4'>
                   <label className='fs-5 mono-text'>  Date : {STDDateFormat(StringToDate(billObj.date))}</label>
               </div>

               <div className='InvoiceInput text-end'>
                   <input type={'text'} className ='fs-2 px-2'  value = {billObj.name} readOnly/>
                   <label className='fs-2 mono-text'> : نام  </label>
               </div>

               <div className='InvoiceInput text-end '>
                   <input type={'text'} className ='fs-4 px-2' maxLength="11"  value = {billObj.contactNumber} readOnly/>
                   <label className='fs-3 mono-text'> : فون نمبر </label>
               </div>

               <div className='InvoiceInput text-end '>
                   <input type={'text'} className ='fs-2 px-2' value={billObj.address} readOnly/>
                   <label className='fs-2 mono-text'> : پتہ </label>
               </div>

               { /* Table */}

               <div className='TableMargin'>
                   <table>
                       <thead>
                       <tr>
                           <th className={'bg-light text-dark font-monospace'}>کل قیمت</th>
                           <th className={'bg-light text-dark font-monospace'}>مقدار</th>
                           <th className={'bg-light text-dark font-monospace'}>قیمت</th>
                           <th className={'bg-light text-dark font-monospace'}>نام</th>
                       </tr>
                       </thead>
                       <tbody>
                        {billObj && billObj.products.map((chartProduct , idx)=> < TableEntry
                           name = {chartProduct.name}
                           price = {chartProduct.price}
                           id ={chartProduct.id}
                           key = {idx}
                           qt = {chartProduct.qt}
                           total = {chartProduct.total}
                        />)}
                       </tbody>
                   </table>
               </div> {/* Table Div End*/}
               <div className='InvoiceInput text-end '>
                   {/*  <input type={'text'} className ='fs-2'/> */}
                   <label className='fs-2 mono-text '><i className={'text-decoration-underline'}>{billObj.totalBill + ' : '}</i>   کل قیمت</label>
               </div>
               { canShowPrintBtn ?
                   <div className={'INotPrintAble d-flex justify-content-center mb-5'}>
                       <button className={'INotVisible btn btn-primary m-3 text-center '}
                               onClick={(e) => {
                                   e.preventDefault()
                                   let thisClassName = '.' + 'idx' + idx
                                   document.querySelector(thisClassName).classList.add('Print')
                                   document.querySelector(thisClassName).classList.remove('INotPrintAble')
                                   print()
                                   document.querySelector(thisClassName).classList.remove('Print')
                                   document.querySelector(thisClassName).classList.add('INotPrintAble')
                               }}
                       >Print
                       </button>
               </div> : <></> }
               <hr className={'INotPrintAble fs-2 text-dark'}/>
           </div>
       </>
   )
}

export default Receipt

const StringToDate = (str)=>{
    let list = str.split('-' , str.length)
    list[1] = parseInt(list[1]) - 1
    return new Date(list[0] , list[1] , list[2]).toString() === 'Invalid Date' ?
        null :
        new Date(list[0] , list[1] , list[2])
}

// Table Entry Component
const TableEntry = (props) =>{

    return(
        <>
            <tr className={'bg-light'}>
                <td data-column="Name">{props.total}</td>
                <td data-column="QT">{props.qt}</td>
                <td data-column="Sale Price">{props.price}</td>
                <td data-column="Name">{props.name}</td>
            </tr>
        </>
    )
} // Table Entry end ....
import React, {useEffect, useState} from 'react'
import toast from "react-hot-toast"

import { STDDateFormat } from '../App'

import { MdRemoveShoppingCart } from "react-icons/md"

import { DateToString } from "../App";

// Default export



export default function Invoice ({products , SetProducts , chartProductArray , SetChartProductsArray , saledRecord , SetSaledRecords , chatRef}) {

    // Bill Scheme
    const InvoiceObj = {
        name : '' ,
        address : '' ,
        contactNumber : '',
        date : DateToString(new Date()) ,
        products : [] ,
        totalBill : 0 ,
    }

    const [total , SetTotal] = useState(0)

    // customer Info Hooks
    const [customerName , SetCustomerName] = useState('')
    const [customerAddress , SetCustomerAddress] = useState('')
    const [customerContactNumber , SetCustomerContactNumber] = useState('')

    const DeleteElement = (key) => {
        let auxiliaryArray = [...chartProductArray]
        let isDeleted = false
        auxiliaryArray =  auxiliaryArray.filter((cp ,idx)=>{
            if(cp.id == key && !isDeleted)
                isDeleted = true
            else return cp
        })

        auxiliaryArray.forEach((ele , idx)=>{
            ele.id = idx
        })

        SetChartProductsArray(auxiliaryArray)
    }

    const SubmitInvoiceData = ()=>{
        let isValid = chartProductArray.length > 0 && customerName != ''
        if(isValid && customerContactNumber.length > 0) {
            isValid = customerContactNumber.length === 11
            if(!isValid)
                toast.error('Invalid Contact Number !') // number err
        }

        chartProductArray.forEach((ele)=>{
            if(ele.inStock < ele.qt)
                isValid = false
        })

        if(!isValid){
            toast.error('Out Of Stock !')
            return
        }

        if(isValid){
            InvoiceObj.name = customerName
            InvoiceObj.address = customerAddress
            InvoiceObj.contactNumber = customerContactNumber
            InvoiceObj.products = chartProductArray.filter((ele)=>{
                ele.total = ele.qt * ele.price
                return ele
            })

            InvoiceObj.totalBill = total

            let auxiliaryArray = [...saledRecord]
            InvoiceObj.products.forEach((ele)=>{
                ele.inStock = parseInt(ele.inStock) - parseInt(ele.qt)
            })
            auxiliaryArray.push(InvoiceObj)

            // Updates Real Data
            let productsAuxiliaryArray = [...products]

            productsAuxiliaryArray = productsAuxiliaryArray.filter((element)=>{
               InvoiceObj.products.forEach((product)=>{
                   if(element.name == product.name)
                       element.inStock = product.inStock
               })
               return element
            })

            SetProducts(productsAuxiliaryArray)
            SetSaledRecords(auxiliaryArray)

            // Do Analysis Here !

            toast.success ('Data Has Been Submitted !')

            // Resets Hooks to back
            SetCustomerName('')
            SetCustomerAddress('')
            SetCustomerContactNumber('')
            SetChartProductsArray([])
            SetTotal(0)
        }else toast.error('Some Fields Are Missing')
    }

    return (
        <>
           <div className='InvoiceContainer Print'>
               <h1 className='text-center '>چوہدری ٹریڈرز - ساہوکا</h1>

               <div className='InvoiceInputDate text-start mt-4'>
                   <label className='fs-5 mono-text'>  Date  : {STDDateFormat(new Date())}</label>
              </div>

               <div className='InvoiceInput text-end'>
                   <input type={'text'} className ='fs-2' onChange={(e)=>{
                       SetCustomerName(e.target.value)
                   }} value = {customerName} />
                   <label className='fs-2 mono-text'> : نام  </label>
               </div>

               <div className='InvoiceInput text-end '>
                   <input type={'number'} className ='fs-4' maxLength="11" onChange={(e)=>{
                       SetCustomerContactNumber(e.target.value)
                   }} value = {customerContactNumber}/>
                   <label className='fs-3 mono-text'> : فون نمبر </label>
               </div>
                
               <div className='InvoiceInput text-end '>
                   <input type={'text'} className ='fs-2' onChange={(e)=>{
                       SetCustomerAddress(e.target.value)
                   }} value = {customerAddress}/>
                   <label className='fs-2 mono-text'> : پتہ </label>
               </div>
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
       {chartProductArray && chartProductArray.map((chartProduct , idx)=> < TableEntry
         name = {chartProduct.name}
         price = {chartProduct.price}
         id ={chartProduct.id}
         DeleteElement={DeleteElement}
         key = {idx}
         qt = {chartProduct.qt}
         inStock = {chartProduct.inStock}
         IncQT = {()=>{
             chartProduct.qt += 1
         }}

         DecQT = {()=>{
             if(chartProduct.qt > 0)
                 chartProduct.qt -= 1
         }}

         total = {total}
         SetTotal = {SetTotal}
       />)}
   </tbody>
   </table>
   </div> {/* Table Div End*/}

        <div className='InvoiceInput text-end ' ref= {chatRef}>
            {/*  <input type={'text'} className ='fs-2'/> */}
             <label className='fs-2 mono-text '><i className={'text-decoration-underline'}>{total + ' : '}</i>   کل قیمت</label>
        </div>
               <div className={'INotPrintAble d-flex justify-content-center '}>
                 <button className={'INotVisible btn btn-success m-3 text-center'}
                 onClick={(e)=>{
                     e.preventDefault()
                     SubmitInvoiceData()
                 }}
                 >Submit</button>
                 <button className={'INotVisible btn btn-primary m-3 text-center '}
                   onClick = {(e)=>{
                       e.preventDefault()
                       print()
                   }}
                 >Print</button>
               </div>
   </div>
    </>
   )
}

// Table Entry Component
const TableEntry = (props) =>{
    const [ qt , SetQt] = useState(0)
    const [ total , SetTotal] = useState(0)

    useEffect(()=>{
        SetQt(props.qt)
        SetTotal(props.qt * props.price)
    } , [props])

    useEffect(()=>{
        SetTotal(qt * props.price)
    } , [qt])

    return(
        <>
            <tr className={'bg-light'}>
                <td data-column="Name">{total}</td>
                <td data-column="QT" className={`${ qt > props.inStock ? 'text-danger' : 'text-success'}`}>{qt}</td>
                <td data-column="Sale Price">{props.price}</td>
                <td data-column="Name">{props.name}</td>
                <th className='INotPrintAble bg-light'>
                    <button type="button" className="btn btn-success btn-sm TablecontrolBtn"
                            onClick={(e)=>{
                                e.preventDefault()
                                props.IncQT()
                                SetQt(qt+1)
                                props.SetTotal(props.total + props.price)
                            }}
                    >+</button>
                </th>
                <th className='INotPrintAble bg-light'>
                    <button type="button" className="btn btn-warning btn-sm TablecontrolBtn "
                            onClick={(e)=>{
                                e.preventDefault()
                                if(qt > 0){
                                    props.DecQT()
                                    SetQt(qt - 1)
                                    props.SetTotal(props.total - props.price)
                                }
                            }}
                    >-</button>
                </th>
                <th className='INotPrintAble bg-light'>
                    <button type="button" className="btn btn-danger btn-sm CPDEleteBtn"
                            onClick={(e)=>{
                                e.preventDefault()
                                SetTotal(qt * props.price)
                                props.SetTotal(props.total - total)
                                props.DeleteElement(props.id)
                            }}
                    ><MdRemoveShoppingCart/></button>
                </th>
            </tr>
        </>
    )
} // Table Entry end ....
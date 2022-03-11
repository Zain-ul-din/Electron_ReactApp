import React, {useEffect, useMemo, useState} from 'react'
import { DateToString , StringToDate ,  STDDateFormat , LoadPurchaseProducts} from "../App"

import { JsonToExcel } from 'react-json-excel';

import { SiGooglesheets } from "react-icons/si"

import { FaWpforms , FaArrowDown } from "react-icons/fa"
import Settings from "../AdminComponents/Settings";

const Analysis = (props) => {

    const [ startDate , SetStartDate ] = useState( DateToString(new Date()) )
    const [ endDate , SetEndDate ]     = useState( DateToString(new Date()) )
    const [ nameInput , SetNameInput] = useState('')
    const [ categoryInput , SetCategoryInput] = useState('')
    const [dropdownState , SetDropDownState] = useState(false) // flag

    const [ purchaseRenderState , SetPurchaseRenderState ] = useState(false)

    useEffect(()=>{
        if(props.saledRecord.length > 0){
            let lastIdx = props.saledRecord[props.saledRecord.length - 1].date
            SetStartDate(lastIdx)
        }
    } , [])

    let filterProducts = []
    let totalSold = 0 , soldPriceTotal = 0 , purchasePriceTotal = 0

    props.saledRecord.forEach(( product , idx )=>{
        product.products.forEach((ele , idx)=>{
            ele.purchaseDate = product.date
            if(StringToDate(ele.purchaseDate) <= StringToDate(endDate) && StringToDate(ele.purchaseDate) >= StringToDate(startDate))
                filterProducts = ( [ ...filterProducts , ele ] )
        })
    })

    filterProducts = filterProducts.filter(filterProduct =>  filterProduct.name.toLowerCase().includes(nameInput.toLowerCase()) && filterProduct.category.includes(categoryInput))

    //// Do Math Calculation

    // Total Sold Items into PKR
    filterProducts.forEach((ele , idx) =>{
        totalSold += parseInt(ele.qt)
    })

    filterProducts.forEach((ele , idx) =>{
        soldPriceTotal += parseInt(ele.price)
    })

    filterProducts.forEach((ele , idx) =>{
        purchasePriceTotal += parseInt(ele.purchasePrice)
    })

    return(
      <>
          <div className='AnalysisMainDiv d-flex flex-column'>
              <div className={'d-flex w-100  bg-light p-1 justify-content-end'}>
                  <button className={'btn btn-light mx-1 shadow-sm'} onClick={(e)=>{
                      e.preventDefault()
                      e.stopPropagation()
                      SetPurchaseRenderState(false)
                  }}> <FaWpforms/> </button>
                  <button className={'btn btn-light mx-1 shadow-sm'} onClick={(e)=>{
                      e.preventDefault()
                      e.stopPropagation()
                      SetPurchaseRenderState(true)
                  }}> <FaArrowDown/> </button>
              </div>

              {purchaseRenderState ? <>
                  <PurchaseProductsRenderer  categorys ={props.categorys} />
              </> : <> <div className={'d-flex container justify-content-center mt-2'}>
              <form>
                  <div className="row">
                      <div className="col">
                          <input type={'date'} className={'startDate form-control'} placeholder={'Enter Date'} onChange={(e)=>{
                              SetStartDate(e.target.value)
                          }} value={startDate}/>
                      </div>
                      <div className="col">
                          <input type={'date'} className={'mx-1 EndDate form-control'} placeholder={'Enter Date'} onChange={(e)=>{
                              SetEndDate(e.target.value)
                          }} value={endDate}/>
                      </div>
                  </div>
              </form>
          </div>

          {/*                text Input         */}

         <div className={'d-flex container justify-content-center'}>
          <form>
              <div className="row">
                  <div className="col">
                      <input type={'text'} className={'form-control fs-sm px-1 font-monospace'} placeholder={'Search by Name'}
                             onChange = {(e)=>{
                                 SetNameInput(e.target.value)
                             }} value={nameInput}
                      />
                  </div>
                  <div className="col">
                      <div className={`dropdown ${dropdownState ? 'active' : ''} font-monospace mt-3 border-0`}
                           onClick={(e)=>{
                               e.preventDefault()
                               SetDropDownState(!dropdownState)
                           }} >
                          <input className={`text-box`} type="text" placeholder="Select Category" readOnly/>
                          <div className="options">
                              {!(props.categorys) ? <div>No Category Added Yet </div> :<> </>}
                              {props.categorys && props.categorys.map((ele ,idx)=>{
                                  return(<div key ={idx} onClick={(e)=>{
                                      e.preventDefault()
                                      SetCategoryInput(ele.name)
                                  }}>
                                      {ele.name}
                                  </div>)
                              })}
                          </div>
                      </div>
                  </div>
              </div>
          </form>
         </div>
          <table>
          <thead>
          <tr>
            <th className={'bg-light text-dark font-monospace text-center'}>Total Bill</th>
            <th className={'bg-light text-dark font-monospace text-center'}>In Stock</th>
            <th className={'bg-light text-dark font-monospace text-center'}>QT</th>
            <th className={'bg-light text-dark font-monospace text-center'}>Price</th>
            <th className={'bg-light text-dark font-monospace text-center'}>Purchase Price</th>
              <th className={'bg-light text-dark font-monospace text-center'}>Date</th>
            <th className={'bg-light text-dark font-monospace text-center'}>Name</th>
          </tr>
          </thead>
          <tbody>
           {!filterProducts ? <h1>No Thing Found</h1> : <></>}
           {filterProducts && filterProducts.reverse().map((element , idx) => <TableElements key = {idx} array={element}/>)}
          </tbody>
          </table>

          <table>
              <thead>
              <tr>
                  <th className={'bg-light text-dark font-monospace text-center'}>QT sold</th>
                  <th className={'bg-light text-dark font-monospace text-center'}>Price Total</th>
                  <th className={'bg-light text-dark font-monospace text-center'}>Purchase Total</th>
                  <th className={'bg-light text-dark font-monospace text-center'}>Profit</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <th className={'text-center'}> {totalSold} </th>
                  <th className={'text-center'}> {soldPriceTotal} </th>
                  <th className={'text-center'}> {purchasePriceTotal} </th>
                  <th className={'bg-success text-center'}> { soldPriceTotal - purchasePriceTotal } </th>
              </tr>
              </tbody>
          </table>
          { filterProducts.length > 0 ?
              <div className={'text-center shadow-sm'}>
               <XLS array={filterProducts}/>
              </div> : <></>
          }
      </>} </div>
      </>
    )
}

// Table Element
const TableElements = ({array}) =>{
    return(
        <>
            <tr className={'bg-light'}>
            <th className={'bg-light text-dark font-monospace text-center'}>{(parseInt(array.price) * parseInt(array.qt))}</th>
            <th className={'bg-light text-dark font-monospace text-center'}>{array.inStock}</th>
            <th className={'bg-light text-dark font-monospace text-center'}>{array.qt}</th>
            <th className={'bg-light text-dark font-monospace text-center'}>{array.price}</th>
            <th className={'bg-light text-dark font-monospace text-center'}>{array.purchasePrice}</th>
                <th className={'bg-light text-dark font-monospace text-center'}>{STDDateFormat(StringToDate(array.purchaseDate))}</th>
                <th className={'bg-light text-dark font-monospace text-center'}><mark className={'bg-success'}>{array.name}</mark></th>
            </tr>
       </>
    )
}

export default Analysis

const PurchaseProductsRenderer  = (props) =>{

    const [purchaseProductsRec , SetPurchaseProductsRec ] = useState([])

    const [ startDate , SetStartDate ] = useState( DateToString(new Date()) )
    const [ endDate , SetEndDate ]     = useState( DateToString(new Date()) )

    const [dropdownState , SetDropDownState] = useState(false) // flag
    const [ categoryInput , SetCategoryInput] = useState('')
    const [ nameInput , SetNameInput] = useState('')
    const [ partyNameInput , SetPartyNameInput] = useState('')
    const [ partyContactNumber , SetPartyContactNumber] = useState('')


    // pragma once
    useEffect(()=>{
        let auxiliaryArray = LoadPurchaseProducts()
        if(auxiliaryArray == null)
            SetPurchaseProductsRec([])
        else SetPurchaseProductsRec(auxiliaryArray)
        if(purchaseProductsRec.length > 0){
            let lastIdx = purchaseProductsRec[purchaseProductsRec.length - 1].date
            SetStartDate(lastIdx)
        }
    } , [])

    let filterPurchaseProducts = []

    purchaseProductsRec.forEach((ele , idx)=>{
        if(StringToDate(ele.date) <= StringToDate(endDate) && StringToDate(ele.date) >= StringToDate(startDate))
            filterPurchaseProducts = ( [ ...filterPurchaseProducts , ele ] )
    })

    filterPurchaseProducts = filterPurchaseProducts.filter((ele , idx)=>{
        return (
            ele.name.toLowerCase().includes(nameInput.toLowerCase()) &&
            ele.partyName.toLowerCase().includes(partyNameInput.toLowerCase()) &&
            ele.contactNumber.toLowerCase().includes(partyContactNumber.toLowerCase()) &&
            ele.category.toLowerCase().includes(categoryInput.toLowerCase())
        )
    })

    let totalQt = 0
    let totalPurchasePrice = 0

    filterPurchaseProducts.forEach((ele)=>{
        totalQt += parseInt(ele.qt)
        totalPurchasePrice += (ele.total)
    })

    return (
        <>
            <div className={'d-flex container justify-content-center mt-2 flex-column'}>
                <div className={'text-center mb-1'}><h1>Purchase List</h1></div>

                {/* Date Input */}
                <div className={'d-flex container justify-content-center mt-2'}>
                    <form>
                        <div className="row">
                            <div className="col">
                                <input type={'date'} className={'startDate form-control'} placeholder={'Enter Date'} onChange={(e)=>{
                                    SetStartDate(e.target.value)
                                }} value={startDate}/>
                            </div>
                            <div className="col">
                                <input type={'date'} className={'mx-1 EndDate form-control'} placeholder={'Enter Date'} onChange={(e)=>{
                                    SetEndDate(e.target.value)
                                }} value={endDate}/>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Text Input */}

                <div className={'d-flex container justify-content-center'}>
                    <form>
                        <div className="row">
                            <div className="col">
                                <input type={'text'} className={'form-control fs-sm px-1 font-monospace'} placeholder={'Search by Name'}
                                       onChange = {(e)=>{
                                           SetNameInput(e.target.value)
                                       }} value={nameInput}
                                />
                            </div>
                            <div className="col">
                                <div className={`dropdown ${dropdownState ? 'active' : ''} font-monospace mt-3 border-0`}
                                     onClick={(e)=>{
                                         e.preventDefault()
                                         SetDropDownState(!dropdownState)
                                     }} >
                                    <input className={`text-box`} type="text" placeholder="Select Category" readOnly/>
                                    <div className="options">
                                        {!(props.categorys) ? <div>No Category Added Yet </div> :<> </>}
                                        {props.categorys && props.categorys.map((ele ,idx)=>{
                                            return(<div key ={idx} onClick={(e)=>{
                                                e.preventDefault()
                                                SetCategoryInput(ele.name)
                                            }}>
                                                {ele.name}
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className="col">
                                <input type={'text'} className={'form-control fs-sm px-1 font-monospace'} placeholder={'Search by PartyName'}
                                       onChange = {(e)=>{
                                           SetPartyNameInput(e.target.value)
                                       }} value={partyNameInput}
                                />
                            </div>
                            <div className="col">
                                <input type={'text'} className={'form-control fs-sm px-1 font-monospace'} placeholder={'Search by PartyNumber'}
                                       onChange = {(e)=>{
                                           SetPartyContactNumber(e.target.value)
                                       }} value={partyContactNumber}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Default Renderer */}
                <table>
                    <thead>
                    <tr>
                        <th className={'bg-light text-dark font-monospace text-center'} >Total-Bill</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >QT-Before</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >QT</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >Contact-Number</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >Party-Name</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >Purchase-Price</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >Date</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >Category</th>
                        <th className={'bg-light text-dark font-monospace text-center'} >Name</th>
                    </tr>
                    </thead>
                    <tbody>
                     {filterPurchaseProducts && filterPurchaseProducts.map((ele , idx)=> <PurchaseTableElements  key= { idx } array={ ele } />)}
                    </tbody>
                </table>

                <table>
                    <thead>
                     <tr className={'text-center'}>
                         <th className={'bg-light text-dark'}>Total</th>
                         <th className={'bg-light text-dark'}>Quantity</th>
                     </tr>
                    </thead>
                    <tbody>
                     <tr className={'text-center'}>
                         <th className={'bg-success'}>{totalPurchasePrice}</th>
                         <th className={'bg-success'}>{totalQt}</th>
                     </tr>
                    </tbody>
                </table>
                { filterPurchaseProducts.length > 0 ?
                    <div className={'text-center shadow-sm'}>
                        <PurchaseXLS array={filterPurchaseProducts}/>
                    </div> : <></>
                }
            </div>
        </>
    )
}

// Table Element
const PurchaseTableElements = ({array}) => {
    return(
        <>
            <tr className={'bg-light'}>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.total }</th>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.inStock}</th>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.qt}</th>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.contactNumber.trim().length < 11 ? '000000000000' : array.contactNumber }</th>
                <th className={'bg-light text-dark font-monospace text-center'} ><mark className={'bg-warning text-dark'}>{array.partyName}</mark></th>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.price}</th>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.date}</th>
                 <th className={'bg-light text-dark font-monospace text-center'} >{array.category}</th>
                 <th className={'bg-light text-dark font-monospace text-center'} ><mark className={'bg-success text-dark'}>{array.name}</mark></th>
            </tr>
        </>
    )
}

const XLS = (props) =>{
    const className = 'class-name-for-style btn btn-primary btn-sm mx-4',
        filename = STDDateFormat(new Date()) + '_SALE',
        fields = { // Key : Val
            "id": "IDX" ,
            "name": "NAME" ,
            "category": "category" ,
            "purchaseDate": "DATE" ,
            "inStock": "IN-STOCK" ,
            "price": "PRICE" ,
            "purchasePrice": "PURCHASE-PRICE" ,
            "qt": "QUANTITY" ,
            "total": "TOTAL BILL" ,
        },
        style = {
            padding: "5px" ,
            position : "fixed" ,
            top : "0" ,
            right : "0" ,
            marginTop: "6%" ,
        },
        data = [...props.array] ,
        text = <SiGooglesheets/>;
    return (
        <>
            <JsonToExcel
                data={data}
                className={className}
                filename={filename}
                fields={fields}
                style={style}
                text={text}
            />
        </>
    )
}

const PurchaseXLS = (props) =>{
    const className = 'class-name-for-style btn btn-primary btn-sm mx-4',
        filename = STDDateFormat(new Date()) + '_PURCHASE',
        fields = { // Key : Val
            'name': "NAME" ,
            'category' : 'CATEGORY' ,
            'date': "DATE" ,
            'partyName': "PARTY_NAME" ,
            'contactNumber' : "CONTACT_NUMBER" ,
            'inStock' : 'IN_STOCK' ,
            'price': "PURCHASE_PRICE" ,
            'qt': "QUANTITY" ,
            'total': 'TOTAL' ,
        },
        style = {
            padding: "5px" ,
            position : "fixed" ,
            top : "0" ,
            right : "0" ,
            marginTop: "6%" ,
        },
        data = [...props.array] ,
        text = <SiGooglesheets/>;
    return (
        <>
            <JsonToExcel
                data={data}
                className={className}
                filename={filename}
                fields={fields}
                style={style}
                text={text}
            />
        </>
    )
}


import React, { useState } from 'react'
import { SavePurchaseProducts , DateToString} from "../App"


import toast from 'react-hot-toast'
import { BsFillArrowUpSquareFill , BsFillArrowDownSquareFill  , BsFillCartPlusFill} from "react-icons/bs"
import { AiOutlineDelete ,  AiOutlineEdit , AiOutlineSearch , AiOutlineStock } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"

export default function EditProducts (props) {
    const [productsInput , SetProductInput] = useState('')

    const FilterProducts = props.products.filter((product)=>{
        return product.name.toLowerCase().includes(productsInput.toLowerCase())
    })
    
    return(
        <>
            <div className={'EditProductsDiv shadow-sm'}>
                 <input type="text" className="form-control p-lg-2 fs-5 font-monospace "
                    style={{'direction': 'rtl'}}
                    placeholder={'Search Products'}
                    onChange={(e)=>{
                        SetProductInput(e.target.value)
                    }}
                />
                <div className={'EditProductCardWrapper'}>
                    {FilterProducts.length === 0 ? <h1 className={'font-monospace text-muted'}><AiOutlineSearch/> NO THING FOUND </h1> : <></>}
                {
                    FilterProducts && FilterProducts.map((product ,idx)=>{
                        return (
                                <EditProductCard
                                    key = {idx}
                                    name ={product.name}
                                    imgUrl = {product.image}
                                    price = {product.salePrice}
                                    purchasePrice = {product.purchasePrice}
                                    category = {product.category}
                                    products = {props.products}
                                    SetProducts = {props.SetProducts}
                                    inStock= {product.inStock}
                                    DeleteSelf = {()=>{
                                        let auxiliaryArray = [...(props.products)]
                                        auxiliaryArray = auxiliaryArray.filter((ele)=>{
                                            if(ele.name != product.name)
                                                return ele
                                        })

                                        // Sets Keys again
                                        auxiliaryArray.forEach((ele,idx)=>{
                                            ele.key = idx
                                        })
                                        props.SetProducts(auxiliaryArray)
                                    }}
                                />
                        )
                    })
                }
                </div>
                <h3 className={'text-center text-muted font-monospace'}>PRODUCTS COUNT : {props.products.length}</h3>
            </div>
        </>
    )
}

const EditProductCard = ({name , imgUrl , price , purchasePrice , category , inStock ,products , SetProducts , DeleteSelf})=> {

    const EditPopUp = ()=>{
        toast((t) => (
            <div className={'d-flex justify-content-center flex-column'}>
                    <p className={'font-monospace'}>Enter New Price for <b className={'text-info'}>'{name}'</b></p>
                    <input type="number" className="form-control input-group-sm newPriceInput"
                     placeholder={'Enter New Price'} defaultValue={'0'}
                    />
            <div
                 className={'d-flex justify-content-center p-1'}
               ><button onClick={(e) => {
                   e.preventDefault()
                   let newPriceInputVal = document.querySelector('.newPriceInput').value.toString()
                   if(newPriceInputVal.trim().length === 0 || newPriceInputVal == '0'){
                       toast.error('Input Field Is Empty !!' , {
                           duration : 1000
                       })
                       return
                   }

                   let auxiliaryArray = [...products]
                   auxiliaryArray.forEach((product)=>{
                       if(product.name == name)
                           product.salePrice = parseInt(newPriceInputVal)
                   })

                   SetProducts(auxiliaryArray) // Sets Products List again
                   toast.dismiss(t.id)
               }} className={'d-flex btn btn-success btn-sm'}>
                   Add to Sale Price
               </button> </div>
                <div
                    className={'d-flex justify-content-center p-1'}
                >
                    <button className={'btn btn-sm  btn-info'} onClick={(e) => {
                        e.preventDefault()
                        let newPurchasePriceInputVal = document.querySelector('.newPriceInput').value.toString()
                        if(newPurchasePriceInputVal.trim().length === 0 || newPurchasePriceInputVal == '0'){
                            toast.error('Input Field Is Empty !!' , {
                                duration : 500
                            })
                            return
                        }

                        if(parseInt(newPurchasePriceInputVal) > parseInt(price)){
                            toast.error('WARNING !!\n Purchase Price is greater then Sale Price \n you may have to update new sale price',{
                                duration : 4000
                            })
                        }

                        let auxiliaryArray = [...products]
                        auxiliaryArray.forEach((product)=>{
                            if(product.name == name)
                                product.purchasePrice = parseInt(newPurchasePriceInputVal)
                        })

                        SetProducts(auxiliaryArray) // Sets Products List again
                        toast.dismiss(t.id)
                    }}>Add to Purchase Price</button>
                </div>
               <div
                 className={'d-flex justify-content-center p-1'}
               > <button onClick={() => toast.dismiss(t.id)} className={'btn btn-danger btn-sm'}>
                 Dismiss
               </button> </div>
            </div>
        ), {
            autoClose: false // prevent hot-toast to close automatically
        })
    }


    const DeletePopUp = ()=>{
        toast((t) => (
          <div className={'d-flex'}>
            <div className ={'font-monospace text-dark mt-2'}>
                Are You Sure to Delete ?
            </div>
            <br/>
            <button className={'btn btn-success btn-sm m-1'}
              onClick={(e)=>{
                  e.preventDefault()
                  DeleteSelf()
                  toast.dismiss(t.id)
              }}
            >Yes</button>
            <button className={'btn btn-danger btn-sm m-1'}
              onClick={()=>{
                  toast.dismiss(t.id)
              }}
            >No</button>
         </div>
         ), {
          autoClose: false // prevent hot-toast to close automatically
        })
    }

    const AddChartPopUp = (currentProductData)=>{
        toast((t)=>(
            <>
                <div>
                    <div className={'text-center'}>
                        <h3 className={'text-black-50 font-monospace'}>Purchase Form</h3>
                    </div>
                    <div>
                        <input type={'text'} className={'input form-control input-group-sm fs-sm font-monospace AddChartPopUpNameInputField mt-1'} placeholder={'Enter Party Name'}/>
                    </div>
                    <div>
                        <input type={'number'} className={'input form-control input-group-sm fs-sm font-monospace AddChartPopUpNumberInputField mt-1'} placeholder={'Enter Contact Number'} maxLength="11"/>
                    </div>
                    <div>
                        <input type={'number'} className={'input form-control input-group-sm fs-sm font-monospace AddChartPopUpQTInputField mt-1'} placeholder={'Enter Quantity'}
                            onChange={(e)=>{
                                e.preventDefault()
                                if(e.target.value.length === 0){
                                    document.querySelector('.PurchaseItemTotal').innerHTML = 'Total : ' + 0 + ' PKR'
                                    return
                                }
                                document.querySelector('.PurchaseItemTotal').innerHTML = 'Total : ' + (parseInt(e.target.value) * parseInt(purchasePrice)) + ' PKR'
                            }}
                        />
                    </div>
                    <div className={'text-center my-1'}>
                        <p className={'PurchaseItemTotal text-info font-monospace'}>Total : 0</p>
                    </div>
                    <div className={'text-center'}>
                        <button className={'btn btn-success btn-sm m-1'}
                                onClick = {(e)=>{
                                    e.preventDefault()
                                    let partyName = document.querySelector('.AddChartPopUpNameInputField').value
                                    let contactNumber = document.querySelector('.AddChartPopUpNumberInputField').value
                                    let qt = document.querySelector('.AddChartPopUpQTInputField').value

                                    let isValidInput = partyName.trim().length > 0 && qt.length > 0

                                    if(!isValidInput){
                                        toast.error('Input Field is Empty !' , {duration : 500})
                                        return
                                    }

                                    let auxiliaryArray = [...products]
                                    auxiliaryArray = auxiliaryArray.filter((ele)=>{
                                        if(ele.name == name)
                                            ele.inStock = parseInt(ele.inStock) + parseInt(qt)
                                        return ele
                                    })

                                    SetProducts(auxiliaryArray)

                                    // Add to Record $
                                    SavePurchaseProducts({
                                        name : currentProductData.name ,
                                        category : currentProductData.category,
                                        inStock : currentProductData.qt ,
                                        partyName : partyName ,
                                        contactNumber : contactNumber ,
                                        date : DateToString(new Date()) ,
                                        price : purchasePrice ,
                                        qt : qt ,
                                        total :( parseInt(qt) * parseInt(purchasePrice) )
                                    })

                                    toast.dismiss(t.id)
                                }}
                        >Buy</button>
                    </div>
                    <div className={'text-center'}>
                        <button className={'btn btn-danger btn-sm m-1'}
                          onClick = {(e)=>{
                             e.preventDefault()
                             toast.dismiss(t.id)
                          }}
                        >Dismiss</button>
                    </div>
                </div></>
        ),{autoClose : false})
    }

    // return
    return (
        <>
            <div className={'EditProductCard'}>
                <img src = {imgUrl} alt={'Image Not Found'}/>
                <div>
                    <li className={'font-monospace border-bottom border-light'}>{name}</li>
                    <li className={'font-monospace border-bottom border-light text-success'}>
                        <b className={'px-1 text-dark fs-sm'}><BiCategory/></b>
                        {category}
                    </li>
                    <li className={'font-monospace border-bottom border-light'}>{price + '-PKR'}
                      <i className={'text-success fs-sm px-1'}><BsFillArrowUpSquareFill/> </i>
                    </li>
                    <li className={'font-monospace border-bottom border-light'}>{purchasePrice + '-PKR'}
                        <i className={'text-info fs-sm px-1'}><BsFillArrowDownSquareFill/> </i>
                    </li>
                    <li className={'font-monospace border-bottom border-light'}>{inStock}
                        <b className={'text-dark fs-sm px-1'}><AiOutlineStock/></b>
                    </li>
                    <li>
                        <button className={'btn btn-primary btn-sm mx-1'}
                            onClick={ (e)=>{
                              e.preventDefault()
                              EditPopUp()
                        }}> <AiOutlineEdit/></button>
                        <button className={'btn btn-danger btn-sm'}
                             onClick={(e)=>{
                             e.preventDefault()
                             DeletePopUp()
                        }}><AiOutlineDelete/></button>
                        <button className={'btn btn-success btn-sm mx-1'}>
                            <BsFillCartPlusFill
                               onClick={(e)=>{
                                   e.preventDefault()
                                   AddChartPopUp({name : name , qt : inStock , category : category })
                               }}
                            />
                        </button>
                    </li>
                </div>
            </div>
        </>
    )
}
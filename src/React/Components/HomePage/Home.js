import React, {useRef, useState} from 'react'
import toast from "react-hot-toast"

import ProductCard from './ProductCard'
import Invoice  from './Invoice.js'

import { MdProductionQuantityLimits } from "react-icons/md"

export default function Home ({products , SetProducts , saledRecord , SetSaledRecords}) {

    const [chartProducts , SetChartProducts] = useState ([])
    const chatRef = useRef()


    return(
        <>
         <div className='MainHomeDiv'>

        {/*       Products Renderer        */}

           <div className='HomeWrapper'>
               {products.length === 0 ? <h1 className={'font-monospace text-muted'}>NO ITEM ADDED YET !<b className={'px-1 text-warning'}><MdProductionQuantityLimits/></b></h1> : <></>}
               {products && products.map(
                   (product , idx)=>
                   <ProductCard
                       productName = {product.name}
                       inStock={product.inStock}
                       price = {product.salePrice}
                       imgUrl = {product.image}
                       onAddChart = {()=>{
                           let duplicate = false

                           chartProducts.forEach((p)=>{
                               if(p.name == product.name)
                                   duplicate = true
                           })

                           const AddToChart = () => {
                               let auxiliaryArray = [...chartProducts]
                               const ele = {
                                  name : product.name ,
                                  price : parseInt(product.salePrice) ,
                                  purchasePrice : parseInt(product.purchasePrice) ,
                                  category : product.category ,
                                  id : auxiliaryArray.length ,
                                  qt : 0 ,
                                  total : 0,
                                  inStock : product.inStock ,
                               }
                               auxiliaryArray.push(ele)
                               SetChartProducts(auxiliaryArray)
                           }

                           if(!duplicate) {
                               AddToChart()
                               chatRef.current.scrollIntoView({behavior : 'smooth'})
                           }
                           else toast.error("Can't Add Duplicate !!")
                       }}
                       key = {idx}
                   />
               )}
           </div>

          {/*     Invoice         */}

          <Invoice
            products = {products}
            SetProducts = {SetProducts}
            chartProductArray = {chartProducts}
            SetChartProductsArray = { SetChartProducts }
            saledRecord = {saledRecord}
            SetSaledRecords = {SetSaledRecords}
            chatRef = {chatRef}
          />
    </div>
        </>
    )
}
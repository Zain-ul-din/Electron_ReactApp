
import React , {useState} from 'react'
import ProductForm from './ProductForm'
import EditProducts from "./EditProducts"

import { BiAddToQueue , BiEdit} from "react-icons/bi"

export default function Admin ({products , SetProducts , categorys , SetCategorys}) {
    const RemoveAllActiveClass = ()=>{
        let auxiliaryArray = document.querySelectorAll('.adminNavBarBtnActive')
        auxiliaryArray.forEach((ele)=>{
            ele.classList.remove('adminNavBarBtnActive')
        })
    }

    const [addState , SetState] = useState(true)

    return (
        <>
        <div className={'AdminMainNavBar'}>
            <div className={'d-flex justify-content-end px-3 py-1'}>
                <button className={'btn btn-light mx-2 adminNavBarBtnActive'}
                  onClick={(e)=>{
                      e.preventDefault()
                      SetState(true)
                      RemoveAllActiveClass()
                      e.target.classList.add('adminNavBarBtnActive')
                  }}
                ><BiAddToQueue className={'ReactBtnFix'}/></button>
                <button className={'btn btn-light mx-2'}
                  onClick={(e)=>{
                       e.preventDefault()
                       SetState(false)
                       RemoveAllActiveClass()
                       e.target.classList.add('adminNavBarBtnActive')
                  }}
                ><BiEdit className={'ReactBtnFix'}/></button>
            </div>

            { addState ?
               <ProductForm
                products={products}
                SetProducts={SetProducts}
                categorys={categorys}
                SetCategorys={SetCategorys}
              />
              :
              <EditProducts
                  products={products}
                  SetProducts={SetProducts}
                  categorys={categorys}
                  SetCategorys={SetCategorys}
              /> }

        </div>
        </>
    )
}

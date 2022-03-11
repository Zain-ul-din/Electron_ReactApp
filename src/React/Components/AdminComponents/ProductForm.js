
import React from "react"
import { useState } from "react"
import toast from "react-hot-toast"

import { AiFillDelete } from "react-icons/ai"

const acceptImg = 'image/apng,image/bmp,image/gif,image/jpeg,image/pjpeg,image/png,image/svg+xml,image/tiff,image/webp,image/x-icon'

const ProductForm = ({products , SetProducts , categorys , SetCategorys}) =>{

    const Product = {
        name: '',
        image: '',
        category: '',
        salePrice: '0',
        purchasePrice :'0',
        inStock: 0,
        key: 0,
    }

    const Category = {
        name: '',
        key: 0
    }

    const [selectedImage, setSelectedImage] = useState('')
    const [productName , SetProductName] = useState('')
    const [productPrice , SetProductPrice] = useState('0')
    const [productPurchasePrice , SetPurchasePrice] = useState('0')
    
    const [dropdownState , SetDropDownState] = useState(false) // flag
    const [CategoryState , SetCategoryState] = useState('Un-Selected')
   
    const [newCategoryInputState , SetNewCategoryInputState] = useState (false) // flag
    const [newCategoryState , SetNewCategoryState] = useState('')
    
    const ValidateFrom = () =>{
        let validInput = (selectedImage.trim() != '' && productName.trim() != '' &&
            productPrice != 0 && productPrice.length > 0 && CategoryState != 'Un-Selected' && productPurchasePrice != 0 &&
            productPurchasePrice.length > 0
        )

        if(!validInput){
            toast.error('Some Fields are missing !!')
            return
        }

        if( parseInt(productPurchasePrice) > parseInt(productPrice)  ){
            toast.error('purchase-Price is greater then Sale-Price \n Which can cause Lose 😥!!' , {duration : 9000})
        }

        let name = productName
        let imageName = selectedImage
        let categoryName = CategoryState
        let pPrice = productPrice  
        let purPrice = productPurchasePrice

        Product.name = name
        Product.image = imageName
        Product.category = categoryName
        Product.salePrice = pPrice
        Product.purchasePrice = purPrice

        let duplicate = false

        products.forEach((item)=>{
            if(item.name == Product.name)
                duplicate = true
        })
        
        let auxiliaryArray = [...products]

        if(duplicate)
            toast.error (`Can't Add Duplicate Entry !! \n Key : Product Name `)
        
        if(!duplicate){
          // Add to Array
          toast.success('Submitted !!')
          auxiliaryArray.push(Product)
          SetProducts(auxiliaryArray)

          // Set Key ForEach
          auxiliaryArray = auxiliaryArray.map((val , i)=>{
                val.key = i
                return val
          })

          SetProducts(auxiliaryArray)
          ReSetHooks()
        }
    }
    
    const ReSetHooks = ()=>{
        SetCategoryState('Un-Selected')
        SetProductPrice('0')
        SetProductName('')
        setSelectedImage('')
        SetPurchasePrice('0')
    }
    
    const ValidateCategoryInput = ()=>{
        let validInput = newCategoryState.trim() != ''

        if(!validInput){
            toast.error('Input Feild Is Empty !!') 
            return validInput
        }
        
        let categoryName = newCategoryState
        
        Category.name = categoryName

        let duplicate = false


        categorys.forEach((cate)=>{
            if(cate.name == Category.name)
                duplicate = true
        })
        
        let auxiliaryArray = [...categorys]

        if(duplicate){
            toast.error (`Can't Add Duplicate Entry !! \n Key : Category Name `)
        }

        if(!duplicate){
            auxiliaryArray.push(Category)
            SetCategorys(auxiliaryArray)
            SetNewCategoryState('')
            // Set Key ForEach
            auxiliaryArray = auxiliaryArray.map((val , i)=>{
                val.key = i
                return val
            })
            SetCategorys(auxiliaryArray)
            toast.success('New Category Has been Added !!' )
        }
        
        return  validInput
    }

    return(
        <> <div className={'MainAdminProductFormDiv'}>
        <div className="ProductFormDiv">
                <div className="ProductFormWrapperDiv">
                  <h3 className="font-monospace">Add New Product + </h3>
                </div>
                {/*            Name    */} 
                 <label htmlFor="email" className="font-monospace">Product Name : </label>
                 <input type="text"  placeholder="Enter product Name" name="email" 
                    onChange={(e)=>{
                       SetProductName (e.target.value)
                    }} value = {productName}
                 className="InputField font-monospace"/>
                
                <br/> 
                
                {/*          Image    */} 
                <label htmlFor="Image" className="font-monospace">Select image : </label>
                 <input type="file"
                 id="avatar" name="avatar" className="font-monospace Border-Smart"
                  accept={acceptImg}
                  onChange={(event) => {    
                    if(event.target.files.length == 0){
                        setSelectedImage('')
                        return
                    }  
                    setSelectedImage(event.target.files[0].path)
                  }}
                />
                
                <br/>

                  {/* Purchase Price */}
                  <label htmlFor="Number" className="font-monospace">Enter Purchase Price : </label>
                   <input type="number"  placeholder="Enter Price in PKR" name="email"
                          onChange={(e)=>{SetPurchasePrice(e.target.value)}} value = {productPurchasePrice}
                          className="InputField font-monospace"/>
                   <br/>

                 {/*            Price    */} 

                <label htmlFor="Number" className="font-monospace">Enter Sale Price : </label>
                <input type="number"  placeholder="Enter Price in PKR" name="email"
                  onChange={(e)=>{SetProductPrice(e.target.value)}} value = {productPrice}
                className="InputField font-monospace"/>
               <br/>

                {/*            Category    */}

                <label htmlFor="Number" className="font-monospace">{`Category : ` + CategoryState} </label>
                <br/>
                <div className={`dropdown ${dropdownState ? 'active' : ''} font-monospace`} 
                    onClick={(e)=>{
                     e.preventDefault()
                     SetDropDownState(!dropdownState) 
                }} >

                 <input className={`text-box`} type="text" placeholder="Select Category" readOnly/>
                 <div className="options">
                   {categorys && categorys.map((ele , idx)=>{
                        return (
                           <div className={'d-flex p-0 '} key={idx} onClick={(e)=> {
                               e.preventDefault()
                               SetCategoryState(ele.name)
                           }}>
                                <div> {ele.name} </div>
                                <button className={'btn btn-danger btn-sm ml-auto h-25 mt-2 categoryDeleteBtn'}
                                  onClick={(e)=>{
                                      e.stopPropagation()
                                      e.preventDefault()

                                      const DeleteSelf = ()=>{

                                          let auxiliaryArray = [...categorys]
                                          auxiliaryArray = auxiliaryArray.filter((cate)=>{
                                              if(cate.name != ele.name)
                                                  return cate
                                          })
                                          auxiliaryArray.forEach((cate , idx)=>{
                                              cate.key = idx
                                          })

                                          // Deletes all products have category

                                          let auxiliaryArray1 = [...products]
                                          auxiliaryArray1 = auxiliaryArray1.filter((product)=>{
                                              if(product.category != ele.name)
                                                  return product
                                          })
                                          auxiliaryArray1.forEach((product , idx)=>{
                                              product.key = idx
                                          })

                                          SetProducts(auxiliaryArray1)
                                          SetCategorys(auxiliaryArray)
                                      }

                                      toast((t)=>(
                                          <>
                                              <div className={'d-flex flex-column'}>
                                                  <p className={'font-monospace text-warning'}>All Products with category <b className={'text-info'}>'{ele.name}'</b> shall be deleted also !</p>
                                                  <div className={'p-2'}>
                                                   <button className={'btn btn-success btn-sm mx-1'}
                                                     onClick={(e)=>{
                                                         e.preventDefault()
                                                         DeleteSelf()
                                                         toast.dismiss(t.id)
                                                     }}
                                                   >Confirm</button>
                                                   <button className={'btn btn-danger btn-sm mx-1'}
                                                     onClick={()=>toast.dismiss(t.id)}
                                                   >Dismiss</button>
                                                  </div>
                                              </div>
                                          </>
                                      ),{
                                          autoClose: false ,// prevent hot-toast to close automatically
                                      })
                                  }}
                                ><AiFillDelete/></button>
                           </div>
                        )
                 })}
                   <div className="text-success maxZIdx" onClick={()=>SetNewCategoryInputState(true)}>+ Add New One</div>
                 </div>
                 </div>

                {newCategoryInputState && <>
                    <div className="NewCatWrapper">
                    <div className="input-group mb-3 ">
                      <input type="text" className="form-control newCatWrapper" placeholder="Enter New Category"
                        onChange={ (e)=>{SetNewCategoryState(e.target.value)}}
                      />
                      <button className="btn btn-outline-secondary btn-success btn-sm" type="button"
                          onClick={(e)=>{
                              e.preventDefault() 
                              ValidateCategoryInput() ? SetNewCategoryInputState(false) : SetNewCategoryInputState(true)
                          }}
                      >Add</button>
                      <button className="btn btn-outline-secondary btn-danger btn-sm" type="button"
                         onClick={(e)=>{
                             e.preventDefault()
                             SetNewCategoryInputState(false)
                        }}
                      >Close</button>
                    </div>
                    </div>
                </>}

            <br/> 
                {/*        Submit Btn       */}
                <button type = 'button' className="SubmitBtn" onClick={
                    (e)=>{
                        e.preventDefault()
                        ValidateFrom()
                    }
                } >
                    Submit
                </button>
            </div>

        </div>  </>
    )
}

export default ProductForm

// Duplicate Check
// Working EveryThing for Now...
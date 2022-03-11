// Main React Component of this App

import React , { useState , useEffect } from "react"

import Nav from "./Nav"
import MainScreen from "./MainScreen"

import { PRODUCTKEY , CATEGORYKEY , SALEDPRODUCTSKEY , PURCHASEPRODUCTSKEY} from '../../Public/Apis.js'


// App Component
const App = () => {
    
    // Main Arrays
    const [products , SetProducts] = useState([])
    const [categorys , SetCategorys] = useState([])
    const [saledRecords , SetSaledRecords] = useState([])

    const [renderState , SetRenderState] = useState(renderMenus.Home) // Render Menu State


    // Pragma once
    useEffect(()=>{
        let strRes = window.localStorage.getItem(SALEDPRODUCTSKEY)
        console.log(strRes)
        let auxiliaryArray = JSON.parse(strRes)
        if(auxiliaryArray == null){
            SetSaledRecords([])
            return
        }
        SetSaledRecords(auxiliaryArray)
    } , [])

    useEffect(()=>{
        let strRes = window.localStorage.getItem(CATEGORYKEY)
        console.log(strRes)
        let auxiliaryArray = JSON.parse(strRes)
        if(auxiliaryArray == null) {
            SetCategorys([])
            return
        }
        SetCategorys(auxiliaryArray)
    } , [])


    useEffect(() => {
        let strRes = window.localStorage.getItem(PRODUCTKEY)
        console.log(strRes)
        let auxiliaryArray = JSON.parse(strRes)
        if(auxiliaryArray == null) {
            console.log(strRes)
            SetProducts([])
            return
        }
        SetProducts(auxiliaryArray)
    }, []);



    // On Products Change
    useEffect(async ()=>{
        await (window.localStorage.setItem(PRODUCTKEY , JSON.stringify(products)))
    } , [products])
    
    // On Category Change
    useEffect(async ()=>  {
       await (window.localStorage.setItem(CATEGORYKEY , JSON.stringify(categorys)))
    } , [categorys])
    
    // On Saled Record Change
    useEffect( async ()=>{
        await (window.localStorage.setItem(SALEDPRODUCTSKEY , JSON.stringify(saledRecords)))
    } , [saledRecords])


    return(
            <>
                <div className="StyleMainDiv">
                   <Nav
                      SetRenderState = {SetRenderState}
                   />
                   <MainScreen
                      renderState={renderState}
                      categorys = {categorys}
                      SetCategorys = {SetCategorys}
                      products = {products}
                      SetProducts = {SetProducts}
                      saledRecord = {saledRecords}
                      SetSaledRecords = {SetSaledRecords}
                   />
                </div>
            </>
    )
}

export default App


export const renderMenus = {
    Home : 1 ,
    Admin : 2 ,
    Analysis : 3 ,
    Receipt : 4 ,
    Settings : 5 ,
}

// Purchase Products Loader

export const LoadPurchaseProducts = ()=>{
   let str = window.localStorage.getItem(PURCHASEPRODUCTSKEY)
   let auxiliaryArray = JSON.parse(str)
   return auxiliaryArray
}

export const SavePurchaseProducts = (newPurchaseProduct) =>{
   let auxiliaryArray = LoadPurchaseProducts()
    if(auxiliaryArray == null)
        auxiliaryArray = []
    auxiliaryArray.push(newPurchaseProduct)
    window.localStorage.setItem(PURCHASEPRODUCTSKEY , JSON.stringify(auxiliaryArray))
}

// Date Format Helper

export const STDDateFormat = (date)=>{

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    let dd = String(date.getDate()).padStart(2, '0')
    let mm = monthNames[date.getMonth()]
    let yyyy = date.getFullYear()
    return (mm + ' ' + dd + ' , ' + yyyy).toString()
}

// Year, Month, Date
export const DateToString = (date)=> {
    let dd = String(date.getDate()).padStart(2, '0')
    let mm = String( ( parseInt(date.getMonth()) + 1 )).padStart(2,'0')
    let yyyy = date.getFullYear()
    return (yyyy + '-' + mm + '-' + dd)
}

export const StringToDate = (str)=>{

    let list = str.split('-' , str.length)
    return new Date(list[0] , list[1] , list[2]).toString() === 'Invalid Date' ?
              null :
              new Date(list[0] , list[1] , list[2])
}

// Props are pass by ref


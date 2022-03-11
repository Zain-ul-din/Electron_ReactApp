
import React  from 'react'

import { renderMenus } from './App'

import Admin from './AdminComponents/Admin'
import Home from './HomePage/Home'
import Analysis from './Analysis/Analysis'
import ReceiptRenderer from "./Receipt/ReceiptRenderer"
import Settings from "./AdminComponents/Settings"

const MainScreen = (props) =>{
  const renderElements = { elements : undefined }
  GetRenderElement(props , renderElements)
  return (<>{renderElements.elements}</>)
}

export default MainScreen

// Renderer Helper
function GetRenderElement (props , renderEle){



  switch(props.renderState){
    case renderMenus.Home:
      renderEle.elements =
    <Home
          products = {props.products}
          SetProducts = {props.SetProducts}
          SetSaledRecords = {props.SetSaledRecords}
          saledRecord = {props.saledRecord}
    />

    break

    case renderMenus.Admin:
      renderEle.elements =
      <Admin
        categorys = {props.categorys}
        SetCategorys = {props.SetCategorys}
        products = {props.products}
        SetProducts = {props.SetProducts}
      />

    break

     case renderMenus.Analysis:
      renderEle.elements = <>
         <Analysis
             saledRecord = {props.saledRecord}
             SetSaledRecords = {props.SetSaledRecords}
             categorys = {props.categorys}
         />
      </>
     break
     case renderMenus.Receipt:
        renderEle.elements = <>
            <ReceiptRenderer
                saledRecord = {props.saledRecord}
            />
        </>
     break

     case renderMenus.Settings:
          renderEle.elements = <>
            <Settings/>
          </>
     break
    default:
      renderEle.elements = <>404 PAGE NOT FOUND</>
  }
}

import React from "react"
import {renderMenus} from './App'

import  { BiHome , BiAtom , BiSearchAlt2 , BiReceipt} from 'react-icons/bi'

import { AiOutlineSetting } from "react-icons/ai"

const Nav = ({SetRenderState}) => {

    const RemoveAllActiveClass = ()=>{
      let auxiliaryArray =  document.querySelectorAll('.activeNavBtn')
        auxiliaryArray.forEach((ele)=>{
            ele.classList.remove('activeNavBtn')
        })
    }

    return(

          <div className = {'NavDiv INotPrintAble'}>
                <div className="NavBarBtnContainer">
                      <div className="staticNavHeader">
                            <h6 className={'mono-text text-dark companyName INotPrintAble'}>CHAUDHARY TRADERS</h6>
                      </div>

                      <button className="btn-Custom NavBtn font-monospace activeNavBtn"
                        onClick={(event)=> {
                            event.preventDefault()
                            RemoveAllActiveClass()
                            event.target.classList.add('activeNavBtn')
                            SetRenderState(renderMenus.Home)
                        }}
                      ><span className={'mb-1 p-2 ReactBtnFix'}>
                          <BiHome className={'ReactBtnFix'}/>
                      </span>HOME</button>

                      <button className="btn-Custom NavBtn font-monospace"
                       onClick={(event)=> {
                           event.preventDefault()
                           RemoveAllActiveClass()
                           event.target.classList.add('activeNavBtn')
                           SetRenderState(renderMenus.Admin)
                       }}
                      ><span className={'mb-1 p-2 ReactBtnFix'}>
                          <BiAtom className={'ReactBtnFix'}/>
                      </span>ADMIN</button>

                      <button className="btn-Custom NavBtn font-monospace"
                         onClick={(event)=> {
                             event.preventDefault()
                             RemoveAllActiveClass()
                             event.target.classList.add('activeNavBtn')
                             SetRenderState(renderMenus.Analysis)
                         }}
                      ><span className={'mb-1 p-2 ReactBtnFix'}>
                          <BiSearchAlt2 className={'ReactBtnFix'}/>
                      </span>ANALYSIS</button>

                    <button className="btn-Custom NavBtn font-monospace"
                            onClick={(event)=> {
                                event.preventDefault()
                                RemoveAllActiveClass()
                                event.target.classList.add('activeNavBtn')
                                SetRenderState(renderMenus.Receipt)
                            }}
                    ><span className={'mb-1 p-2 ReactBtnFix'}>
                          <BiReceipt className={'ReactBtnFix'}/>
                    </span>RECEIPTS</button>

                    <button className="btn-Custom NavBtn font-monospace"
                            onClick={(event)=> {
                                event.preventDefault()
                                RemoveAllActiveClass()
                                event.target.classList.add('activeNavBtn')
                                SetRenderState(renderMenus.Settings)
                            }}
                    ><span className={'mb-1 p-2 ReactBtnFix'}>
                          <AiOutlineSetting className={'ReactBtnFix'}/>
                    </span>Settings</button>
                    {/* Copy Right text*/}
                      <b className={'mt-auto d-flex p-1  m-2 mt-1 flex-wrap text-muted font-monospace text-wrap CopyRightText text-break'}>&copy; Copyright 2022 CHAUDHARY TRADERS
                          all rights reserved
                      </b>
                </div>
          </div>
    )
}

export default Nav
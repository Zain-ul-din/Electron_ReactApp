
import React from 'react'
import { AiOutlineClear } from "react-icons/ai"
import toast from 'react-hot-toast'

import  { PURCHASEPRODUCTSKEY , SALEDPRODUCTSKEY } from "../../../Public/Apis"

export default function Settings () {
    return (
        <>
            <div className='AnalysisMainDiv d-flex flex-column'>
              <div className={'d-flex container justify-content-center mt-2 flex-column' }>
                <div className={'text-center'}><h1>Settings</h1></div>
                <div className={'text-center p-2 m-3'}>
                    <label className={'mt-2'}><b className={'font-monospace'} >Clear All Sale Record  </b></label>
                    <button className={'btn btn-danger btn-sm mb-2 mx-2'} onClick={(e)=>{
                        e.preventDefault()
                        toast((t)=>(
                            <>
                                <div>
                                    <p className={'font-monospace'}>Are You Sure to Clear <mark className={'text text-danger'}>Sale Record</mark> ? </p>
                                    <br/>
                                    <div className={'text-center'}>
                                        <button className={'btn btn-success m-1 mx-2'} onClick={(e)=>{
                                            e.preventDefault()
                                            window.localStorage.removeItem(SALEDPRODUCTSKEY)
                                            window.location.reload()
                                            toast.dismiss(t.id)
                                        }}>
                                            Yes
                                        </button>
                                        <button className={'btn btn-danger m-1'} onClick={(e)=>{
                                            e.preventDefault()
                                            toast.dismiss(t.id)
                                        }}>
                                            No
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))
                    }}><AiOutlineClear/></button>
                </div>
                  <div className={'text-center p-2 m-1'}>
                      <label className={'mt-2'}><b className={'font-monospace'}>Clear All Purchase Record  </b></label>
                      <button className={'btn btn-danger btn-sm mb-2 mx-2'} onClick={(e)=>{
                          e.preventDefault()
                          toast((t)=>(
                              <>
                                  <div>
                                      <p className={'font-monospace'}>Are You Sure to Clear <mark className={'text text-danger'}>Purchase Record</mark> ? </p>
                                      <br/>
                                      <div className={'text-center'}>
                                          <button className={'btn btn-success m-1 mx-2'} onClick={(e)=>{
                                              e.preventDefault()
                                              window.localStorage.removeItem(PURCHASEPRODUCTSKEY)
                                              window.location.reload()
                                              toast.dismiss(t.id)
                                          }}>
                                               Yes
                                          </button>
                                          <button className={'btn btn-danger m-1'} onClick={(e)=>{
                                              e.preventDefault()
                                              toast.dismiss(t.id)
                                          }}>
                                               No
                                          </button>
                                      </div>
                                  </div>
                              </>
                          ))
                      }}><AiOutlineClear/></button>
                  </div>
              </div>
           </div>
        </>
    )
}
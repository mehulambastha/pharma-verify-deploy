'use client'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const Navbar = () => {
  const [isClient, setIsClient] = useState(true)
  const pathName = usePathname()

  const router = useRouter()
  const [currentViewingMode, setcurrentViewingMode] = useState(null)

  useEffect(()=>{
    
    if (typeof window !== 'undefined') {
      setIsClient(
        localStorage.getItem('user') == 0  ? false : true
      )
      !localStorage.getItem('viewingMode') && localStorage.setItem('viewingMode', 'all')
      setcurrentViewingMode(localStorage.getItem('viewingMode'))
    }
  }, [])

  if (typeof window !== 'undefined' && currentViewingMode) {
    return(
      <div className="navbar bg-neutral text-black">
        <div className="navbar-start">

          {/* //DROPDOWN FOR SMALL SCREENS */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={()=>{
                localStorage.setItem('viewingMode', 'all')
                setcurrentViewingMode('all')
              }}
                style={{border: localStorage.getItem('viewingMode') == 'all' && '2px dashed #EF9995'}}
              >
                <a>{isClient ? 'All Products' : 'Approved by me'}</a>
              </li>
              {!isClient && <li><a>Pending Approval</a></li>}
              {isClient && 
                <>
                  <li>
                    <a>My Products</a>
                    <ul className="p-2">
                      <li onClick={()=>{
                        localStorage.setItem('viewingMode', 'approved')
                        setcurrentViewingMode('approved')
                      }}
                        style={{border: localStorage.getItem('viewingMode') == 'approved' && '2px dashed #EF9995'}}
                      ><a>Approved</a></li>
                      <li onClick={()=>{
                        localStorage.setItem('viewingMode', 'pending')
                        setcurrentViewingMode('pending')
                      }}
                        style={{border: localStorage.getItem('viewingMode') == 'pending' && '2px dashed #EF9995'}}
                      ><a>Pending</a></li>
                    </ul>
                  </li>
                </>
              }
            </ul>
          </div>
          <a className="btn btn-ghost text-white text-xl">GSC PROJECT</a>
        </div>

        {/* WIDE NAVBAR FOR LARGE SCREENS */}
        <div className="navbar-center text-white hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            { (pathName == "/" || pathName == "/welcome" || pathName.startsWith("/admin/drugs-details")) ?  <li>PHARMAVERIFY</li> : (
                        <>
                          <li style={{border: localStorage.getItem('viewingMode') == 'all' && '2px dashed #ECE3CA'}}>
                            <a onClick={()=>{
                              localStorage.setItem('viewingMode', 'all')
                              setcurrentViewingMode('all')
                            }}>All Products</a>
                          </li>
                          {/* {!isClient && <li><a>Pending Approval</a></li>} */}
                          { 
                              <>
                                <li onClick={()=>{
                                  localStorage.setItem('viewingMode', 'approved')
                                  setcurrentViewingMode('approved')
                                }}
                                  style={{border: localStorage.getItem('viewingMode') == 'approved' && '2px dashed #ECE3CA'}}
                                >
                                  <a>Approved</a>
                                </li>
                                <li onClick={()=>{
                                  localStorage.setItem('viewingMode', 'pending')
                                  setcurrentViewingMode('pending')
                                }}
                                  style={{border: localStorage.getItem('viewingMode') == 'pending' && '2px dashed #ECE3CA'}}
                                >
                                  <a>Pending Approval</a>
                                </li>
                              </>
                            }
                          </>
            )}
          </ul>
        </div>
        {
          pathName == '/user' &&
          <div className="navbar-end">
            {isClient && <a className="btn mr-4" onClick={()=>router.push("/add")}>Add</a>}
          </div>
        }
      </div>
    )
  }
}

export default Navbar

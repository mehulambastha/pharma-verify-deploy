'use client'
import React, {useState, useEffect} from 'react'


const Page = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentViewingMode, setcurrentViewingMode] = useState('')

  useEffect(()=>{
    const fetchData = async () => {
      await fetch('https://api.jsonbin.io/v3/b/65da02a4dc74654018a93ee0/', {
        method: 'GET',
        headers: {
        'X-Master-Key': '$2b$10$VHv7T88koCuzgH.O0w1KMO5yWSPaWGtqFgj68Q5/65Cqw9n6pU4RC'
        }
      })
        .then(res => res.json())
        .then((data)=>{
          setAllProducts(data.record)
          setIsLoaded(true)
        })
    }  
    fetchData()
  }, [])

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const intervalId = setInterval(() => {
        setcurrentViewingMode(localStorage.getItem('viewingMode'))
      }, 500)
  
      return ()=>clearInterval(intervalId)
    }
  }, [])

  const truncateTxt = (str) => {
    return str.length > 60 ? [(str.substring(0, 60) + '...'), true] : [str, false]
  }

  let cardElements = []
  let pendingElements = []
  let approvedElements = []
  for(const product of allProducts) {
    if (product["Verified"] == "true"){
      approvedElements.push(
        <div className="card w-72 max-h-[30em] bg-base-100 shadow-xl">
          <figure className="max-h-[8em]"><img src={product["Image URL"]} alt={product["Medicine Name"]} /></figure>
          <div className="card-body max-h-72">
            <h2 className="card-title flex flex-col items-start">
              <div>{product["Medicine Name"]}</div>
              <div className="p-1 w-full bg-[#A4CBB4] text-center text-xs font-medium rounded-full">{product["Manufacturer"]}</div>
            </h2>
            {
              (()=>{
                const truncated = truncateTxt(product["Uses"])
                return(truncated[1] == true ? 
                  <p className="tooltip text-left" data-tip={product["Uses"]}>
                    <span className=" font-bold">Uses: </span> 
                    {truncateTxt(product["Uses"])}
                  </p>
                  :
                  <p>
                    <span className="font-bold text-left">Uses: </span> 
                    {product["Uses"]}
                  </p>
                  )
              })()
            }
            <div className="card-actions justify-start">
            <div className="tooltip" data-tip={product["Composition"]}>
              <button className="badge badge-outline text-sm">Show Composition</button>
            </div>
              <div className={`badge text-white ${product["Verified"] == 'true' ? 'badge-success' : 'badge-warning'}`} >{product["Verified"] == 'true' ? 'Approved' : 'Pending'}</div>
            </div>
          </div>
        </div>
      )
    } else {
      pendingElements.push(
        <div className="card w-72 max-h-[30em] bg-base-100 shadow-xl">
          <figure className="max-h-[8em]"><img src={product["Image URL"]} alt={product["Medicine Name"]} /></figure>
          <div className="card-body max-h-72">
            <h2 className="card-title flex flex-col items-start">
              <div>{product["Medicine Name"]}</div>
              <div className="p-1 w-full bg-[#A4CBB4] text-center text-xs font-medium rounded-full">{product["Manufacturer"]}</div>
            </h2>
            {
              (()=>{
                const truncated = truncateTxt(product["Uses"])
                return(truncated[1] == true ? 
                  <p className="tooltip text-left" data-tip={product["Uses"]}>
                    <span className=" font-bold">Uses: </span> 
                    {truncateTxt(product["Uses"])}
                  </p>
                  :
                  <p>
                    <span className="font-bold text-left">Uses: </span> 
                    {product["Uses"]}
                  </p>
                  )
              })()
            }
            <div className="card-actions justify-start">
            <div className="tooltip" data-tip={product["Composition"]}>
              <button className="badge badge-outline text-sm">Show Composition</button>
            </div>
              <div className={`badge text-white ${product["Verified"] == 'true' ? 'badge-success' : 'badge-warning'}`} >{product["Verified"] == 'true' ? 'Approved' : 'Pending'}</div>
            </div>
          </div>
        </div>
      )
    }

    cardElements.push(
      <div className="card w-72 max-h-[30em] bg-base-100 shadow-xl">
        <figure className="max-h-[8em]"><img src={product["Image URL"]} alt={product["Medicine Name"]} /></figure>
        <div className="card-body max-h-72">
          <h2 className="card-title flex flex-col items-start">
            <div>{product["Medicine Name"]}</div>
            <div className="p-1 w-full bg-[#A4CBB4] text-center text-xs font-medium rounded-full">{product["Manufacturer"]}</div>
          </h2>
          {
            (()=>{
              const truncated = truncateTxt(product["Uses"])
              return(truncated[1] == true ? 
                <p className="tooltip text-left" data-tip={product["Uses"]}>
                  <span className=" font-bold">Uses: </span> 
                  {truncateTxt(product["Uses"])}
                </p>
                :
                <p>
                  <span className="font-bold text-left">Uses: </span> 
                  {product["Uses"]}
                </p>
                )
            })()
          }
          <div className="card-actions justify-start">
          <div className="tooltip" data-tip={product["Composition"]}>
            <button className="badge badge-outline text-sm">Show Composition</button>
          </div>
            <div className={`badge text-white ${product["Verified"] == 'true' ? 'badge-success' : 'badge-warning'}`} >{product["Verified"] == 'true' ? 'Approved' : 'Pending'}</div>
          </div>
        </div>
      </div>
    )
  } 

  const skeletons = []
  for(let i = 0; i <8;  i++){
    skeletons.push(
      <div key={i} className="skeleton w-64 h-96"></div>
    )
  }
  
  return (
    <>
      <h1 className='text-2xl font-mono py-4 font-bold bg-[#C6BC9C] text-black text-center'>
        {
          (()=>{
            switch (currentViewingMode){
              case 'all':
                return 'All your products'
                break
              case 'pending':
                return 'Pending Approval'
                break
              case 'approved':
                return 'Approved Drugs'
                break
            } 
          })()
        }
      </h1>
      <div className='h-auto flex flex-wrap gap-5 w-full p-10 text-black justify-evenly bg-[#C6BC9C]'>
        {(()=>{
          if (isLoaded) {
            switch (currentViewingMode) {
              case 'all':
                return (cardElements)
                break;
              case 'pending':
                return (pendingElements)
                break
              case 'approved':
                return (approvedElements)
                break
            }
          } else{
            return(skeletons)
          }
        })()}
      </div>
    </>
  )
}

export default Page

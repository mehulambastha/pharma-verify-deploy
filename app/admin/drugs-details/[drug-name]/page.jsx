'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const params = useParams()
  const reqParam = params['drug-name']


  const [currentDrug, setCurrentDrug] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

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
          for (const drug of data.record) {            
            const name = drug["Medicine Name"].split(" ")[0].toLowerCase()
            if (name == reqParam.toLowerCase()) {
              setCurrentDrug(drug)
              setIsLoaded(true)
              break
            }
          }
        })
    }  
    fetchData()
  }, [])



  return (  
    <div className='bg-[#C6BC9C] text-black min-h-screen w-screen gap-4 flex-wrap'>

      {isLoaded ? (
            <div className="flex flex-col md:flex-row flex-wrap gap-4 p-12">
              <figure className="col-span-2 bg-amber-100">
                <img src={currentDrug["Image URL"]}/>
              </figure>  
              <div className='max-w-[60em] p-4'>
                {
                  currentDrug["Verified"] == "true" ? (
                    <div className="badge badge-success p-5 text-xl mb-5 font-mono font-bold">Approved</div>
                  ) : (
                    <div className="badge badge-warning p-5 text-xl mb-5 font-mono font-bold">
                      Pending Approval  
                    </div>
                  )
                }
                
                <br /> 
                <span className="font-bold">Drug Name: </span> {currentDrug["Medicine Name"]} <br />
                <span className="font-bold">Manufacturer: </span> {currentDrug["Manufacturer"]} <br />
                <span className="font-bold">Uses: </span> {currentDrug["Uses"]} <br />
                <span className="font-bold">Side Effects: </span> {currentDrug["Side_effects"]} <br />
                <span className="font-bold">Composition: </span> {currentDrug["Composition"]} <br />
                <span className="font-bold">Excellent Review %: </span> {currentDrug["Excellent Review %"]} <br />
                <span className="font-bold">Average Review %: </span> {currentDrug["Average Review %"]} <br />
                <span className="font-bold">Poor Review %: </span> {currentDrug["Poor Review %"]}
              </div>
            </div>   
            )
            :
            (
              <div className='p-12 flex flex-row gap-5'>
                <div className="m-15 skeleton w-48 h-64"></div>                
                <div className="m-15 skeleton w-[50em] h-64"></div>                
              </div>
        )}
    </div>
  )
}

export default Page

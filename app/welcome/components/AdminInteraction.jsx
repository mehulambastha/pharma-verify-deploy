'use client'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'


const AdminInteraction = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoaded, setisLoaded] = useState(false)

  useEffect(()=>{
    setisLoaded(true)
  }, [])
  
  const handleClick = async () => {
    await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        username: 'kminchelle',
        password: '0lelplR'
      })
    })
    .then(res => res.json())
    .then(data=> {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', 0)
      router.push('../admin/')
    }
    )          
  }

  return (
    <div>
          <button className='btn btn-primary' onClick={()=>{             
            if (localStorage.getItem('token') === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwODgwMTQ3MCwiZXhwIjoxNzA4ODA1MDcwfQ.pHSwAHGh2Ylz1oqF7llRe3CujRaTsCxTS7Y0Vl59x0I') {
              router.push('../admin/')
            } else {
              document.getElementById('admin-login').showModal()
            }       
          }}>
            Continue as Admin
          </button>
          <dialog id="admin-login" className="modal p-10">
            <div className="modal-box flex flex-col gap-5">
              <div className='flex flex-col gap-4'>
                <h1 className='text-xl pl-5 text-black'>Login as Admin</h1>
                <label className="form-control w-full justify-center m-auto max-w-xs">
                  <div className="label">
                    <span className="label-text">Admin username?</span>
                  </div>
                  <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="input input-bordered w-full max-w-xs" />
                  <div className="label">
                    <span className="label-text">Admin password?</span>
                  </div>
                  <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>
                <button className='btn btn-secondary w-4/6 m-auto my-5' onClick={handleClick}>
                  Login
                </button>                
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>     
    </div>
  )
}

export default AdminInteraction

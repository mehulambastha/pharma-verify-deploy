'use client'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'

const ClientInteraction = () => {
  const [UserRegistration, setUserRegistration] = useState(false)

  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoaded, setisLoaded] = useState(false)

  useEffect(()=>{
    setisLoaded(true)
  }, [])
  
  const handleClick = async () => {
    if (UserRegistration) {
      fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          router.push('../user')
          localStorage.setItem('user', 1)
        })              
      } else {
        fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            
            username: 'atuny0',
            password: '9uQFF1Lh',
            // expiresInMins: 60, // optional
          })
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('token', data.token)
          router.push('../user')
          localStorage.setItem('user', 1)
        });
    }       
  }


  return (
    <div>
          <button className='btn btn-primary' onClick={()=>{             
            if (localStorage.getItem('token') === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhdHVueTAiLCJlbWFpbCI6ImF0dW55MEBzb2h1LmNvbSIsImZpcnN0TmFtZSI6IlRlcnJ5IiwibGFzdE5hbWUiOiJNZWRodXJzdCIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vcm9ib2hhc2gub3JnL1RlcnJ5LnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwODgwMjQ0NSwiZXhwIjoxNzA4ODA2MDQ1fQ.PNetAzgleaf8qXX8_-yZBRhe8QDLQWUArjII_IMrHQ0') {
              router.push('../user')
            } else {
              document.getElementById('client-login').showModal()
            }       
          }}>
            Continue as Client
          </button>
          <dialog id="client-login" className="modal">
          <div className="modal-box flex flex-col gap-5">
              <div className='flex flex-col gap-4'>
                <div className='pl-5 flex flex-col gap-2'>
                  <h1 className='text-xl text-black'>{!UserRegistration ? 'Login as Client' : 'Register'}</h1>
                  {
                    UserRegistration ? (
                      <span className='cursor-pointer link-hover link-accent w-fit' onClick={()=>setUserRegistration(false)}>Go back to login</span>
                    ) : (
                      <span className='cursor-pointer link-hover link-accent w-fit' onClick={()=>setUserRegistration(true)}>Not registered yet? Click here</span>
                    )
                  }
                </div>
                <label className="form-control w-full justify-center m-auto max-w-xs">
                  <div className="label">
                    <span className="label-text">Client username?</span>
                  </div>
                  <input type="text" onChange={e=>setUsername(e.target.value)} placeholder="Username" className="input input-bordered w-full max-w-xs" />
                  {UserRegistration && 
                    <>
                      <div className="label">
                        <span className="label-text">Client email?</span>
                      </div>
                      <input type="text" onChange={e=>setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full max-w-xs" />                    
                    </>
                  }
                  <div className="label">
                    <span className="label-text">Client password?</span>
                  </div>
                  <input type="text" onChange={e=>setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full max-w-xs" />
                </label>
                <button className='btn btn-secondary w-4/6 m-auto my-5' onClick={handleClick}>
                  {UserRegistration ? 'Register' : 'Login'}
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

export default ClientInteraction

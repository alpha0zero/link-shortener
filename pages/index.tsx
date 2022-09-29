import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

type Status = 'loading' | 'unloaded' | 'loaded'

interface Link {
  url: string
  slug: string
}


const Home: NextPage = () => {

  const hundleSubmit = async (e: FormEvent<EventTarget>) => {

    e.preventDefault()

    const { data } = await axios.post('/api/link',
      link
    )
    
    console.table(data)
    if(data) setStatus('loaded')
  }

  const [status, setStatus] = useState<Status>('unloaded')
  const [link, setLink] = useState<Link>({
    url: '',
    slug: ''
  })

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      
      <form onSubmit={hundleSubmit} className='w-75 px-3 py-5 border rounded-4'>
        <h2 className='text-center'> CREATE SHORT LINK </h2>
        <div>
          <label htmlFor='url'>
            URL:
          </label>
          <input onChange={(e) => setLink({...link, url: e.target.value})} className='form-control' type='text' id='url' name='url' required/>
        </div>

        <div>
          <label htmlFor="slug">
            SLUG:
          </label>
          <input onChange={(e) => setLink({...link, slug: e.target.value})} className='form-control' type='text' id='slug' name='slug' required/>
        </div>

        <div className='mt-2 text-center'>
          <button onClick={() => setStatus('loading')} className='btn btn-primary w-100' type='submit'>
            <span className={`spinner-border spinner-border-sm mx-2 ${status === 'loading' ? 'd-inline-block' : 'd-none'}`}></span>
            CREATE SHORT LINK 
          </button>
        </div>

      </form>
    </div>
  )
}

export default Home

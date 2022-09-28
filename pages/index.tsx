import type { NextPage } from 'next'
import { useState } from 'react'

type Status = 'loading' | 'unloaded' | 'loaded'

const Home: NextPage = () => {

  const [status, setStatus] = useState<Status>('unloaded')

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      
      <form className='w-l-50 p-3 border rounded-4'>
        <h2 className='text-center'> CREATE SHORT LINK </h2>
        <div>
          <label htmlFor='url'>
            URL:
          </label>
          <input className='form-control' type='text' id='url' name='url'/>
        </div>

        <div>
          <label htmlFor="slug">
            SLUG:
          </label>
          <input className='form-control' type='text' id='slug' name='slug'/>
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

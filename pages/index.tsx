import type { GetServerSideProps } from 'next'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

type Status = 'loading' | 'unloaded' | 'loaded'

type Props = { host: string | null }

interface Link {
  url: string
  slug: string
}


const Home = (props: Props) => {

  async function hundleSubmit (e: FormEvent<EventTarget>) {

    e.preventDefault()

    if(link.slug.includes(' ') || !link.url.startsWith('https://') || !link.url || !link.slug) {
      setSlugValidationErr(true)
      return
    }

    setSlugValidationErr(false)
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
  const [slugValidationErr, setSlugValidationErr] = useState<boolean>(false)

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center position-relative'>

      <div className={`${status === 'loaded' ? 'd-block' : 'd-none' } position-absolute top-0 start-25 p-3`}>
        HERE IS THE LINK, DO NOT FORGET TO COPY IT <br/>
        <span className='link-primary'>
          {`${props.host}/${link.slug}`}
        </span>
      </div>

      <form onSubmit={hundleSubmit} className='w-75 px-3 py-5 border border-primary rounded-4'>
        <h2 className='text-center'> CREATE SHORT LINK </h2>
        <div>
          <label htmlFor='url'>
            URL:
          </label>
          <input onChange={(e) => setLink({...link, url: e.target.value})} className='form-control' type='text' id='url' name='url'/>
        </div>

        <div>
          <label htmlFor="slug">
            SLUG:
          </label>
          <input onChange={(e) => setLink({...link, slug: e.target.value})} className='form-control' type='text' id='slug' name='slug'/>
        </div>

        <div className='d-block bg-danger text-light rounded px-2 my-3'> { slugValidationErr && 'Something is wrong w/ your input' } </div>

        <div className='mt-2 text-center'>
          <button onClick={() => setStatus('loading')} className='btn btn-primary w-100' type='submit'>
            <span className={`spinner-border spinner-border-sm mx-2 ${status === 'loading' ? 'd-inline-block' : 'd-none'} ${slugValidationErr && 'd-none'}`}></span>
            CREATE SHORT LINK 
          </button>
        </div>

      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({req}: any) => ({ props: { host: req.headers.host || null } })

export default Home

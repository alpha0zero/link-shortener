import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <form>
        <label htmlFor='url'>
          URL:
          <input className='form-control' type='text' id='url' name='url'/>
        </label>
        <label htmlFor="slug">
          <input className='form-control' type='text' id='slug' name='slug'/>
        </label>
      </form>
    </div>
  )
}

export default Home

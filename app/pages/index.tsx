/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react'
import { BlitzPage } from 'blitz'
import Layout from 'app/layouts/Layout'
import { colors } from '../stylesheets/colors'

const flowColor = keyframes`
  0%, 5%, 85%, 100% {
    color: ${colors.black['700']};
  }

  13%, 35% {
    color: ${colors.ocean['500']};
  }
  
  43%, 60% {
    color: ${colors.pink['500']};
  }
  
  68%, 80% {
    color: ${colors.teal['500']};
  }
`

const Home: BlitzPage = () => {
  return (
    <main>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 700px;
          animation: ${flowColor} 10s infinite;
        `}
      >
        <h1
          css={css`
            font-size: 20px;
            font-weight: bold;
          `}
        >
          Hello world.
        </h1>
      </div>
    </main>
  )
}

Home.getLayout = (page) => (
  <Layout title="Home" homeLink={true}>
    {page}
  </Layout>
)

export default Home

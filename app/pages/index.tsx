/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react'
import { BlitzPage } from 'blitz'
import Layout from 'app/layouts/Layout'

const flowColor = keyframes`
  to { 
    background-position-x: 114%;
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
        `}
      >
        <h1
          css={css`
            background: linear-gradient(
                to right,
                #f00 0%,
                #f80 14.28%,
                #dd0 28.56%,
                #0d0 42.85%,
                #0dd 57.14%,
                #00f 71.42%,
                #e0e 85.71%,
                #f00 100%
              )
              0 center / 1000% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ${flowColor} 10s linear infinite;
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

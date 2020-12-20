/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { BlitzPage, Link } from 'blitz'
import Layout from 'app/layouts/Layout'
import { FC } from 'react'

const LinkText: FC<{ href: string }> = ({ href, children }) => (
  <Link href={href}>
    <a
      css={css`
        font-size: 15px;
        font-weight: bold;
        text-decoration: underline;
      `}
    >
      {children}
    </a>
  </Link>
)

const Home: BlitzPage = () => {
  return (
    <main>
      <h1
        css={css`
          font-size: 20px;
          font-weight: bold;
        `}
      >
        Hello world.
      </h1>
      <div
        css={css`
          display: grid;
          grid-template-columns: 100px;
          row-gap: 20px;
          margin-top: 50px;
        `}
      >
        <LinkText href="/login">login</LinkText>
        <LinkText href="/signup">signup</LinkText>
        <LinkText href="/admin">admin</LinkText>
        <LinkText href="/blogs">blogs</LinkText>
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

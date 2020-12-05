/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Link, BlitzPage, useMutation } from 'blitz'
import Layout from 'app/layouts/Layout'
import logout from 'app/auth/mutations/logout'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import { Suspense } from 'react'
import LinkText from '../components/LinkText'

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <LinkText href="/admin">admin</LinkText>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <h1
        css={css`
          font-size: 30px;
          font-weight: bold;
        `}
      >
        [Home Page]
      </h1>
      <main
        css={css`
          margin-top: 30px;
        `}
      >
        <h2
          css={css`
            font-size: 20px;
            font-weight: bold;
          `}
        >
          Links
        </h2>
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <ul>
            <li>
              <LinkText href="/blogs">blogs</LinkText>
            </li>
          </ul>
        </div>
        <div
          style={{
            marginTop: '50px',
          }}
        >
          <h2>Login information</h2>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </main>
    </>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

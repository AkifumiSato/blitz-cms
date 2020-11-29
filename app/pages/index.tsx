import { Link, BlitzPage, useMutation } from 'blitz'
import Layout from 'app/layouts/Layout'
import logout from 'app/auth/mutations/logout'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import { Suspense } from 'react'

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
      <h1>[[Home page]]</h1>
      <main>
        <div>
          <h2>Links</h2>
          <Link href="/blogs">
            <a>blogs</a>
          </Link>
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

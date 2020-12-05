/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { ReactNode } from 'react'
import { Head, Link } from 'blitz'
import { colors } from '../stylesheets/colors'

const HomeLinkText: React.FC<{ href: string }> = ({ href }) => (
  <Link href={href}>
    <a
      css={css`
        color: ${colors.white.base};
        font-size: 20px;
        font-weight: bold;

        &:hover {
          color: ${colors.white.base};
        }
      `}
    >
      Home
    </a>
  </Link>
)

type LayoutProps = {
  title?: string
  children: ReactNode
}

const AdminLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'blitz-local-demo'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        css={css`
          background-color: ${colors.white.base};
          box-sizing: border-box;
          min-height: 100vh;
        `}
      >
        <header
          css={css`
            background-color: ${colors.black['500']};
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            height: 70px;
            padding: 5px 50px;
            color: ${colors.white.base};
            font-size: 20px;
            font-weight: bold;
            position: fixed;
            top: 0;
            width: 100vw;
          `}
        >
          <div>
            <HomeLinkText href="/" />
          </div>
        </header>
        <div
          css={css`
            padding: 100px 50px 50px;
          `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default AdminLayout

/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { Head, Link } from 'blitz'
import { colors } from '../stylesheets/colors'

type LinkTextProps = {
  href: string
  strong?: boolean
  disabled?: boolean
}

const LinkText: FC<LinkTextProps> = ({
  href,
  strong = false,
  disabled = false,
  children,
}) =>
  disabled ? (
    <div
      css={css`
        font-size: ${strong ? '20px' : '15px'};
        font-weight: bold;
        padding: 10px;
      `}
    >
      {children}
    </div>
  ) : (
    <Link href={href}>
      <a
        css={css`
          font-size: ${strong ? '20px' : '15px'};
          font-weight: bold;
          padding: 10px;
        `}
      >
        {children}
      </a>
    </Link>
  )

type LayoutProps = {
  title?: string
  homeLink?: boolean
}

const Layout: FC<LayoutProps> = ({ title, homeLink = false, children }) => {
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
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: saturate(180%) blur(5px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            height: 70px;
            padding: 5px 50px;
            position: fixed;
            top: 0;
            width: 100vw;
            z-index: 1;
          `}
        >
          <div>
            <LinkText href="/" strong={true} disabled={homeLink}>
              Home
            </LinkText>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              width: 200px;
            `}
          >
            <LinkText href="/blogs">blog</LinkText>
            <LinkText href="/admin">admin</LinkText>
          </div>
        </header>
        <div
          css={css`
            box-sizing: border-box;
            padding: 100px 50px 50px;
            max-width: 1200px;
            margin: 0 auto;
          `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout

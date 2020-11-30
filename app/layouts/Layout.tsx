/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { ReactNode } from 'react'
import { Head } from 'blitz'
import { colors } from '../stylesheets/colors'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'blitz-local-demo'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        css={css`
          background-color: ${colors.white.light};
          box-sizing: border-box;
          border-top: 5px solid ${colors.teal['300']};
          min-height: 100vh;
        `}
      >
        {children}
      </div>
    </>
  )
}

export default Layout

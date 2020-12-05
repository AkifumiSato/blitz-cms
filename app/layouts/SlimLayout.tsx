/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC, ReactNode } from 'react'
import { Head } from 'blitz'
import { colors } from '../stylesheets/colors'

type Props = {
  title?: string
  children: ReactNode
}

const SlimLayout: FC<Props> = ({ title, children }) => {
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
          padding: 50px;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            width: 100%;
          `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default SlimLayout

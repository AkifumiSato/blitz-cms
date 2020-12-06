/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { colors } from '../../stylesheets/colors'

const Title: React.FC = ({ children }) => (
  <h1
    css={css`
      font-size: 50px;
      color: ${colors.teal['900']};
      font-weight: normal;
      text-align: center;
      padding-bottom: 50px;
      border-bottom: 1px solid ${colors.gray['300']};
    `}
  >
    {children}
  </h1>
)

export default Title

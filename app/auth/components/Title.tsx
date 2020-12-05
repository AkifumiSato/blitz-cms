/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { colors } from '../../stylesheets/colors'

const Title: React.FC<{ size?: 'min' | 'normal' }> = ({
  size = 'normal',
  children,
}) => (
  <h1
    css={css`
      font-size: ${size === 'normal' ? '40px' : '30px'};
      font-weight: bold;
      color: ${colors.teal['900']};
    `}
  >
    {children}
  </h1>
)

export default Title

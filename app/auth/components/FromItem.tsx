/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { colors } from '../../stylesheets/colors'

const FormItem: React.FC<{ keyName: string; readonly?: boolean }> = ({
  keyName,
  readonly = false,
  children,
}) => (
  <div
    css={css`
      padding: 10px 0 10px 10px;
      border-left: 2px solid ${colors.gray['400']};

      &:not(:first-of-type) {
        margin-top: 30px;
      }
    `}
  >
    <div
      css={css`
        font-size: 15px;
      `}
    >
      {keyName}
    </div>
    <div
      css={css`
        margin-top: 10px;
        font-size: 15px;
        font-weight: ${readonly ? 'bold' : 'normal'};
      `}
    >
      {children}
    </div>
  </div>
)

export default FormItem

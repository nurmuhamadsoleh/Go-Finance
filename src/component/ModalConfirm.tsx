import { Button, Modal } from 'antd'

import { ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface IConfirm {
  icon?: React.ReactNode
  title?: React.ReactNode
  okText?: React.ReactNode
  onOk?: (_vals: any) => void
  size?: SizeType
  danger?: boolean
  content?: React.ReactNode
  className?: string
  type?: any
}

export default function ModalConfirm(props: IConfirm) {
  const { title, onOk, okText, icon, size, danger, content, className, type } = props
  const { confirm } = Modal

  // Function to show the confirm modal
  const showConfirm = () => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled />,
      onOk,
      okText,
      content,
    })
  }

  // Render a button or trigger the modal based on a user action
  return (
    <Button
      className={className}
      size={size}
      icon={icon}
      onClick={showConfirm}
      danger={danger}
      type={type}
    />
  )
}

import React from 'react'
import './DeviceBar.css'
import { DeviceBarProps } from './DeviceBarProps'

export default function DeviceBar({children} : DeviceBarProps) {
  return (
    <div className='device-bar'>{children}</div>
  )
}

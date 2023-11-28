import React from 'react';
import './ShopForm.css'
import { ShopFormProps } from './ShopFormProps';

export default function ShopForm({children} : ShopFormProps) {
  return (
    <div className='shop-form-container'>{children}</div>
  )
}

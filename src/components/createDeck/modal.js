import { React } from 'react';

export default function Modal({isOpen, children}) {
  if (!isOpen) return null;

  return(
    <div id='cardImporter'>
      {children}
    </div>
  )
}
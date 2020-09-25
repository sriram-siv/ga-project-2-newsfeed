import { notify } from 'react-notify-toast'

const popupStyles = { 
  background: '#9bf',
  text: '#666' 
}

export const popupNotification = message => {
  notify.show(message, 'custom', 3000, popupStyles)
}
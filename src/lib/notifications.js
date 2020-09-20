import { notify } from 'react-notify-toast'

const popupStyles = { 
  background: 'lightblue',
  text: '#555' 
}

export const popupNotification = message => {
  notify.show(message, 'custom', 3000, popupStyles)
}
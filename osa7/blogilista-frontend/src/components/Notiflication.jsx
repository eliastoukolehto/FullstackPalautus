import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message) {
    return null
  }

  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={notifStyle}>{message}</div>
}

export default Notification

Notification.propTypes = {
  message: PropTypes.string,
}

const Notification = ({ message, style }) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const failStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
      return null
    }
  
    if (style === 'success') {
        return (
        <div style={successStyle}>
            {message}
        </div>
        )
    }

    return (
        <div style={failStyle}>
            {message}
        </div>
        )

  }

export default Notification
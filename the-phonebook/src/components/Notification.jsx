const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  } else {
    return <div className="noti" style={{color: `${color}`}}>{message}</div>;
  }
};

export default Notification;

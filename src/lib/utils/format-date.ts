const formatDate = (date: Date, withTime = false) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime && { hour: '2-digit', minute: '2-digit' }),
  };
  return date.toLocaleString('ru-RU', options);
};

export default formatDate;

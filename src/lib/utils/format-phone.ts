const formatPhone = (phone: number): string => {
  const d = phone.toString();
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}`;
};

export default formatPhone;

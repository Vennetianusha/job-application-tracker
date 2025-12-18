const workflow = {
  SUBMITTED: ['REVIEWED'],
  REVIEWED: ['INTERVIEW'],
  INTERVIEW: ['OFFERED'],
  OFFERED: ['HIRED', 'REJECTED'],
  HIRED: [],
  REJECTED: []
};

exports.isValidTransition = (currentStatus, newStatus) => {
  return workflow[currentStatus]?.includes(newStatus);
};

// Countdown utility for time-locked letters

export const calculateTimeRemaining = (unlockDate) => {
  const now = new Date().getTime();
  const unlock = new Date(unlockDate).getTime();
  const difference = unlock - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUnlocked: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isUnlocked: false,
  };
};

export const formatTimeUnit = (value) => {
  return value.toString().padStart(2, '0');
};

export const getEmotionalCountdownMessage = (days) => {
  if (days <= 0) {
    return "The moment is here...";
  } else if (days === 1) {
    return "Just one more day...";
  } else if (days <= 7) {
    return "Almost there...";
  } else if (days <= 30) {
    return "The wait continues...";
  } else {
    return "Patience is a form of love...";
  }
};

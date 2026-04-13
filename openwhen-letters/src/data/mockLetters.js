// Mock data for OpenWhen Letters

export const mockLetters = [
  {
    id: '1',
    recipientName: 'Sarah',
    senderName: 'Michael',
    openWhenCondition: 'You need a reminder of how loved you are',
    body: `My dearest Sarah,

If you're reading this, I hope it means you're having one of those days where you need to remember just how incredible you are.

You have this light inside you that you don't always see. The way you care for others, the way you find beauty in small things, the way you keep going even when it's hard — these are not ordinary things.

I wrote this letter for the moment when you need to hear that you are enough. That you always have been. That you always will be.

Take a deep breath. You're doing beautifully.

With all my love,
Michael`,
    unlockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdAt: new Date().toISOString(),
    isLocked: true,
    isFromCurrentUser: true,
    hasVoiceNote: false,
  },
  {
    id: '2',
    recipientName: 'Alex',
    senderName: 'Jordan',
    openWhenCondition: "It's your birthday",
    body: `Happy Birthday, Alex!

Another year around the sun, and I wanted to give you something that doesn't take up space but I hope takes up heart.

This year, I've watched you grow in ways that make me so proud. You've faced challenges with grace and celebrated victories with humility.

May this year bring you closer to the things that make your soul light up.

Cheers to you, today and always.

Love,
Jordan`,
    unlockDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    isLocked: false,
    isFromCurrentUser: false,
    hasVoiceNote: true,
  },
  {
    id: '3',
    recipientName: 'Emma',
    senderName: 'You',
    openWhenCondition: "You're feeling lost",
    body: `Dear Emma,

I know that feeling — when the path ahead seems foggy and every direction looks uncertain.

But remember: you've been lost before. And each time, you found your way. Not because the fog cleared, but because you learned to walk through it.

Trust yourself. You know more than you think.

You've got this.

With love,
You`,
    unlockDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    createdAt: new Date().toISOString(),
    isLocked: true,
    isFromCurrentUser: true,
    hasVoiceNote: false,
  },
  {
    id: '4',
    recipientName: 'You',
    senderName: 'Mom',
    openWhenCondition: 'You accomplished something big',
    body: `My wonderful child,

I heard the news and my heart swelled with pride. Not because of what you achieved, but because of who you are.

You worked for this. You believed when it wasn't easy. You became the kind of person who could do this.

Celebrate today. You've earned it.

I love you more than words can hold.

Mom`,
    unlockDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    isLocked: false,
    isFromCurrentUser: false,
    hasVoiceNote: false,
  },
];

export const getLockedLetters = () => {
  return mockLetters.filter(letter => letter.isLocked);
};

export const getOpenedLetters = () => {
  return mockLetters.filter(letter => !letter.isLocked);
};

export const getLettersByCurrentUser = () => {
  return mockLetters.filter(letter => letter.isFromCurrentUser);
};

export const getLettersToCurrentUser = () => {
  return mockLetters.filter(letter => !letter.isFromCurrentUser);
};

export const getLetterById = (id) => {
  return mockLetters.find(letter => letter.id === id);
};

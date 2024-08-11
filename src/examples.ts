const EXAMPLES = [
  {
    sentence: 'The quick brown fox',
    finishedSentence: ' jumps over the lazy dog',
  },
  {
    sentence: 'The quick brown fo',
    finishedSentence: ' x jumps over the lazy dog',
  },
  {
    sentence: 'The quick brow',
    finishedSentence: 'n fox jumps over the lazy dog',
  },
  {
    sentence: 'The quick',
    finishedSentence: 'brown fox jumps over the lazy dog',
  },
  {
    sentence: 'The quick brown fox jumps over the lazy ',
    finishedSentence: 'dog',
  },
  {
    sentence: 'The quick brown fox jumps over the',
    finishedSentence: ' lazy dog',
  },
  {
    sentence: 'The quick brown fox jumps over the ',
    finishedSentence: 'lazy dog',
  },
  {
    sentence: 'To be or not to',
    finishedSentence: ' be, that is the question',
  },
  {
    sentence: 'All that glitters is not',
    finishedSentence: ' gold',
  },
  {
    sentence: 'A picture is worth a thousand',
    finishedSentence: ' words',
  },
  {
    sentence: 'Actions speak louder than',
    finishedSentence: ' words',
  },
  {
    sentence: "Where there's smoke, there's",
    finishedSentence: ' fire',
  },
  {
    sentence: 'The early bird catches the',
    finishedSentence: ' worm',
  },
  {
    sentence: 'The early bird catches the',
    finishedSentence: ' worm',
  },
  {
    sentence: 'Every cloud has a sil',
    finishedSentence: 'ver lining',
  },
  {
    sentence: "Don't count your chic",
    finishedSentence: 'kens before they hatch',
  },
  {
    sentence: 'A penny saved is a pen',
    finishedSentence: 'ny earned',
  },
  {
    sentence: 'When in Ro',
    finishedSentence: 'me, do as the Romans do',
  },
  {
    sentence: 'The pen is migh',
    finishedSentence: 'tier than the sword',
  },
  {
    sentence: 'Necessity is the mot',
    finishedSentence: 'her of invention',
  },
  {
    sentence: 'An apple a day keeps the doc',
    finishedSentence: 'tor away',
  },
  {
    sentence: 'A journey of a thousand mi',
    finishedSentence: 'les begins with a single step',
  },
  {
    sentence: "You can't have your cake and ",
    finishedSentence: 'eat it too',
  },
  {
    sentence: 'The grass is always gree',
    finishedSentence: 'ner on the other side',
  },
  {
    sentence: "Don't put all your eggs in one bas",
    finishedSentence: 'ket',
  },
  {
    sentence: 'A watched pot never ',
    finishedSentence: 'boils',
  },
  {
    sentence: "Two wrongs don't make a ",
    finishedSentence: 'right',
  },
  {
    sentence: 'The proof is in the pud',
    finishedSentence: 'ding',
  },
  {
    sentence: 'Better late than ',
    finishedSentence: 'never',
  },
  {
    sentence: "Hey, how's it ",
    finishedSentence: 'going?',
  },
  {
    sentence: 'What time does the movie ',
    finishedSentence: 'start?',
  },
  {
    sentence: 'Can you pass me the ',
    finishedSentence: 'salt, please?',
  },
  {
    sentence: "I'm sorry, I didn't catch your ",
    finishedSentence: 'name.',
  },
  {
    sentence: 'Do you mind if I open the ',
    finishedSentence: 'window?',
  },
  {
    sentence: "That's a great idea! Let's ",
    finishedSentence: 'do it!',
  },
  {
    sentence: "I'm not sure. What do you ",
    finishedSentence: 'think?',
  },
  {
    sentence: 'Could you repeat that, ',
    finishedSentence: 'please?',
  },
  {
    sentence: 'It was nice meeting ',
    finishedSentence: 'you!',
  },
  {
    sentence: 'Can you help me find my ke',
    finishedSentence: "ys? I can't remember where I put them.",
  },
  {
    sentence: "I'm starving! Let's grab some lun",
    finishedSentence: 'ch together.',
  },
  {
    sentence: 'Do you know where the nearest gro',
    finishedSentence: 'cery store is?',
  },
  {
    sentence: "I'm sorry, but I have to can",
    finishedSentence: 'cel our plans for tonight.',
  },
  {
    sentence: 'Could you speak a little lou',
    finishedSentence: "der? I'm having trouble hearing you.",
  },
  {
    sentence: "What's your favo",
    finishedSentence: 'rite movie of all time?',
  },
  {
    sentence: "I'm thinking of getting a new lapt",
    finishedSentence: 'op. Any recommendations?',
  },
  {
    sentence: 'Can you believe this weat',
    finishedSentence: "her? It's so unpredictable!",
  },
  {
    sentence: "I'm really looking forward to the week",
    finishedSentence: 'end. I need a break!',
  },
  {
    sentence: 'Have you tried that new resta',
    finishedSentence: 'urant downtown? The food is amazing!',
  },
  {
    sentence: "I can't believe I forgot my umb",
    finishedSentence: 'rella. It looks like it might rain.',
  },
  {
    sentence: 'Do you mind if I borrow your char',
    finishedSentence: "ger? My phone's about to die.",
  },
  {
    sentence: "I'm thinking of taking up yog",
    finishedSentence: 'a. Do you know any good classes?',
  },
  {
    sentence: 'Can you recommend a good boo',
    finishedSentence: "k to read? I'm in the mood for something new.",
  },
  {
    sentence: "I'm having trouble with my inter",
    finishedSentence: 'net connection. Can you help me troubleshoot?',
  },
  {
    sentence: "What's the best way to get to the air",
    finishedSentence: "port from here? I'm running late for my flight.",
  },
  {
    sentence: "I've been meaning to ask, how's your new",
    finishedSentence: ' job going? Are you enjoying it?',
  },
  {
    sentence: 'Do you have any plans for the holi',
    finishedSentence: "days? I'm thinking of taking a trip.",
  },
  {
    sentence: "Hey, how's it ",
    finishedSentence: 'going?',
  },
  {
    sentence: 'What time does the movie ',
    finishedSentence: 'start?',
  },
  {
    sentence: 'Can you pass me the ',
    finishedSentence: 'salt, please?',
  },
  {
    sentence: "I'm sorry, I didn't catch your ",
    finishedSentence: 'name.',
  },
  {
    sentence: 'Do you mind if I open the ',
    finishedSentence: 'window?',
  },
  {
    sentence: "That's a great idea! Let's ",
    finishedSentence: 'do it!',
  },
  {
    sentence: "I'm not sure. What do you ",
    finishedSentence: 'think?',
  },
  {
    sentence: 'Could you repeat that, ',
    finishedSentence: 'please?',
  },
  {
    sentence: 'It was nice meeting ',
    finishedSentence: 'you!',
  },
];

export { EXAMPLES };

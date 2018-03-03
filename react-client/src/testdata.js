const data = {
  pollingInfo: [],
  candidateInfo: [],
  currentUser: window.localStorage.user || null,
  selectedUser: null,
  races: [
    {
      office: 'senator',
      city: null,
      state: 'Texas',
      district: null,
      date: '1/1/2019',
      candidates: ['Beto O\'Rourke', 'Ted Cruz']
    },
    {
      office: 'mayor',
      city: 'Lockhart',
      state: 'Texas',
      district: null,
      date: '9/10/2018',
      candidates: ['Lew White', 'Jane Doe', 'John Q. Public']
    },
    {
      office: 'council member',
      city: 'Austin',
      state: 'Texas',
      district: 3,
      date: '10/10/2018',
      candidates: ['Sabino Renteria', 'Susana Almanzana']
    },
  ],
  users: {
    'squillen@gmail.com': {
      name: 'Sean Quillen',
      password: '123',
      role: 'voter',
      bio: 'I like to hike!',
      events: [],
      favorites: ['John Q. Public', 'Beto O\'Rourke', 'Sabino Renteria'],
      followers: null
    },
    'shannnopearson@gmail.com': {
      name: 'Shannon Pearson',
      password: 'rainbows',
      role: 'voter',
      bio: 'I have super cool sparkly boots.',
      events: [],
      favorites: ['Beto O\'Rourke', 'Ted Cruz', 'Jane Doe'],
      followers: null
    },
    'jacobgranberry@gmail.com': {
      name: 'Jacob Granberry',
      password: 'bully',
      role: 'voter',
      bio: 'I\'m such a bully you guys.',
      events: [],
      favorites: ['Ted Cruz', 'Sabino Renteria', 'Susana Almanzana'],
      followers: null
    },
    'haileybobella@gmail.com': {
      name: 'Hailey Bobella',
      password: 'thecoolest',
      role: 'voter',
      bio: 'I have the best fashion sense and am so cool.',
      events: [],
      favorites: ['Beto O\'Rourke', 'Jane Doe', 'Susana Almanzana'],
      followers: null
    },
    'bororourke@gmail.com': {
      name: 'Beto O\'Rourke',
      password: 'socializm',
      role: 'candidate',
      bio: 'I can win and would be the best thing to happen to Texas probably in its history.',
      events: [],
      favorites: null,
      followers: ['Sean Quillen', 'Shannon Pearson', 'Hailey Bobella']
    },
    'tcruz@gmail.com': {
      name: 'Ted Cruz',
      password: 'verybad',
      role: 'candidate',
      bio: 'My father is the Zodiac killer. It\'s the truth.',
      events: [],
      favorites: null,
      followers: ['Jacob Granberry', 'Shannon Pearson']
    },
    'lwhite@gmail.com': {
      name: 'Lew White',
      password: 'password',
      role: 'candidate',
      bio: 'I am the mayor of Lockhart.',
      events: [],
      favorites: null,
      followers: []
    },
    'jdoe@gmail.com': {
      name: 'Jane Doe',
      password: 'generic',
      role: 'candidate',
      bio: 'I am made up and super generic.',
      events: [],
      favorites: null,
      followers: ['Shannon Pearson', 'Hailey Bobella']
    },
    'jqpublic@gmail.com': {
      name: 'John Q. Public',
      password: 'alsogeneric',
      role: 'candidate',
      bio: 'I am even more made up but I have a middle initial which is cool.',
      events: [],
      favorites: null,
      followers: ['Sean Quillen']
    },
    'srenteria@gmail.com': {
      name: 'Sabino Renteria',
      password: 'councilperson',
      role: 'candidate',
      bio: 'I was the winner in district 3 in 2014.',
      events: [],
      favorites: null,
      followers: ['Sean Quillen', 'Jacob Granberry']
    },
    'salmanza@gmail.com': {
      name: 'Susana Almanzana',
      password: 'councilpersonalso',
      role: 'candidate',
      bio: 'I ran to be councilperson.',
      events: [],
      favorites: null,
      followers: ['Jacob Granberry', 'Hailey Bobella']
    }
  },
  events: [
    {
      title: 'Bet-o-rama',
      location: 'The Capitol Building',
      time: '12:00PM',
      date: '10/30/18',
      description: 'Come see Beto talk! You better bet ol Beto will o\'knock your socks off!',
      host: 'Beto O\'Rourke',
      attendees: ['Sean Quillen', 'Shannon Pearson', 'Hailey Bobella']
    },
    {
      title: 'Cruzin',
      location: 'the city dump',
      time: '3:00AM',
      date: '12/25/18',
      description: 'I am Ted Cruz and my father was the Zodiac killer, I\'m serious you guys.',
      host: 'Ted Cruz',
      attendees: ['Jacob Granberry']
    },
    {
      title: 'I love you Ted Cruz!',
      location: 'my house',
      time: '12:00PM',
      date: '10/31/18',
      description: 'Ted Cruz is the best.',
      host: 'Jacob Granberry',
      attendees: []
    },
    {
      title: 'Generic Rally',
      location: 'Lockhart City Hall',
      time: '12:00PM',
      date: '8/20/18',
      description: 'The city of Lockhart needs a generic mayor. Come see what we\'re all about.',
      host: 'Jane Doe',
      attendees: ['Shannon Pearson', 'Hailey Bobella']
    },
    {
      title: 'Generic Rally 2.0',
      location: 'Lockhart City Hall',
      time: '12:00PM',
      date: '8/20/18',
      description: 'The city of Lockhart needs a generic mayor. Come see what we\'re all about.',
      host: 'Jane Doe',
      attendees: ['Shannon Pearson', 'Hailey Bobella']
    },
    {
      title: 'Council Party!',
      location: 'the park',
      time: '10:30PM',
      date: '7/15/18',
      description: 'A mixer for everybody to meet the council candidates!',
      host: 'Susana Almanzana',
      attendees: ['Sean Quillen', 'Jacob Granberry', 'Shannon Pearson', 'Hailey Bobella', 'Sabino Renteria']
    },
    {
      title: 'Bet-o-rama',
      location: 'The Capitol Building',
      time: '12:00PM',
      date: '10/30/18',
      description: 'Come see Beto talk! You better bet ol Beto will o\'knock your socks off!',
      host: 'Beto O\'Rourke',
      attendees: ['Sean Quillen', 'Shannon Pearson', 'Hailey Bobella']
    },
    {
      title: 'Cruzin',
      location: 'the city dump',
      time: '3:00AM',
      date: '12/25/18',
      description: 'I am Ted Cruz and my father was the Zodiac killer, I\'m serious you guys.',
      host: 'Ted Cruz',
      attendees: ['Jacob Granberry']
    },
    {
      title: 'I love you Ted Cruz!',
      location: 'my house',
      time: '12:00PM',
      date: '10/31/18',
      description: 'Ted Cruz is the best.',
      host: 'Jacob Granberry',
      attendees: []
    },
    {
      title: 'Generic Rally',
      location: 'Lockhart City Hall',
      time: '12:00PM',
      date: '8/20/18',
      description: 'The city of Lockhart needs a generic mayor. Come see what we\'re all about.',
      host: 'Jane Doe',
      attendees: ['Shannon Pearson', 'Hailey Bobella']
    },
    {
      title: 'Generic Rally 2.0',
      location: 'Lockhart City Hall',
      time: '12:00PM',
      date: '8/20/18',
      description: 'The city of Lockhart needs a generic mayor. Come see what we\'re all about.',
      host: 'Jane Doe',
      attendees: ['Shannon Pearson', 'Hailey Bobella']
    },
    {
      title: 'Council Party!',
      location: 'the park',
      time: '10:30PM',
      date: '7/15/18',
      description: 'A mixer for everybody to meet the council candidates!',
      host: 'Susana Almanzana',
      attendees: ['Sean Quillen', 'Jacob Granberry', 'Shannon Pearson', 'Hailey Bobella', 'Sabino Renteria']
    }
  ]
}

export default data;

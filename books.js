// Example data
const booksData = [
  {
    id: "7",
    title: "The Books of Earthsea",
    author: "Ursula K. Le Guin",
    description:
      "Celebrating the 50th anniversary of the timeless and beloved A Wizard of Earthsea that “reads like the retelling of a tale first told centuries ago” (David Mitchell)—this omnibus edition encompasses the entire Earthsea chronicles, including the early short stories, Le Guin’s “Earthsea Revisioned” Oxford lecture, and a new Earthsea story, never before printed.",
    price: "38.99",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1637214989445-BJIWDCV429BOD35JCOBU/image-asset.jpeg",
  },
  {
    id: "8",
    title: "Worlds of Exile and Illusion",
    author: "Ursula K. Le Guin",
    description:
      "Three remarkable journeys into the stars, Worlds of Exile and Illusion by Ursula K. Le Guin includes: Rocannon's World, Planet of Exile, and City of Illusions.",
    price: "12.59",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1640290071613-LZVLFLFD3UDSRDNT2O8O/worlds-exile-illusion-le-guin.jpg",
  },
  {
    id: "9",
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    description:
      "A lone human ambassador is sent to the icebound planet of Winter, a world without sexual prejudice, where the inhabitants’ gender is fluid. His goal is to facilitate Winter’s inclusion in a growing intergalactic civilization. But to do so he must bridge the gulf between his own views and those of the strange, intriguing culture he encounters.\r\n\r\nEmbracing the aspects of psychology, society, and human emotion on an alien world, The Left Hand of Darkness stands as a landmark achievement in the annals of intellectual science fiction.",
    price: "21.3",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1640290364835-H8DRTOIM88W3PERM9HEI/left-hand-darknessjpg",
  },
  {
    id: "10",
    title: "The Dispossessed",
    author: "Ursula K. Le Guin",
    description:
      "A bleak moon settled by utopian anarchists, Anarres has long been isolated from other worlds, including its mother planet, Urras—a civilization of warring nations, great poverty, and immense wealth. Now Shevek, a brilliant physicist, is determined to reunite the two planets, which have been divided by centuries of distrust. He will seek answers, question the unquestionable, and attempt to tear down the walls of hatred that have kept them apart.\r\n\r\nTo visit Urras—to learn, to teach, to share—will require great sacrifice and risks, which Shevek willingly accepts. But the ambitious scientist's gift is soon seen as a threat, and in the profound conflict that ensues, he must reexamine his beliefs even as he ignites the fires of change.",
    price: "16.91",
    image_url:
      "https://images-na.ssl-images-amazon.com/images/I/51-pZcQ9mrL._SX324_BO1,204,203,200_.jpg",
  },
  {
    id: "11",
    title: "Five Ways to Forgiveness",
    author: "Ursula K. Le Guin",
    description:
      'At the far end of our universe, on the twin planets of Werel and Yeowe, all humankind is divided into "assets" and "owners," tradition and liberation are at war, and freedom takes many forms. Here is a society as complex and troubled as any on our world, peopled with unforgettable characters struggling to become fully human. For the disgraced revolutionary Abberkam, the callow "space brat" Solly, the haughty soldier Teyeo, and the Ekumen historian and Hainish exile Havzhiva, freedom and duty both begin in the heart, and success as well as failure has its costs.',
    price: "11.79",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1640292436657-1ZAHFJ4TJ24FXK1W0BGO/four-ways-forgiveness.jpg",
  },
  {
    id: "1",
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    description:
      "Ged was the greatest sorcerer in Earthsea, but in his youth he was the reckless Sparrowhawk. In his hunger for power and knowledge, he tampered with long-held secrets and loosed a terrible shadow upon the world. This is the tumultuous tale of his testing, how he mastered the mighty words of power, tamed an ancient dragon, and crossed death's threshold to restore the balance.",
    price: "18.99",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1633475102359-APMR5LF0UVD27Y64VAHF/Wizard+of+Earthsea.jpg",
  },
  {
    id: "2",
    title: "The Tombs of Atuan",
    author: "Ursula K. Le Guin",
    description:
      "In this second novel in the Earthsea series, Tenar is chosen as high priestess to the ancient and nameless Powers of the Earth, and everything is taken from her—home, family, possessions, even her name. She is now known only as Arha, the Eaten One, and guards the shadowy, labyrinthine Tombs of Atuan.\nThen a wizard, Ged Sparrowhawk, comes to steal the Tombs’ greatest hidden treasure, the Ring of Erreth-Akbe. Tenar’s duty is to protect the Ring, but Ged possesses the light of magic and tales of a world that Tenar has never known. Will Tenar risk everything to escape from the darkness that has become her domain?",
    price: "14.99",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1633484109658-ZAF2VNOFE5XJP4W966IA/tombs-saga.jpg",
  },
  {
    id: "3",
    title: "The Farthest Shore",
    author: "Ursula K. Le Guin",
    description:
      "Darkness threatens to overtake Earthsea: The world and its wizards are losing their magic. But Ged Sparrowhawk—Archmage, wizard, and dragonlord—is determined to discover the source of this devastating loss.\n\nAided by Enlad’s young Prince Arren, Ged embarks on a treacherous journey that will test their strength and will. Because to restore magic, the two warriors must venture to the farthest reaches of their world—and even beyond the realm of death.",
    price: "15.79",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1633484149480-UX7AANTXED5HF6UBENJK/farthest+shore-saga.jpg",
  },
  {
    id: "4",
    title: "Tehanu",
    author: "Ursula K. Le Guin",
    description:
      "In this fourth novel in the Earthsea series, we rejoin the young priestess Tenar and powerful wizard Ged. Years before, they helped each other at a time of darkness and danger. Together, they shared an adventure like no other. Tenar has since embraced the simple pleasures of an ordinary life, while Ged mourns the powers lost to him through no choice of his own.\r\n\r\nNow the two must join forces again and help another in need—the physically, emotionally scarred child whose destiny has yet to be revealed…",
    price: "16.99",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1633475104577-BT1B6S4BO9SRLOIEAUAC/tehanu-saga.jpg",
  },
  {
    id: "5",
    title: "Tales from Earthsea",
    author: "Ursula K. Le Guin",
    description:
      'The tales of this book explore and extend the world established by the Earthsea novels--yet each stands on its own. It contains the novella "The Finder," and the short stories "The Bones of the Earth," "Darkrose and Diamond," "On the High Marsh,"and "Dragonfly." Concluding with with an account of Earthsea\'s history, people, languages, literature, and magic, this collection also features two new maps of Earthsea.',
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1633475104633-RXOICUV4HF0M02LZKCMX/Tales+from+Earthsea.jpg",
    price: "25.99",
  },
  {
    id: "6",
    title: "The Other Wind",
    author: "Ursula K. Le Guin",
    description:
      "The sorcerer Alder fears sleep. The dead are pulling him to them at night. Through him they may free themselves and invade Earthsea. \r\n\r\nAlder seeks advice from Ged, once Archmage. Ged tells him to go to Tenar, Tehanu, and the young king at Havnor. They are joined by amber-eyed Irian, a fierce dragon able to assume the shape of a woman. \r\n\r\nThe threat can be confronted only in the Immanent Grove on Roke, the holiest place in the world, and there the king, hero, sage, wizard, and dragon make a last stand.\r\n\r\nIn this final book of Earthsea, Le Guin combines her magical fantasy with a profoundly human, earthly, humble touch.",
    price: "36.24",
    image_url:
      "https://images.squarespace-cdn.com/content/v1/5cad42ef90f904e520359371/1633475103312-MIW4CC773N26452Y1IAL/the+other+wind.jpg",
  },
];

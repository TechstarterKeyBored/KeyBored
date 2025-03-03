import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, Star, Skull } from "lucide-react";

const KaraokeTrainer = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const audioRef = useRef(null);

  // Sample lyrics with timing (in seconds)
  const songs = [
    {
      title: "Scorpions - Wind of Change",
      src: "music/windofchange.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 0, text: "*instrumental*" },
        { time: 21.6, text: "i follow the moskva" },
        { time: 25.2, text: "and down to gorky park" },
        { time: 28.4, text: "listening to the wind of change" },
        { time: 35.9, text: "an august summer night" },
        { time: 39.3, text: "soldiers passing by" },
        { time: 42.4, text: "listening to the wind of change" },
        { time: 50, text: "*instrumental*" },
        { time: 70, text: "the world is closing in" },
        { time: 74, text: "and did you ever think" },
        { time: 77.4, text: "that we could be so close like brothers" },
        { time: 84.8, text: "the futures in the air" },
        { time: 88.1, text: "i can feel it everywhere" },
        { time: 91.5, text: "blowing with the wind of change" },
        { time: 99.3, text: "take me to the magic of the moment" },
        { time: 105.3, text: "on a glory night" },
        { time: 108.7, text: "where the children of tomorrow dream away" },
        { time: 114, text: "in the wind of change" },
        { time: 124, text: "walking down the street" },
        { time: 129.5, text: "and distant memories" },
        { time: 132.5, text: "are buried in the past forever" },
        { time: 139.8, text: "i follow the moskva" },
        { time: 143.6, text: "and down to gorky park" },
        { time: 146.8, text: "listening to the wind of change" },
        { time: 154.7, text: "take me to the magic of the moment" },
        { time: 160.8, text: "on a glory night" },
        { time: 164.1, text: "where the children of tomorrow share their dreams" },
        { time: 169.6, text: "with you and me" },
        { time: 173.6, text: "take me to the magic of the moment" },
        { time: 179.7, text: "on a glory night" },
        { time: 183, text: "where the children of tomorrow dream away" },
        { time: 188, text: "in the wind of change" },
        { time: 194, text: "the wind of change blows straight" },
        { time: 197.5, text: "into the face of time" },
        { time: 200.5, text: "like a storm wind that will ring" },
        { time: 203.5, text: "the freedom bell for peace of mind" },
        { time: 207.1, text: "let your balalaika sing" },
        { time: 209.7, text: "what my guitar wants to say" },
        { time: 219, text: "*guitar solo*" },
        { time: 243, text: "take me to the magic of the moment" },
        { time: 249.3, text: "on a glory night" },
        { time: 252.7, text: "where the children of tomorrow share their dreams" },
        { time: 258.3, text: "with you and me" },
        { time: 262.1, text: "take me to the magic of the moment" },
        { time: 268.2, text: "on a glory night" },
        { time: 271.5, text: "where the children of tomorrow dream away" },
        { time: 277.2, text: "in the wind of change" },
      ],
    },
    {
      title: "Seal - Kiss From a Rose",
      src: "music/rose.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 23.6, text: "there used to be a graying tower alone on the sea" },
        { time: 29, text: "you became the light on the dark side of me" },
        { time: 35.6, text: "love remained a drug thats the high and not the pill" },
        { time: 42.5, text: "but did you know that when it snows" },
        { time: 45.1, text: "my eyes become large and the light that you shine can be seen" },
        { time: 52.6, text: "baby i compare you to a kiss from a rose on the gray" },
        { time: 60, text: "the more i get of you the stranger it feels yeah" },
        { time: 65.6, text: "and now that your rose is in bloom" },
        { time: 69.7, text: "a light hits the gloom on the gray" },
        { time: 87, text: "there is so much a man can tell you so much he can say" },
        { time: 93, text: "you remain my power my pleasure my pain baby" },
        { time: 101.2, text: "to me youre like a growing addiction that i cant deny" },
        { time: 105.5, text: "wont you tell me is that healthy baby" },
        { time: 109.5, text: "but did you know that when it snows" },
        { time: 112.2, text: "my eyes become large and the light that you shine can be seen" },
        { time: 120, text: "baby i compare you to a kiss from a rose on the gray" },
        { time: 127, text: "the more i get of you the stranger it feels" },
        { time: 132.4, text: "now that your rose is in bloom" },
        { time: 136.9, text: "a light hits the gloom on the gray" },
        { time: 159, text: "ive been kissed by a rose on the gray" },
        { time: 165.5, text: "ive been kissed by a rose on the gray" },
        { time: 169.8, text: "ive been kissed by a rose on the gray" },
        { time: 176.3, text: "ive been kissed by a rose on the gray" },
        { time: 182.1, text: "there is so much a man can tell you so much he can say" },
        { time: 187.3, text: "you remain my power my pleasure my pain" },
        { time: 193.9, text: "to me youre like a growing addiction that i cant deny" },
        { time: 198.3, text: "wont you tell me is that healthy baby" },
        { time: 202.5, text: "but did you know that when it snows" },
        { time: 205.1, text: "my eyes become large and the light that you shine can be seen" },
        { time: 213.2, text: "baby i compare you to a kiss from a rose on the gray" },
        { time: 220, text: "the more i get of you the stranger it feels" },
        { time: 225.9, text: "now that your rose is in bloom" },
        { time: 230.2, text: "a light hits the gloom on the gray" },
        { time: 234.3, text: "yes i compare you to a kiss from a rose on the gray" },
        { time: 239.4, text: "the more i get of you the stranger it feels" },
        { time: 245.2, text: "now that your rose is in bloom" },
        { time: 248.8, text: "a light hits the gloom on the gray" },
        { time: 263.6, text: "now that your rose is in bloom" },
        { time: 268.2, text: "a light hits the gloom on the gray" },
      ],
    },
    {
      title: "Madonna - Frozen",
      src: "music/frozen.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 18, text: "you only see" },
        { time: 19.5, text: "what your eyes want to see" },
        { time: 22.5, text: "how can life be " },
        { time: 24, text: "what you want it to be" },
        { time: 26.5, text: "youre frozen" },
        { time: 29, text: "when your hearts not open" },
        { time: 36, text: "youre so consumed with how much you get" },
        { time: 40.5, text: "you waste your time with hate and regret" },
        { time: 44.5, text: "youre broken" },
        { time: 47, text: "when your hearts not open" },
        { time: 53, text: "mmmmmm" },
        { time: 57.5, text: "if i could melt your heart" },
        { time: 62.5, text: "mmmmmm" },
        { time: 66.5, text: "wed never be apart" },
        { time: 71.5, text: "mmmmmm" },
        { time: 75.5, text: "give yourself to me" },
        { time: 80, text: "mmmmmm" },
        { time: 84.5, text: "you hold" },
        { time: 90.0, text: "the key"},
        { time: 98.5, text: "now theres no point in placing the blame" },
        { time: 102.5, text: "and you should know i suffer the same" },
        { time: 106, text: "if i lose you" },
        { time: 108.5, text: "my heart will be broken" },
        { time: 115.5, text: "love is a bird" },
        { time: 117.5, text: "she needs to fly" },
        { time: 120.5, text: "let all the hurt inside of you die" },
        { time: 124.5, text: "youre frozen" },
        { time: 126.5, text: "when your heart s not open" },
        { time: 133, text: "mmmmmm" },
        { time: 137.5, text: "if i could melt your heart" },
        { time: 142, text: "mmmmmm" },
        { time: 146.5, text: "wed never be apart" },
        { time: 151.5, text: "mmmmmm" },
        { time: 156, text: "give yourself to me" },
        { time: 160.5, text: "mmmmmm" },
        { time: 164.5, text: "you hold" },
        { time: 170, text: "the key" },
        { time: 173, text: "*instrumental*" },
        { time: 195.5, text: "you only see what your eyes want to see" },
        { time: 200.5, text: "how can life be what you want it to be" },
        { time: 204.5, text: "youre frozen" },
        { time: 207, text: "when your hearts not open" },
        { time: 213.5, text: "mmmmmm" },
        { time: 217.5, text: "if i could melt your heart" },
        { time: 222.5, text: "mmmmmm" },
        { time: 226.5, text: "wed never be apart" },
        { time: 231.5, text: "mmmmmm" },
        { time: 235.5, text: "give yourself to me" },
        { time: 240.5, text: "mmmmmm" },
        { time: 244.5, text: "you hold" },
        { time: 249, text: "the key" },
        { time: 253.5, text: "if i could melt your heart" },
        { time: 258, text: "mmmmmm" },
        { time: 262, text: "wed never be apart" },
        { time: 267, text: "mmmmmm" },
        { time: 271, text: "give yourself to me" },
        { time: 275.5, text: "mmmmmm" },
        { time: 280, text: "you hold" },
        { time: 285.5, text: "the key" },
        { time: 288.5, text: "if i could melt your heart" },
      ],
    },
    {
      title: "Donna Lewis - I Love You Always Forever",
      src:    "music/alwaysvorever.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 0, text: "Feels like Im standing in a timeless dream" },
        { time: 9.5, text: "Of light mists with pale amber rose" },
        { time: 17.8, text: "Feels like Im lost in a deep cloud of heavenly scent"},
        { time: 29, text: "Touching discovering you" },
        { time: 47.1, text: "Those days of warm rains come rushing back to me" },
        { time: 55.7, text: "Miles of windless summer nights" },
        { time: 64.7, text: "Secret moments shared within the heat of the afternoon"},
        { time: 74.2, text: "Out of the stillness soft spoken words" },
        { time: 82, text: " Say it say it again" },
        { time: 84.3, text: " I love you always forever" },
        { time: 86.6, text: " Near or far closer together" },
        { time: 89, text: " Everywhere I will be with you" },
        { time: 91.3, text: " Everything I will do for you" },
        { time: 93.8, text: "I love you always forever" },
        { time: 96.1, text: "Near or far closer together" },
        { time: 98.3, text: "Everywhere I will be with you" },
        { time: 100.7, text: "Everything I will do for you" },
        { time: 102.7, text: "Youve got" },
        { time: 104.8, text: "The most unbelievable blue eyes Ive ever seen" },
        { time: 111.3, text: "Youve got" },
        { time: 114.2, text: "Me almost melting away" },
        { time: 120.7, text: "As we lay there" },
        { time: 123.9, text: "Under a blue sky with pure white stars" },
        { time: 129.6, text: "Exotic sweetness" },
        { time: 133.5, text: "A magical time" },
        { time: 138.5, text: "Say it say it again" },
        { time: 140.1, text: "I love you always forever" },
        { time: 142.2, text: "Near or far closer together" },
        { time: 144.6, text: "Everywhere I will be with you" },
        { time: 146.8, text: "Everything I will do for you" },
        { time: 148.1, text: "I love you always forever" },
        { time: 151.4, text: "Near or far closer together" },
        { time: 153.7, text: "Everywhere I will be with you" },
        { time: 156, text: "Everything I will do for you" },
        { time: 158.3, text: "Say youll love and love me forever" },
        { time: 160.8, text: "Never stop never whatever" },
        { time: 163, text: "Near and far and always everywhere and everything" },
        { time: 167.8, text: "Say youll love and love me forever" },
        { time: 170, text: "Never stop never whatever" },
        { time: 172.1, text: "Near and far and always everywhere and everything" },
        { time: 176.9, text: "Say youll love and love me forever" },
        { time: 179.3, text: "Never stop never whatever" },
        { time: 181.5, text: "Near and far and always everywhere and everything"},
        { time: 186, text: "Say youll love and love me forever" },
        { time: 188.5, text: "Never stop never whatever" },
        { time: 190.6, text: "Near and far and always everywhere and everything" },
        { time: 204.1, text: "I love you always forever" },
        { time: 206.9, text: "Near or far closer together" },
        { time: 209.3, text: "Everywhere I will be with you" },
        { time: 210.5, text: "Everything I will do for you" },
        { time: 213.8, text: "I love you always forever" },
        { time: 216.2, text: "Near or far closer together" },
        { time: 218.5, text: "Everywhere I will be with you" },
        { time: 220.9, text: "Everything I will do for you" },
        { time: 223.3, text: "I love you always forever" },
        { time: 225.6, text: "Near or far closer together" },
        { time: 227.9, text: "Everywhere I will be with you" },
        { time: 230.2, text: "Everything I will do for you" },
        { time: 232.5, text: "I love you always forever" },
      ],
    },
    {
      title: "Evanescence - My Immortal",
      src: "music/myimmortal.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 12.8, text: "im so tired of being here" },
        { time: 18.4, text: "suppressed by all my childish fears" },
        { time: 25.2, text: "and if you have to leave" },
        { time: 28.5, text: "i wish that you would just leave" },
        { time: 32, text: "cause your presence still lingers here" },
        { time: 35.4, text: "and it wont leave me alone" },
        { time: 38.8, text: "these wounds wont seem to heal this pain is just too real" },
        { time: 45.3, text: "theres just too much that time cannot erase" },
        { time: 51.1, text: "when you cried id wipe away all of your tears" },
        { time: 57.5, text: "when youd scream id fight away all of your fears" },
        { time: 63.9, text: "and i held your hand through all of these years" },
        { time: 70.4, text: "but you still have all of me" },
        { time: 91.7, text: "you used to captivate me by your resonating light" },
        { time: 99, text: "now im bound by the life you left behind" },
        { time: 104.9, text: "your face it haunts my once pleasant dreams" },
        { time: 112, text: "your voice it chased away all the sanity in me" },
        { time: 118.6, text: "these wounds wont seem to heal this pain is just too real" },
        { time: 125.7, text: "theres just too much that time cannot erase" },
        { time: 131.2, text: "when you cried id wipe away all of your tears" },
        { time: 137.5, text: "when youd scream id fight away all of your fears" },
        { time: 143.9, text: "and I held your hand through all of these years" },
        { time: 150.6, text: "and you still have all of me" },
        { time: 160.1, text: "ive tried so hard to tell myself that youre gone" },
        { time: 172.1, text: "but though youre still with me ive been alone all along" },
        { time: 198.6, text: "when you cried id wipe away all of your tears" },
        { time: 205.4, text: "when youd scream id fight away all of your fears" },
        { time: 212, text: "i held your hand through all of these years" },
        { time: 218.1, text: "you still have all of me ah me ah me ah" },
      ],
    },
    {
      title: "Fools Garden - Lemon Tree",
      src: "music/lemontree.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>,<Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 12.3, text: "im sittin here in the boring room" },  
        { time: 16.8, text: "its just another rainy sunday afternoon" },
        { time: 20.2, text: "im wastin my time i got nothin to do" },
        { time: 23.5, text: "im hangin around im waitin for you" },
        { time: 26.8, text: "but nothing ever happens and i wonder" },
        { time: 31.5, text: "im drivin around in my car" },
        { time: 36.6, text: "im drivin too fast im drivin too far" },
        { time: 39.9, text: "id like to change my point of view" },
        { time: 43.1, text: "i feel so lonely im waitin for you" },
        { time: 46, text: "but nothing ever happens and i wonder" },
        { time: 52.1, text: "i wonder how i wonder why" },
        { time: 56.4, text: "yesterday you told me bout the blue blue sky" },
        { time: 59.4, text: "and all that i can see is just another lemon tree" },
        { time: 65.5, text: "im turnin my head up and down" },
        { time: 69.2, text: "im turnin turnin turnin turnin turnin around" },
        { time: 72.5, text: "and all that i can see is just another lemon tree" },
        { time: 78.3, text: "dah dah dah dah dah dah di dah dah" },
        { time: 84.6, text: "dah dah dah dah dah di dah dah" },
        { time: 88.1, text: "dah di di dah dah di di dah" },
        { time: 91.8, text: "im sittin here i missed the power" },
        { time: 95.7, text: "id like to go out takin a shower" },
        { time: 99, text: "but theres a heavy cloud inside my head" },
        { time: 102.2, text: "i feel so tired put myself into bed" },
        { time: 105.3, text: "well nothing ever happens and i wonder" },
        { time: 111.3, text: "isolation is not good for me" },
        { time: 118.5, text: "isolation i dont want to sit on the lemon tree" },
        { time: 125.5, text: "im steppin around in the desert of joy" },
        { time: 128.7, text: "maybe anyhow ill get another toy" },
        { time: 131.9, text: "and everything will happen" },
        { time: 134.7, text: "and you wonder" },
        { time: 137.8, text: "i wonder how i wonder why" },
        { time: 141.9, text: "yesterday you told me bout the blue blue sky" },
        { time: 145, text: "and all that i can see is just another lemon tree" },
        { time: 151.1, text: "im turnin my head up and down" },
        { time: 154.8, text: "im turnin turnin turnin turnin turnin around" },
        { time: 158, text: "and all that i can see is just another lemon tree" },
        { time: 162.8, text: "and i wonder wonder" },
        { time: 164.8, text: "i wonder how i wonder why" },
        { time: 168.2, text: "yesterday you told me bout the blue blue sky" },
        { time: 171.4, text: "and all that i can see" },
        { time: 174.2, text: "and all that i can see" },
        { time: 177.6, text: "and all that i can see" },
        { time: 180.2, text: "is just a yellow lemon tree" },
      ],
    },
    {
      title: "Toni Braxton - Unbreak my Heart",
      src: "music/unbreak.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>,<Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 20, text: "dont leave me in all this pain" },
        { time: 24.6, text: "dont leave me out in the rain" },
        { time: 28.9, text: "come back and bring back my smile" },
        { time: 32.2, text: "come and take these tears away" },
        { time: 37, text: "i need your arms to hold me now" },
        { time: 41, text: "the nights are so unkind" },
        { time: 45.8, text: "bring back those nights when i held you beside me" },
        { time: 52.2, text: "unbreak my heart" },
        { time: 56.4, text: "say youll love me again" },
        { time: 60.8, text: "undo this hurt you caused" },
        { time: 65, text: "when you walked out the door" },
        { time: 67.3, text: "and walked out of my life" },
        { time: 70, text: "uncry these tears" },
        { time: 74, text: "i cried so many nights" },
        { time: 78.3, text: "unbreak my heart" },
        { time: 84.5, text: "my heart" },
        { time: 89.6, text: "take back that sad word goodbye" },
        { time: 94.1, text: "bring back the joy to my life" },
        { time: 98.7, text: "dont leave me here with these tears" },
        { time: 102, text: "come and kiss this pain away" },
        { time: 106.6, text: "i cant forget the day you left" },
        { time: 110.8, text: "time is so unkind" },
        { time: 115.8, text: "and life is so cruel without you here beside me" },
        { time: 121.9, text: "unbreak my heart" },
        { time: 126.2, text: "say youll love me again" },
        { time: 130.8, text: "undo this hurt you caused" },
        { time: 134.3, text: "when you walked out the door" },
        { time: 136.9, text: "and walked out of my life" },
        { time: 139.3, text: "uncry these tears" },
        { time: 143.7, text: "i cried so many nights" },
        { time: 148.2, text: "unbreak my heart oh ooh" },
        { time: 175.6, text: "dont leave me in all this pain" },
        { time: 179.6, text: "dont leave me out in the rain" }, 
        { time: 183.9, text: "bring back the nights when i held you beside me" },
        { time: 189.8, text: "unbreak my heart" },
        { time: 194.1, text: "say youll love me again" },
        { time: 198.2, text: "undo this hurt you caused" },
        { time: 202, text: "when you walked out the door" },
        { time: 204.3, text: "and walked out of my life" },
        { time: 207.2, text: "uncry these tears" },
        { time: 211.4, text: "i cried so many many nights" },
        { time: 215.7, text: "oh unbreak my" },
        { time: 218.5, text: "unbreak my heart oh baby" },
        { time: 222.7, text: "come back and say you love me" },
        { time: 227.2, text: "unbreak my heart sweet darlin" },
        { time: 231.5, text: "without you i just cant go on" },
        { time: 243.1, text: "cant go on" },
      ],
    },
    {
      title: "Blue - All Rise",
      src: "music/allrise.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 0, text: "Instrumental" },
        { time: 6.7, text: "uh uh" },
        { time: 16.2, text: "uh uh" }, 
        { time: 19.3, text: "your honour please" }, 
        { time: 21.2, text: "gotta believe what I say" }, 
        { time: 24.1, text: "what i will tell" },
        { time: 26.1, text: "happened just the other day" }, 
        { time: 28.8, text: "i must confess" }, 
        { time: 31.2, text: "cause ive had about enough" }, 
        { time: 33.9, text: "i need your help" }, 
        { time: 36, text: "gotta make this here thing stop" }, 
        { time: 38.5, text: "baby i swear ill tell the truth" }, 
        { time: 43.2, text: "about all the things you used to do" },  
        { time: 47.8, text: "and if you thought you had me fooled" },  
        { time: 52.8, text: "im telling you now objection overruled oh baby" },  
        { time: 59, text: "one for the money and the free rides" },  
        { time: 61.5, text: "its two for the lie that you denied" },  
        { time: 64.1, text: "all rise all rise" },  
        { time: 68.9, text: "three for the calls youve been making" },  
        { time: 71.4, text: "its four all the times youve been faking" },  
        { time: 76.5, text: "all rise Im gonna tell it to your face" },  
        { time: 81, text: "all rise I rest my case" },  
        { time: 82.8, text: "youre on the stand" },  
        { time: 84.9, text: "with your back against the wall" },  
        { time: 87.8, text: "nowhere to run" },  
        { time: 89.7, text: "and nobody you can call oh no" },  
        { time: 92.8, text: "i just cant wait" },  
        { time: 94.8, text: "now the case is open wide" },  
        { time: 97.5, text: "youll try to pray" },  
        { time: 99.7, text: "but the jury will decide" },  
        { time: 102.2, text: "baby i swear ill tell the truth" },  
        { time: 106.8, text: "about all the things you used to do" },  
        { time: 111.4, text: "and if you thought you had me fooled" },  
        { time: 116.6, text: "im telling you objection overruled oh baby" },  
        { time: 122.7, text: "one for the money and the free rides" },  
        { time: 125.3, text: "its two for the lie that you denied" },  
        { time: 127.9, text: "all rise all rise" },  
        { time: 132.3, text: "three for the calls youve been making" },  
        { time: 134.9, text: "its four all the times youve been faking" },  
        { time: 137.6, text: "all rise Im gonna tell it to your face" },  
        { time: 140, text: "all rise I rest my case" },  
        { time: 142.5, text: "so step back cause you dont know this cat" },  
        { time: 145, text: "i know deep down that you dont want me to react" },  
        { time: 147.2, text: "ill lay low leavin all my options open" },  
        { time: 149.8, text: "the decision of the jury has not been spoken" },  
        { time: 152.2, text: "step in my house you find that your stuff is gone" },  
        { time: 154.5, text: "but in reality to whom does the stuff belong" },  
        { time: 157.1, text: "i bring you into court to preach my order" },  
        { time: 159.5, text: "and you know that you overstepped the border" }, 
        { time: 162.2, text: "one for the money and the free rides" },  
        { time: 164.5, text: "its two for the lie that you denied" },  
        { time: 167, text: "all rise all rise" },  
        { time: 171.7, text: "three for the calls youve been making" },  
        { time: 174, text: "its four all the times youve been faking" },  
        { time: 176.8, text: "all rise all rise" },  
        { time: 182.1, text: "one for the money and the free rides" },  
        { time: 184.2, text: "its two for the lie that you denied" },  
        { time: 186.7, text: "all rise all rise" },  
        { time: 191.3, text: "three for the calls youve been making" },  
        { time: 193.9, text: "its four all the times youve been faking" },  
        { time: 196.2, text: "all rise all rise" },  
        { time: 201.8, text: "one for the money and the free rides" },  
        { time: 203.8, text: "its two for the lie that you denied" },  
        { time: 206.3, text: "all rise all rise" },  
        { time: 211.1, text: "three for the calls youve been making" },  
        { time: 213.5, text: "its four all the times youve been faking" },  
        { time: 215.6, text: "all rise im gonna tell it to your face" },  
        { time: 218.7, text: "all rise i rest my case" },  
      ],
    },
    {
      title: "Ricky Martin - Livin' La Vida Loca",
      src: "music/lavidaloca.mp3",
      difficulty: [<Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>, <Star key="icon" fill="yellow" className="text-yellow-200"/>],
      lyrics: [
        { time: 10.6, text: "shes into superstitions" },
        { time: 13.7, text: "black cats and voodoo dolls" },
        { time: 16.2, text: "i feel a premonition" },
        { time: 19, text: "that girls gonna make me fall" },
        { time: 29.9, text: "shes into new sensations" },
        { time: 29.8, text: "new kicks in the candlelight" },
        { time: 32.3, text: "shes got a new addiction" },
        { time: 35.1, text: "for every day and night" },
        { time: 37.3, text: "shell make you take your clothes off and go dancing in the rain" },
        { time: 42.8, text: "shell make you live her crazy life but shell take away your pain" },
        { time: 48.1, text: "like a bullet to your brain" },
        { time: 51, text: "upside inside out" },
        { time: 53.6, text: "shes livin la vida loca" },
        { time: 56.3, text: "shell push and pull you down" },
        { time: 59, text: "livin la vida loca" },
        { time: 61.6, text: "her lips are devil red" },
        { time: 64.3, text: "and her skins the color mocha" },
        { time: 67, text: "she will wear you out" },
        { time: 69.8, text: "livin la vida loca" },
        { time: 72.6, text: "livin la vida loca" },
        { time: 75, text: "shes livin la vida loca" },
        { time: 89.2, text: "woke up in new york city" },
        { time: 91.8, text: "in a funky cheap hotel" },
        { time: 94.4, text: "she took my heart and she took my money" },
        { time: 97.1, text: "she mustve slipped me a sleeping pill" },
        { time: 99.6, text: "she never drinks the water and" },
        { time: 101, text: "makes you order french champagne" },
        { time: 105.2, text: "once youve had a taste of her" },
        { time: 107.3, text: "youll never be the same" },
        { time: 110.1, text: "shell make you go insane" },
        { time: 113.3, text: "upside inside out" },
        { time: 115.8, text: "shes livin la vida loca" },
        { time: 118.3, text: "shell push and pull you down" },
        { time: 121.1, text: "livin la vida loca" },
        { time: 123.7, text: "her lips are devil red" },
        { time: 126.4, text: "and her skins the color mocha" },
        { time: 129.3, text: "she will wear you out" },
        { time: 131.8, text: "livin la vida loca" },
        { time: 134.6, text: "livin la vida loca" },
        { time: 137.2, text: "shes livin la vida loca" },
        { time: 150.5, text: "shell make you take your clothes off and go dancing in the rain" },
        { time: 156.5, text: "shell make you live her crazy life but shell take away your pain" },
        { time: 161.1, text: "like a bullet to your brain" },
        { time: 164.2, text: "upside inside out" },
        { time: 166.9, text: "shes livin la vida loca" },
        { time: 169.5, text: "shell push and pull you down" },
        { time: 172.3, text: "livin la vida loca" },
        { time: 174.9, text: "her lips are devil red" },
        { time: 177.5, text: "and her skins the color mocha" },
        { time: 180.4, text: "she will wear you out" },
        { time: 183.2, text: "livin la vida loca" },
        { time: 186, text: "upside inside out" },
        { time: 188.5, text: "shes livin la vida loca" },
        { time: 191.2, text: "shell push and pull you down" },
        { time: 194, text: "livin la vida loca" },
        { time: 196.6, text: "her lips are devil red" },
        { time: 199.2, text: "and her skins the color mocha" },
        { time: 202.1, text: "she will wear you out" },
        { time: 204.8, text: "livin la vida loca" },
        { time: 207.5, text: "livin la vida loca" },
        { time: 210, text: "shes livin la vida loca" },
        { time: 230.7, text: "gotta la vida loca" },
        { time: 234, text: "gotta gotta gotta la vida loca" },
        { time: 237.1, text: "gotta gotta gotta la vi" },
      ],
    },
    {
      title: "UNREAL KEYGOD",
      src: "music/keygod.mp3",
      difficulty: [<Skull key="icon" className="text-red-500" />],
      lyrics: [
        { time: 6.2, text: "fill em with the venom and eliminate em other words i minute maid em" }, 
        { time: 8.1, text: "i dont wanna hurt em but i did im in a fit of rage im murderin again nobody will evade" },
        { time: 10.4, text: "im finna kill em and dump all their fuckin bodies in the lake" },
        { time: 12, text: "obliteratin everythin incinerate a renegade" },
        { time: 13.4, text: "im here to make anybody who want it with the pen afraid" },
        { time: 14.9, text: "but dont nobody want it but theyre gonna get it anyway" },
        { time: 16.3, text: "cause im beginnin to feel like im mentally ill" },
        { time: 17.6, text: "im attila kill or be killed im a killer bee the vanilla gorilla" },
        { time: 19.3, text: "you bringin the killer within me outta me" },
        { time: 20.5, text: "you dont wanna be the enemy of the demon who entered me" },
        { time: 22, text: "and be on the receivin end of me what stupidity itd be" },
        { time: 23.4, text: "every bit of mes the epitome of a spitter" },
        { time: 24.8, text: "when im in the vicinity motherfucker you better duck" },
        { time: 26.3, text: "or you finna be dead the minute you run into me" },
        { time: 27.5, text: "a hunnid percent of you is a fifth of a percent of me" },
        { time: 28.8, text: "im bout to fuckin finish you bitch im unfadable" },
        { time: 30.3, text: "you wanna battle im available im blowin up like an inflatable" },
        { time: 32.1, text: "im undebatable im unavoidable im unevadable" },
        { time: 33.6, text: "im on the toilet bowl i got a trailer full of money" },
        { time: 35.1, text: "and im paid in full im not afraid to pull a" },
        { time: 36.1, text: "man stop look what im plannin haha" },
      ],
    },
  ];


  useEffect(() => {
    if (selectedSong) {
      audioRef.current.src = selectedSong.src;
      audioRef.current.volume = 0.1;
      audioRef.current.onended = () => setIsPlaying(false);
    }

    return () => {
      stopAudio(); 
    };
  }, [selectedSong]);

  useEffect(() => {
    const stopAudioOnUnload = () => stopAudio();

 
    window.addEventListener("beforeunload", stopAudioOnUnload);
    return () => window.removeEventListener("beforeunload", stopAudioOnUnload);
  }, []);

  useEffect(() => {
    return () => stopAudio(); 
  }, [navigate]); 

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          return time + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (selectedSong && isPlaying) {
      const updateLyrics = () => {
        const time = audioRef.current.currentTime;
        setCurrentTime(time);
        const currentIndex = selectedSong.lyrics.findIndex(
          (lyric, index) =>
            time >= lyric.time &&
            (!selectedSong.lyrics[index + 1] ||
              time < selectedSong.lyrics[index + 1].time)
        );
        if (currentIndex !== currentLyricIndex) {
          setCurrentLyricIndex(currentIndex);
          setInputValue(""); // Clear input when new lyric appears
        }
      };
      const interval = setInterval(updateLyrics, 100);
      return () => clearInterval(interval);
    }
  }, [selectedSong, isPlaying, currentLyricIndex]);

  const handleInput = (event) => {
    const newValue = event.target.value.toLowerCase();
    const currentLyric = getCurrentLyric().text.toLowerCase();
    
    // Erstelle Sets für die Wörter
    const lyricWords = new Set(currentLyric.split(/\s+/));
    const oldInputWords = new Set(inputValue.toLowerCase().trim().split(/\s+/));
    const newInputWords = new Set(newValue.trim().split(/\s+/));
    
    // Zähle neue korrekte Wörter
    let newCorrectWords = 0;
    for (const word of newInputWords) {
      if (lyricWords.has(word) && !oldInputWords.has(word)) {
        newCorrectWords++;
      }
    }
    
    // Erhöhe den Score für neue korrekte Wörter
    if (newCorrectWords > 0) {
      setScore(prevScore => prevScore + newCorrectWords);
    }
    
    setInputValue(newValue);
  };

  const getCurrentLyric = () => {
    const currentLyric = selectedSong.lyrics.reduce((prev, curr) => {
      if (curr.time <= currentTime) return curr;
      return prev;
    }, selectedSong.lyrics[0]);
    return currentLyric;
  };

  const getNextLyric = () => {
    const nextLyric = selectedSong.lyrics.find((lyric) => lyric.time > currentTime);
    return nextLyric || selectedSong.lyrics[0];
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    setScore(0);
    setInputValue("");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  /* Song-Auswahl */
  if (!selectedSong)
    return (
      <div className="w-1/2 mb-5 rounded-lg border-1 border-black bg-gradient-to-br from-gray-900 to-gray-700 opacity-75 text-white mx-auto mt-10 shadow-[0_0px_50px_10px_rgb(0,0,0,0.8)] shadow-fuchsia-950">
                <h2 className="text-amber-100 text-4xl font-semibold text-center mt-4 mb-2">Karaoke Game</h2>
        <div className="grid w-full grid-cols-2 gap-4 p-5 mb-3"> 
        {songs.map((song) => (
          <button
            key={song.title}
            onClick={() => setSelectedSong(song)}
            className="flex flex-col justify-center p-3 bg-gradient-to-br from-black to-gray-900 border-1 border-black rounded-2xl shadow-fuchsia-900 shadow-md hover:scale-104 hover:shadow-lg transition-all mb-2"
          >
            {song.title}
            <div className="flex justify-center m-1">
              {song.difficulty}
            </div>
          </button>
        ))}
      </div>
    </div>
    );

  return (
    <div className="w-1/2 h-1/2 mx-auto">
    <div className="bg-gradient-to-br from-gray-900 to-gray-700 opacity-75 rounded-lg mt-25 p-5 shadow-[0_0px_50px_10px_rgb(0,0,0,0.8)] border border-black">
      {/* Audio player */}
      <audio
        ref={audioRef}
        src={selectedSong.src}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Lyrics display */}
      <div className="space-y-6 mb-8">
        <div className="text-4xl font-bold text-center">
          <div className="text-white mb-2">{getCurrentLyric().text}</div>
          <div className="text-gray-500 text-2xl">{getNextLyric().text}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handlePlay}
          className="p-3 bg-fuchsia-700 rounded-full hover:bg-fuchsia-500 transition-colors"
        >
          <Play className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handlePause}
          className="p-3 bg-gray-900 rounded-full hover:bg-gray-600 transition-colors"
        >
          <Pause className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-900 rounded-full hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Text-Input */}
      <div className="flex justify-center my-8 mx-auto ">
        <input
          value={inputValue}
          onChange={handleInput}
          type="text"
          className="bg-gray-700 border-gray-600 text-white w-1/2 h-10 rounded focus:border-fuchsia-500 focus:outline-none border-1 p-3"
        />
      </div>

      {/* High score */}
        <div className="text-center text-white">Score: {score}</div>
        {/* back button */}
        <div className="w-full">
          <button
            onClick={() => { setSelectedSong(""), handleReset() }}
            className="flex justify-self-center m-2 p-2 bg-gray-900  text-white rounded hover:bg-gray-600 transition-colors"
          >zur Songauswahl</button>
      </div>
      </div>
    </div>

  );
};

export default KaraokeTrainer;
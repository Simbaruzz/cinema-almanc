import { useState, useRef, useEffect, useCallback, useMemo } from "react";

const FILMS = [
  { id:1, title:"2001: A Space Odyssey", director:"Stanley Kubrick", year:1968, rating:8.3, plot:"A mysterious monolith influences human evolution while astronauts travel to Jupiter guided by HAL 9000.", quotes:['Roger Ebert: "More an experience than a narrative."','The New York Times: "Hypnotic and philosophically ambitious."'], cast:[{actor:"Keir Dullea",role:"Dave Bowman"},{actor:"Gary Lockwood",role:"Frank Poole"}], color:"#1a1a2e" },
  { id:2, title:"A Clockwork Orange", director:"Stanley Kubrick", year:1971, rating:8.3, plot:"In a dystopian future a violent youth undergoes experimental treatment meant to eliminate his criminal tendencies.", quotes:['Roger Ebert: "A disturbing satire about violence and free will."','The Guardian: "A bold dystopian vision."'], cast:[{actor:"Malcolm McDowell",role:"Alex DeLarge"}], color:"#16213e" },
  { id:3, title:"The Godfather", director:"Francis Ford Coppola", year:1972, rating:9.2, plot:"A crime drama about the powerful Corleone mafia family and the transformation of Michael Corleone from a reluctant outsider into a ruthless leader.", quotes:['Roger Ebert: "Not simply a gangster movie; it is about power, loyalty and family."','Pauline Kael: "Coppola transforms pulp into something operatic."'], cast:[{actor:"Marlon Brando",role:"Vito Corleone"},{actor:"Al Pacino",role:"Michael Corleone"},{actor:"James Caan",role:"Sonny Corleone"}], color:"#1a1a1a" },
  { id:4, title:"The Godfather Part II", director:"Francis Ford Coppola", year:1974, rating:9.0, plot:"The film contrasts the rise of young Vito Corleone with the moral decline of his son Michael as he consolidates power.", quotes:['Roger Ebert: "A sequel that deepens the tragedy."','Gene Siskel: "Two parallel histories reveal the true cost of power."'], cast:[{actor:"Al Pacino",role:"Michael Corleone"},{actor:"Robert De Niro",role:"Young Vito Corleone"},{actor:"Robert Duvall",role:"Tom Hagen"}], color:"#0f0f0f" },
  { id:5, title:"Barry Lyndon", director:"Stanley Kubrick", year:1975, rating:8.1, plot:"An ambitious Irish adventurer climbs European society through deception and marriage.", quotes:['Roger Ebert: "A film that resembles classical paintings."','The Guardian: "Extraordinary visual beauty."'], cast:[{actor:"Ryan O'Neal",role:"Barry Lyndon"}], color:"#2d3436" },
  { id:6, title:"Mirror", director:"Andrei Tarkovsky", year:1975, rating:8.0, plot:"A nonlinear autobiographical film exploring memory, childhood and history.", quotes:['The Guardian: "A deeply personal film about memory."','Film Comment: "Cinema as poetry."'], cast:[{actor:"Margarita Terekhova",role:"Mother"}], color:"#1e272e" },
  { id:7, title:"Taxi Driver", director:"Martin Scorsese", year:1976, rating:8.2, plot:"A lonely and mentally unstable taxi driver becomes increasingly disturbed by the crime and moral decay around him.", quotes:['Roger Ebert: "A portrait of urban loneliness and alienation."','Pauline Kael: "The city becomes a fever dream."'], cast:[{actor:"Robert De Niro",role:"Travis Bickle"},{actor:"Jodie Foster",role:"Iris"}], color:"#2c2c54" },
  { id:8, title:"Alien", director:"Ridley Scott", year:1979, rating:8.5, plot:"A space crew encounters a deadly alien organism aboard their spacecraft.", quotes:['Roger Ebert: "A masterclass in suspense."','The Guardian: "Science fiction fused with horror."'], cast:[{actor:"Sigourney Weaver",role:"Ripley"}], color:"#0a3d62" },
  { id:9, title:"Apocalypse Now", director:"Francis Ford Coppola", year:1979, rating:8.4, plot:"A U.S. Army officer travels upriver during the Vietnam War to eliminate a renegade colonel.", quotes:['Roger Ebert: "A hypnotic descent into the madness of war."','Time: "One of the most ambitious war films ever made."'], cast:[{actor:"Martin Sheen",role:"Captain Willard"},{actor:"Marlon Brando",role:"Colonel Kurtz"}], color:"#1B1B2F" },
  { id:10, title:"Stalker", director:"Andrei Tarkovsky", year:1979, rating:8.1, plot:"A guide leads two men into a mysterious zone where a room can grant their deepest wishes.", quotes:['Roger Ebert: "A haunting philosophical journey."','The Guardian: "Hypnotic slow cinema."'], cast:[{actor:"Alexander Kaidanovsky",role:"Stalker"}], color:"#1e3d2f" },
  { id:11, title:"Raging Bull", director:"Martin Scorsese", year:1980, rating:8.1, plot:"The story of boxer Jake LaMotta, whose violent temper destroys his relationships and career.", quotes:['Roger Ebert: "A painful portrait of self-destruction."','Chicago Tribune: "Boxing as psychological drama."'], cast:[{actor:"Robert De Niro",role:"Jake LaMotta"},{actor:"Joe Pesci",role:"Joey LaMotta"}], color:"#2d1f2f" },
  { id:12, title:"The Shining", director:"Stanley Kubrick", year:1980, rating:8.4, plot:"A writer takes a winter caretaker job at an isolated hotel where supernatural forces drive him into madness.", quotes:['Roger Ebert: "Kubrick builds dread through atmosphere."','Empire: "Nicholson\'s performance became iconic."'], cast:[{actor:"Jack Nicholson",role:"Jack Torrance"},{actor:"Shelley Duvall",role:"Wendy Torrance"}], color:"#1a1a2e" },
  { id:13, title:"Blade Runner", director:"Ridley Scott", year:1982, rating:8.1, plot:"A detective hunts rogue bioengineered humans in a futuristic dystopian Los Angeles.", quotes:['Roger Ebert: "A visionary science-fiction film."','The Guardian: "A defining cyberpunk aesthetic."'], cast:[{actor:"Harrison Ford",role:"Rick Deckard"}], color:"#0c2461" },
  { id:14, title:"Come and See", director:"Elem Klimov", year:1985, rating:8.4, plot:"A Belarusian boy witnesses the horrors of Nazi occupation during World War II.", quotes:['Roger Ebert: "One of the most devastating war films."','The Guardian: "War portrayed with unbearable intensity."'], cast:[{actor:"Aleksei Kravchenko",role:"Flyora"}], color:"#1e1e1e" },
  { id:15, title:"Blue Velvet", director:"David Lynch", year:1986, rating:7.7, plot:"A college student uncovers a dark criminal underworld hidden beneath suburban life.", quotes:['Roger Ebert: "A disturbing look beneath suburban calm."','The Guardian: "Lynch reveals darkness beneath normal life."'], cast:[{actor:"Kyle MacLachlan",role:"Jeffrey Beaumont"}], color:"#0a1931" },
  { id:16, title:"Goodfellas", director:"Martin Scorsese", year:1990, rating:8.7, plot:"The rise and fall of mob associate Henry Hill as he becomes deeply involved in organized crime.", quotes:['Roger Ebert: "The best mob film since The Godfather."','The Guardian: "Crime life portrayed as intoxicating and terrifying."'], cast:[{actor:"Ray Liotta",role:"Henry Hill"},{actor:"Robert De Niro",role:"Jimmy Conway"},{actor:"Joe Pesci",role:"Tommy DeVito"}], color:"#1a1a2e" },
  { id:17, title:"Pulp Fiction", director:"Quentin Tarantino", year:1994, rating:8.9, plot:"Several interconnected stories of criminals in Los Angeles unfold in a nonlinear narrative.", quotes:['Roger Ebert: "A movie that reinvented the crime genre."','The New York Times: "Dialogue full of energy and wit."'], cast:[{actor:"John Travolta",role:"Vincent Vega"},{actor:"Samuel L. Jackson",role:"Jules Winnfield"},{actor:"Uma Thurman",role:"Mia Wallace"}], color:"#2d1f2f" },
  { id:18, title:"Fargo", director:"Joel & Ethan Coen", year:1996, rating:8.1, plot:"A botched kidnapping in Minnesota leads to a chain of violent and absurd events.", quotes:['Roger Ebert: "Violence and absurd humor collide."','The Guardian: "A crime story told with dry wit."'], cast:[{actor:"Frances McDormand",role:"Marge Gunderson"}], color:"#1e272e" },
  { id:19, title:"Princess Mononoke", director:"Hayao Miyazaki", year:1997, rating:8.3, plot:"A young warrior becomes involved in a conflict between humans and forest spirits.", quotes:['Roger Ebert: "Epic animation with environmental themes."','The Guardian: "Visually stunning and morally complex."'], cast:[{actor:"Yōji Matsuda",role:"Ashitaka"}], color:"#1a3c1a" },
  { id:20, title:"The Big Lebowski", director:"Joel & Ethan Coen", year:1998, rating:8.1, plot:'A laid-back slacker known as "The Dude" becomes entangled in a bizarre kidnapping scheme.', quotes:['Roger Ebert: "A shaggy comic mystery."','The Guardian: "A cult classic of eccentric humor."'], cast:[{actor:"Jeff Bridges",role:"The Dude"}], color:"#2d2d1f" },
  { id:21, title:"Magnolia", director:"Paul Thomas Anderson", year:1999, rating:8.0, plot:"Multiple interconnected stories unfold over a single day in Los Angeles.", quotes:['Roger Ebert: "A daring mosaic of intersecting lives."','The Guardian: "Ambitious and emotionally raw."'], cast:[{actor:"Tom Cruise",role:"Frank T.J. Mackey"}], color:"#1f2d1f" },
  { id:22, title:"Gladiator", director:"Ridley Scott", year:2000, rating:8.5, plot:"A Roman general seeks revenge against the corrupt emperor who murdered his family.", quotes:['Roger Ebert: "A spectacular historical epic."','The Guardian: "Revived the ancient Roman blockbuster."'], cast:[{actor:"Russell Crowe",role:"Maximus"}], color:"#2d1f1f" },
  { id:23, title:"Amélie", director:"Jean-Pierre Jeunet", year:2001, rating:8.3, plot:"A shy Parisian woman secretly improves the lives of the people around her.", quotes:['Roger Ebert: "A whimsical celebration of kindness."','The Guardian: "Paris rendered as a magical playground."'], cast:[{actor:"Audrey Tautou",role:"Amélie"}], color:"#2d1f2d" },
  { id:24, title:"Mulholland Drive", director:"David Lynch", year:2001, rating:7.9, plot:"A young actress arrives in Hollywood and becomes involved in a mystery that blurs dream and reality.", quotes:['Roger Ebert: "Dream logic replaces traditional narrative."','The Guardian: "Hypnotic and mysterious."'], cast:[{actor:"Naomi Watts",role:"Betty"}], color:"#162032" },
  { id:25, title:"Spirited Away", director:"Hayao Miyazaki", year:2001, rating:8.6, plot:"A young girl enters a magical spirit world where she must work to save her parents.", quotes:['Roger Ebert: "A wondrous animated fantasy."','The Guardian: "Imagination and emotion combine beautifully."'], cast:[{actor:"Rumi Hiiragi",role:"Chihiro"}], color:"#1a2d3d" },
  { id:26, title:"City of God", director:"Fernando Meirelles", year:2002, rating:8.6, plot:"A young photographer grows up amid violent gang conflicts in Rio de Janeiro.", quotes:['Roger Ebert: "Explosive storytelling."','The Guardian: "A powerful portrait of the favelas."'], cast:[{actor:"Alexandre Rodrigues",role:"Rocket"}], color:"#2d2a1f" },
  { id:27, title:"Kill Bill Vol.1", director:"Quentin Tarantino", year:2003, rating:8.2, plot:"A former assassin known as The Bride seeks revenge against the team of killers who betrayed her.", quotes:['Roger Ebert: "A dazzling martial-arts homage."','Empire: "Stylized action turned into spectacle."'], cast:[{actor:"Uma Thurman",role:"The Bride"}], color:"#2d1f1a" },
  { id:28, title:"Memories of Murder", director:"Bong Joon-ho", year:2003, rating:8.1, plot:"Detectives investigate a series of murders in rural South Korea with limited evidence.", quotes:['Roger Ebert: "A haunting crime story."','The Guardian: "Dark humor mixes with dread."'], cast:[{actor:"Song Kang-ho",role:"Detective Park"}], color:"#1e2e1e" },
  { id:29, title:"No Country for Old Men", director:"Joel & Ethan Coen", year:2007, rating:8.2, plot:"A hunter discovers drug money in the desert and becomes the target of a relentless hitman.", quotes:['Roger Ebert: "A relentless thriller with philosophical depth."','The Guardian: "A chilling modern western."'], cast:[{actor:"Javier Bardem",role:"Anton Chigurh"}], color:"#1a1a1a" },
  { id:30, title:"There Will Be Blood", director:"Paul Thomas Anderson", year:2007, rating:8.2, plot:"An ambitious oil prospector builds a fortune while his obsession with power corrupts him.", quotes:['Roger Ebert: "A towering performance anchors a bleak epic."','The Guardian: "A dark story of ambition."'], cast:[{actor:"Daniel Day-Lewis",role:"Daniel Plainview"}], color:"#1f1a1a" },
  { id:31, title:"The Dark Knight", director:"Christopher Nolan", year:2008, rating:9.0, plot:"Batman faces the Joker, a chaotic criminal mastermind who seeks to plunge Gotham City into anarchy.", quotes:['Roger Ebert: "A superhero film that transcends its genre."','The Guardian: "Ledger\'s Joker is unforgettable."'], cast:[{actor:"Christian Bale",role:"Batman"},{actor:"Heath Ledger",role:"Joker"}], color:"#0a0a1a" },
  { id:32, title:"Inglourious Basterds", director:"Quentin Tarantino", year:2009, rating:8.4, plot:"A group of Jewish soldiers plot revenge against Nazi leaders during an alternate World War II.", quotes:['Roger Ebert: "An audacious alternate history."','The Guardian: "Christoph Waltz delivers a mesmerizing performance."'], cast:[{actor:"Brad Pitt",role:"Aldo Raine"},{actor:"Christoph Waltz",role:"Hans Landa"}], color:"#1a2a1a" },
  { id:33, title:"Inception", director:"Christopher Nolan", year:2010, rating:8.8, plot:"A thief who steals secrets through dream-sharing technology is hired to plant an idea in someone's mind.", quotes:['Roger Ebert: "A labyrinth of dreams."','Empire: "Spectacular and intellectually playful."'], cast:[{actor:"Leonardo DiCaprio",role:"Dom Cobb"}], color:"#1a1a2a" },
  { id:34, title:"The Tree of Life", director:"Terrence Malick", year:2011, rating:6.8, plot:"A poetic reflection on childhood, family and the origins of life in the universe.", quotes:['Roger Ebert: "A poetic meditation on existence."','The Guardian: "Visually stunning and ambitious."'], cast:[{actor:"Brad Pitt",role:"Mr. O'Brien"}], color:"#2a2a1a" },
  { id:35, title:"The Master", director:"Paul Thomas Anderson", year:2012, rating:7.1, plot:"A troubled war veteran becomes involved with a charismatic leader of a mysterious movement.", quotes:['The Guardian: "Hypnotic performances drive the film."','Variety: "A psychological drama of belief and power."'], cast:[{actor:"Joaquin Phoenix",role:"Freddie Quell"}], color:"#1a2a2a" },
  { id:36, title:"Interstellar", director:"Christopher Nolan", year:2014, rating:8.7, plot:"Astronauts travel through a wormhole in search of a new habitable planet for humanity.", quotes:['The Guardian: "A majestic science-fiction epic."','Variety: "A visually overwhelming journey."'], cast:[{actor:"Matthew McConaughey",role:"Cooper"}], color:"#0a1a2a" },
  { id:37, title:"La La Land", director:"Damien Chazelle", year:2016, rating:8.0, plot:"A jazz musician and an aspiring actress pursue their dreams in Los Angeles while falling in love.", quotes:['Roger Ebert.com: "A joyful modern musical."','The Guardian: "A romantic tribute to classic Hollywood."'], cast:[{actor:"Ryan Gosling",role:"Sebastian"},{actor:"Emma Stone",role:"Mia"}], color:"#2a1a2a" },
  { id:38, title:"The Irishman", director:"Martin Scorsese", year:2019, rating:7.8, plot:"A mob hitman reflects on his decades-long involvement with organized crime and his relationship with Jimmy Hoffa.", quotes:['A.O. Scott: "A reflective gangster epic about loyalty and aging."','The Guardian: "Scorsese revisits the mythology of the mob."'], cast:[{actor:"Robert De Niro",role:"Frank Sheeran"},{actor:"Al Pacino",role:"Jimmy Hoffa"}], color:"#1a1a1a" },
  { id:39, title:"Parasite", director:"Bong Joon-ho", year:2019, rating:8.5, plot:"A poor family infiltrates the household of a wealthy family with unexpected and tragic consequences.", quotes:['A.O. Scott: "A genre-defying masterpiece."','The Guardian: "Thrilling social satire."'], cast:[{actor:"Song Kang-ho",role:"Kim Ki-taek"}], color:"#1e1e2e" },
  { id:40, title:"Oppenheimer", director:"Christopher Nolan", year:2023, rating:8.3, plot:"A biographical drama about physicist J. Robert Oppenheimer and the development of the atomic bomb.", quotes:['The Guardian: "A monumental historical drama."','Variety: "A powerful portrait of scientific ambition."'], cast:[{actor:"Cillian Murphy",role:"J. Robert Oppenheimer"}], color:"#1a0a0a" },
];

const DIR_INFO = {"Andrei Tarkovsky":"1932 – 1986","Bong Joon-ho":"1969 — …","Christopher Nolan":"1970 — …","Damien Chazelle":"1985 — …","David Lynch":"1946 – 2025","Elem Klimov":"1933 – 2003","Fernando Meirelles":"1955 — …","Francis Ford Coppola":"1939 — …","Hayao Miyazaki":"1941 — …","Jean-Pierre Jeunet":"1953 — …","Joel & Ethan Coen":"1954 / 1957 — …","Martin Scorsese":"1942 — …","Paul Thomas Anderson":"1970 — …","Quentin Tarantino":"1963 — …","Ridley Scott":"1937 — …","Stanley Kubrick":"1928 – 1999","Terrence Malick":"1943 — …"};

const dF={},aFF={};
const allD=new Set(),allA=new Set(),allY=new Set();
FILMS.forEach(f=>{
  allY.add(f.year);allD.add(f.director);
  if(!dF[f.director])dF[f.director]=[];dF[f.director].push(f);
  f.cast.forEach(({actor})=>{allA.add(actor);if(!aFF[actor])aFF[actor]=[];aFF[actor].push(f);});
});
Object.values(dF).forEach(a=>a.sort((x,y)=>x.year-y.year));
Object.values(aFF).forEach(a=>a.sort((x,y)=>x.year-y.year));
const sD=[...allD].sort(),sA=[...allA].sort(),sY=[...allY].sort((a,b)=>a-b);
const yF={};FILMS.forEach(f=>{if(!yF[f.year])yF[f.year]=[];yF[f.year].push(f);});

export default function App(){
  const [mode,setMode]=useState("main");
  const [activeFilm,setActiveFilm]=useState(null);
  const [ad,setAd]=useState(null);
  const [aa,setAa]=useState(null);
  const [hf,setHf]=useState(null);
  const [hd,setHd]=useState(null);
  const [ha,setHa]=useState(null);
  const [hy,setHy]=useState(null); // hovered year
  const [si,setSi]=useState(0);
  const [stk,setStk]=useState([]);
  const snapR=useRef(null);
  const scrollR=useRef(null);
  const [logoS,setLogoS]=useState(false);
  const scrollTimer=useRef(null);
  const [hz,setHz]=useState(null); // hover zone: "dirs"|"bars"|"acts"|null
  const OC="#d4803a"; // orange accent for active items

  const push=useCallback(n=>{
    setStk(s=>[...s,{mode,af:activeFilm,ad,aa,si}]);
    if('mode'in n)setMode(n.mode);if('af'in n)setActiveFilm(n.af);
    if('ad'in n)setAd(n.ad);if('aa'in n)setAa(n.aa);
    if('si'in n)setSi(n.si);
    setHf(null);setHd(null);setHa(null);setHy(null);
  },[mode,activeFilm,ad,aa,si]);

  const goBack=useCallback(()=>{
    if(!stk.length){goHome();return;}
    const p=stk[stk.length-1];setStk(s=>s.slice(0,-1));
    setMode(p.mode);setActiveFilm(p.af);setAd(p.ad);setAa(p.aa);setSi(p.si);
    setHf(null);setHd(null);setHa(null);setHy(null);
  },[stk]);

  const goHome=useCallback(()=>{
    setMode("main");setActiveFilm(null);setAd(null);setAa(null);
    setHf(null);setHd(null);setHa(null);setHy(null);setStk([]);setSi(0);
    setLogoS(false);
    // Scroll main timeline to top
    setTimeout(()=>{if(scrollR.current)scrollR.current.scrollTo({top:0,behavior:"smooth"});},50);
  },[]);

  const openDir=useCallback(d=>{push({mode:"director",ad:d,aa:null,af:null,si:0});setSi(0);},[push]);
  const openAct=useCallback(a=>{push({mode:"actor",aa:a,ad:null,af:null,si:0});setSi(0);},[push]);

  // Exit snap mode but stay at the current film's position
  const exitSnap=useCallback((filmToStayAt)=>{
    const f=filmToStayAt||activeFilm;
    setActiveFilm(null);
    if(f){
      // After React re-renders without snap, scroll to the film
      requestAnimationFrame(()=>{
        setTimeout(()=>{
          const el=document.getElementById(`f-${f.id}`);
          if(el)el.scrollIntoView({block:"start"});
        },30);
      });
    }
  },[activeFilm]);

  const openFilmInMain=useCallback(f=>{
    setStk([]);setMode("main");setActiveFilm(f);setAd(null);setAa(null);
    setHf(null);setHd(null);setHa(null);setHy(null);setSi(0);
    setTimeout(()=>{const el=document.getElementById(`f-${f.id}`);el&&el.scrollIntoView({behavior:"smooth",block:"start"});},100);
  },[]);

  useEffect(()=>{
    const el=scrollR.current;if(!el)return;
    const h=()=>setLogoS(el.scrollTop>50);
    el.addEventListener("scroll",h);return()=>el.removeEventListener("scroll",h);
  },[mode,activeFilm]);

  const onMainScroll=useCallback(()=>{
    if(!activeFilm||!scrollR.current||mode!=="main")return;
    if(scrollTimer.current)clearTimeout(scrollTimer.current);
    scrollTimer.current=setTimeout(()=>{
      const c=scrollR.current;if(!c)return;
      // Find which slide is most visible by checking each element's position
      const slides=c.querySelectorAll('[data-film-id]');
      let best=null,bestDist=Infinity;
      slides.forEach(el=>{
        const rect=el.getBoundingClientRect();
        const cRect=c.getBoundingClientRect();
        const dist=Math.abs(rect.top-cRect.top);
        if(dist<bestDist){bestDist=dist;best=el.getAttribute('data-film-id');}
      });
      if(best){const nf=FILMS.find(f=>String(f.id)===best);if(nf&&nf.id!==activeFilm?.id)setActiveFilm(nf);}
    },80);
  },[activeFilm,mode]);

  const sub=useMemo(()=>{
    if(mode==="director"&&ad)return dF[ad]||[];
    if(mode==="actor"&&aa)return aFF[aa]||[];
    return[];
  },[mode,ad,aa]);
  const cur=sub[si]||null;

  const onSubSnap=useCallback(()=>{
    if(!snapR.current)return;
    const i=Math.round(snapR.current.scrollTop/snapR.current.clientHeight);
    if(i>=0&&i<sub.length&&i!==si)setSi(i);
  },[si,sub.length]);

  // Is someone being cross-hovered in sub mode or snap mode?
  const isSnap=mode==="main"&&activeFilm!==null;
  const crossHover = (mode==="director"&&(ha||(hd&&hd!==ad)||hy)) || (mode==="actor"&&(hd||(ha&&ha!==aa)||hy)) || (isSnap&&(hd||ha||hy));

  const hl=useMemo(()=>{
    if(mode==="main"){
      // Director/actor/year hover takes priority over activeFilm
      if(hd){const df=dF[hd]||[];const as=new Set();df.forEach(f=>f.cast.forEach(c=>as.add(c.actor)));return{fi:new Set(df.map(f=>f.id)),di:new Set([hd]),ai:as,yi:new Set(df.map(f=>f.year)),ro:{}};}
      if(ha){const af2=aFF[ha]||[];return{fi:new Set(af2.map(f=>f.id)),di:new Set(af2.map(f=>f.director)),ai:new Set([ha]),yi:new Set(af2.map(f=>f.year)),ro:{}};}
      if(hy){const yf=yF[hy]||[];const ds=new Set();const as=new Set();yf.forEach(f=>{ds.add(f.director);f.cast.forEach(c=>as.add(c.actor))});return{fi:new Set(yf.map(f=>f.id)),di:ds,ai:as,yi:new Set([hy]),ro:{}};}
      const s=hf||activeFilm;
      if(s)return{fi:new Set([s.id]),di:new Set([s.director]),ai:new Set(s.cast.map(c=>c.actor)),yi:new Set([s.year]),ro:Object.fromEntries(s.cast.map(c=>[c.actor,c.role]))};
      return null;
    }
    if(!cur)return null;
    // Cross-hover: year
    if(hy){const yf=yF[hy]||[];const ds=new Set();const as=new Set();yf.forEach(f=>{ds.add(f.director);f.cast.forEach(c=>as.add(c.actor))});return{fi:new Set(yf.map(f=>f.id)),di:ds,ai:as,yi:new Set([hy]),ro:{}};}
    // Cross-hover in director mode: hover actor → show actor's full branch
    if(mode==="director"&&ha){
      const af2=aFF[ha]||[];
      return{fi:new Set(af2.map(f=>f.id)),di:new Set(af2.map(f=>f.director)),ai:new Set([ha]),yi:new Set(af2.map(f=>f.year)),ro:{}};
    }
    // Cross-hover in director mode: hover another director
    if(mode==="director"&&hd&&hd!==ad){
      const df=dF[hd]||[];const as=new Set();df.forEach(f=>f.cast.forEach(c=>as.add(c.actor)));
      return{fi:new Set(df.map(f=>f.id)),di:new Set([hd]),ai:as,yi:new Set(df.map(f=>f.year)),ro:{}};
    }
    // Cross-hover in actor mode: hover director → show director's full branch
    if(mode==="actor"&&hd){
      const df=dF[hd]||[];const as=new Set();df.forEach(f=>f.cast.forEach(c=>as.add(c.actor)));
      return{fi:new Set(df.map(f=>f.id)),di:new Set([hd]),ai:as,yi:new Set(df.map(f=>f.year)),ro:{}};
    }
    // Cross-hover in actor mode: hover another actor
    if(mode==="actor"&&ha&&ha!==aa){
      const af2=aFF[ha]||[];
      return{fi:new Set(af2.map(f=>f.id)),di:new Set(af2.map(f=>f.director)),ai:new Set([ha]),yi:new Set(af2.map(f=>f.year)),ro:{}};
    }
    // Default: current sub film
    return{fi:new Set([cur.id]),di:new Set([cur.director]),ai:new Set(cur.cast.map(c=>c.actor)),yi:new Set([cur.year]),ro:Object.fromEntries(cur.cast.map(c=>[c.actor,c.role]))};
  },[mode,activeFilm,hf,hd,ha,hy,cur,ad,aa]);

  const has=hl!==null;
  const isSub=mode!=="main";

  // Opacity helpers — in sub-mode with cross-hover, even the active dir/actor dims
  const oD=d=>{
    if(!has){
      if(isSub&&d===ad)return 1;
      return .5;
    }
    return hl.di.has(d)?1:.06;
  };
  const oA=a=>{
    if(!has){
      if(isSub&&a===aa)return 1;
      return .5;
    }
    return hl.ai.has(a)?1:.06;
  };
  const oY=y=>{if(!has)return .18;return hl.yi.has(y)?1:.06;};
  const fHL=f=>{if(!has)return false;return hl.fi.has(f.id);};
  const oF=f=>!has?1:hl.fi.has(f.id)?1:.06;
  const rFor=a=>(hl&&hl.ro&&hl.ro[a])||null;

  // Sub-mode timeline bar opacity
  const subBarOp=(f,i)=>{
    if(!crossHover)return i===si?1:.18;
    if(!has)return .06;
    return hl.fi.has(f.id)?1:.06;
  };

  const FS=11,LH="15px";
  const BAR_W=200; // ← ширина колонки с названиями фильмов (таймлайн)

  return(
    <div style={{position:"fixed",inset:0,background:"#222",color:"#ccc",fontFamily:"'JetBrains Mono',monospace",fontSize:FS,display:"grid",gridTemplateColumns:"180px 1fr 60px 280px",gridTemplateRows:"1fr",overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{display:none}body{overflow:hidden}`}</style>

      {/* LOGO */}
      <div onClick={goHome} style={{position:"absolute",zIndex:50,cursor:"pointer",textAlign:"center",transition:"all .5s",...(isSub||logoS||isSnap?{top:6,left:12,transform:"scale(.5)",transformOrigin:"top left"}:{top:8,left:"50%",transform:"translateX(-50%)"})}}>
        <div style={{fontSize:13,color:"#fff"}}>✦</div>
        <div style={{fontSize:30,fontWeight:700,letterSpacing:-2,color:"#fff",lineHeight:1}}>40<span style={{opacity:.45}}>/60</span></div>
        <div style={{fontSize:8,opacity:.35,letterSpacing:2,marginTop:1}}>1968 — 2023</div>
        <div style={{fontSize:9,opacity:.4,letterSpacing:1.5}}>Cinema Almanac</div>
      </div>

      {/* ═══ COL 1: DIRECTORS ═══ */}
      <div onMouseEnter={()=>setHz("dirs")} onMouseLeave={()=>setHz(null)}
        style={{gridColumn:1,overflow:"auto",padding:"0 0 0 16px",scrollbarWidth:"none",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",transition:"background .3s",background:hz==="dirs"?"rgba(255,255,255,.02)":"transparent"}}>
        {sD.map(d=>{
          const o=oD(d);
          const isOwner=isSub&&d===ad;
          const isHovered=hd===d;
          return(<div key={d} style={{transition:"opacity .4s",opacity:o}}>
            <div style={{
              fontSize:FS,lineHeight:LH,fontWeight:o>=1?700:300,cursor:"pointer",whiteSpace:"nowrap",
              color:isOwner?OC:undefined,
              textDecoration:((isSub||isSnap)&&isHovered&&!isOwner)?"underline":"none",
              textUnderlineOffset:2,
            }}
              onMouseEnter={()=>setHd(d)} onMouseLeave={()=>setHd(null)}
              onClick={()=>{if(isOwner)goBack();else openDir(d)}}>
              {d}{isOwner&&<span style={{opacity:.5,cursor:"pointer",marginLeft:6,fontWeight:300,color:OC}}>×</span>}
            </div>
            {isOwner&&!crossHover&&<div style={{fontSize:8,opacity:.35,lineHeight:"12px",fontWeight:300}}>{DIR_INFO[d]||""}</div>}
          </div>);
        })}
      </div>

      {/* ═══ COL 2: TIMELINE BARS + FILM AREA ═══ */}
      <div style={{gridColumn:2,overflow:"hidden",display:"flex",flexDirection:"row"}}>

        {/* Timeline bar strip */}
        <div onMouseEnter={()=>setHz("bars")} onMouseLeave={()=>setHz(null)}
          style={{width:BAR_W,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"8px 0",transition:"background .3s",background:hz==="bars"?"rgba(255,255,255,.02)":"transparent"}}>
          {isSub?(
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:6,height:"100%"}}>
              {crossHover?(
                /* Cross-hover: show ALL films from the hovered person's branch as titles */
                FILMS.map((f,i)=>{
                  const isH=has&&hl.fi.has(f.id);
                  return(
                    <div key={f.id} style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",transition:"opacity .4s",opacity:isH?.9:.04,paddingRight:8,minHeight:0,flex:isH?"none":"0 0 2px"}}>
                      {isH&&<span style={{fontSize:FS,fontWeight:700,whiteSpace:"nowrap",color:"#fff"}}>{f.title}</span>}
                      <div style={{width:22,height:2,background:isH?"#fff":"#555",borderRadius:1,flexShrink:0}}/>
                    </div>
                  );
                })
              ):(
                /* Normal sub: show sub film titles */
                sub.map((f,i)=>(
                  <div key={f.id} style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end",cursor:"pointer",transition:"opacity .4s",opacity:i===si?1:.18,paddingRight:8}}
                    onClick={()=>{setSi(i);snapR.current?.scrollTo({top:i*snapR.current.clientHeight,behavior:"smooth"})}}>
                    <span style={{fontSize:FS,fontWeight:i===si?700:300,whiteSpace:"nowrap"}}>{f.title}</span>
                    <div style={{width:22,height:2,background:"#888",borderRadius:1,flexShrink:0}}/>
                  </div>
                ))
              )}
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",flex:1}}>
              {FILMS.map((f,i)=>{
                const isH=fHL(f);const isActive=activeFilm?.id===f.id;const isBarHover=hf?.id===f.id;
                return(
                  <div key={f.id} style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",flex:1,transition:"opacity .4s",opacity:isH?.9:(has?.04:.12),paddingRight:8,minHeight:0,cursor:"pointer"}}
                    onMouseEnter={()=>setHf(f)}
                    onMouseLeave={()=>{if(hf?.id===f.id)setHf(null)}}
                    onClick={()=>{
                      if(isActive){exitSnap(f);}
                      else{setActiveFilm(f);setHf(null);setTimeout(()=>{const el=document.getElementById(`f-${f.id}`);el&&el.scrollIntoView({behavior:"smooth",block:"start"})},50);}
                    }}>
                    {isH&&<span style={{fontSize:FS,fontWeight:700,whiteSpace:"nowrap",color:isActive?OC:"#fff",overflow:"hidden",textOverflow:"ellipsis",textDecoration:isBarHover&&!isActive?"underline":"none",textUnderlineOffset:2}}>
                      {f.title}{isActive&&<span style={{opacity:.5,fontWeight:300,color:OC}}> ×</span>}
                    </span>}
                    <div style={{width:22,height:2,background:isH?"#fff":"#555",borderRadius:1,flexShrink:0}}/>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Film cards */}
        <div style={{flex:1,overflow:"hidden"}}>
          {isSub?(
            <div ref={snapR} onScroll={onSubSnap} style={{height:"100%",overflowY:"auto",scrollSnapType:"y mandatory",scrollbarWidth:"none",transition:"opacity .4s",opacity:crossHover?.08:1}}>
              {sub.map(f=>(
                <div key={f.id} style={{height:"100%",minHeight:"100%",scrollSnapAlign:"start",display:"flex",flexDirection:"column",padding:"8px 12px",overflow:"auto"}}>
                  <div style={{width:"100%",aspectRatio:"16/9",background:f.color,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}} onClick={()=>openFilmInMain(f)}>
                    <div style={{fontSize:65,fontWeight:700,color:"rgba(255,255,255,.18)",textTransform:"uppercase",letterSpacing:1}}>{f.title}</div>
                  </div>
                  <div style={{padding:"14px 0",textAlign:"center",flex:1}}>
                    <p style={{fontSize:12.5,lineHeight:1.7,color:"#aaa",maxWidth:520,margin:"0 auto 14px",fontWeight:300}}>{f.plot}</p>
                    <p style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:10}}>IMDB {f.rating}</p>
                    {f.quotes.map((q,qi)=><p key={qi} style={{fontSize:9.5,opacity:.45,lineHeight:1.5,marginBottom:2,fontWeight:300,fontStyle:"italic"}}>{q}</p>)}
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div ref={scrollR} onScroll={isSnap?onMainScroll:undefined}
              style={{height:"100%",overflowY:"auto",padding:isSnap?"0 12px":"8px 12px",scrollbarWidth:"none",...(isSnap?{scrollSnapType:"y mandatory"}:{})}}>
              {FILMS.map(f=>(
                <div key={f.id} id={`f-${f.id}`} data-film-id={f.id}
                  style={{transition:"opacity .4s",opacity:isSnap?(crossHover?.08:1):oF(f),...(isSnap?{scrollSnapAlign:"start",height:"100%",minHeight:"100%",display:"flex",flexDirection:"column"}:{})}}>
                  <div style={{width:"100%",aspectRatio:"16/9",background:f.color,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",...(isSnap?{}:{marginBottom:4}),flexShrink:0}}
                    onMouseEnter={()=>{if(!activeFilm)setHf(f)}} onMouseLeave={()=>setHf(null)}
                    onClick={()=>{
                      if(isSnap)exitSnap(f);
                      else{setActiveFilm(f);setHf(null);setTimeout(()=>{const el=document.getElementById(`f-${f.id}`);el&&el.scrollIntoView({behavior:"smooth",block:"start"})},50);}
                    }}>
                    <div style={{fontSize:65,fontWeight:700,color:"rgba(255,255,255,.18)",textTransform:"uppercase",letterSpacing:1}}>{f.title}</div>
                  </div>
                  {isSnap&&(
                    <div style={{padding:"14px 0 28px",textAlign:"center",flex:1,overflow:"auto"}}>
                      <p style={{fontSize:12.5,lineHeight:1.7,color:"#aaa",maxWidth:520,margin:"0 auto 14px",fontWeight:300}}>{f.plot}</p>
                      <p style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:10}}>IMDB {f.rating}</p>
                      {f.quotes.map((q,qi)=><p key={qi} style={{fontSize:9.5,opacity:.45,lineHeight:1.5,marginBottom:2,fontWeight:300,fontStyle:"italic"}}>{q}</p>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══ COL 3: YEARS ═══ */}
      <div onMouseEnter={()=>setHz("yrs")} onMouseLeave={()=>setHz(null)}
        style={{gridColumn:3,display:"flex",flexDirection:"column",justifyContent:"center",padding:"8px 4px 8px 0",transition:"background .3s",background:hz==="yrs"?"rgba(255,255,255,.02)":"transparent"}}>
        {sY.map(y=>{
          const o=oY(y);
          return(
          <div key={y} style={{
            fontSize:FS,lineHeight:LH,textAlign:"right",fontWeight:o>=1?700:300,opacity:o,transition:"opacity .4s",cursor:"pointer",
            color:"#fff",
          }}
            onMouseEnter={()=>setHy(y)} onMouseLeave={()=>setHy(null)}
            onClick={()=>{
              const yf=yF[y]||[];
              if(yf.length){const f=yf[0];setActiveFilm(f);setHf(null);setHy(null);setTimeout(()=>{const el=document.getElementById(`f-${f.id}`);el&&el.scrollIntoView({behavior:"smooth",block:"start"})},50);}
            }}>
            {y}
          </div>
        );})}
      </div>

      {/* ═══ COL 4: ACTORS ═══ */}
      <div onMouseEnter={()=>setHz("acts")} onMouseLeave={()=>setHz(null)}
        style={{gridColumn:4,overflow:"auto",padding:"0 16px 0 0",scrollbarWidth:"none",display:"flex",flexDirection:"column",justifyContent:"center",transition:"background .3s",background:hz==="acts"?"rgba(255,255,255,.02)":"transparent"}}>
        {sA.map(a=>{
          const o=oA(a);
          const isOwner=isSub&&a===aa;
          const isHovered=ha===a;
          const role=rFor(a);
          return(<div key={a} style={{transition:"opacity .4s",opacity:o}}>
            <div style={{
              fontSize:FS,lineHeight:LH,fontWeight:o>=1?700:300,cursor:"pointer",whiteSpace:"nowrap",textAlign:"right",
              color:isOwner?OC:undefined,
              textDecoration:((isSub||isSnap)&&isHovered&&!isOwner)?"underline":"none",
              textUnderlineOffset:2,
            }}
              onMouseEnter={()=>setHa(a)} onMouseLeave={()=>setHa(null)}
              onClick={()=>{if(isOwner)goBack();else openAct(a)}}>
              {role&&o>=1&&<span style={{opacity:.4,fontWeight:300,fontStyle:"italic"}}>{role}&ensp;</span>}
              {a}
              {isOwner&&<span style={{opacity:.5,cursor:"pointer",marginLeft:4,fontWeight:300,color:OC}}>×</span>}
            </div>
          </div>);
        })}
      </div>
    </div>
  );
}

export interface Achievement {
  id: string;
  date: string;
  event: string;
  result: string;
  type: "international" | "national";
}

export interface Training {
  id: string;
  date: string;
  program: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    tagline: string;
    subtitle: string;
    description: string;
    image: string;
  };
  about: {
    dob: string;
    nationality: string;
    languages: string;
    countriesVisited: string;
    email: string;
    phone: string;
    instagram: string;
    location: string;
  };
  media: {
    hero: string;
    about: string;
    contact: string;
  };
  education: {
    id: string;
    level: string;
    institution: string;
    gpa?: string;
  }[];
  training: Training[];
  achievements: Achievement[];
}

export const defaultData: PortfolioData = {
  hero: {
    name: "Susmita Khadka",
    tagline: "Table Tennis Athlete",
    subtitle: "Representing Nepal with discipline and consistency",
    description:
      "A dedicated table tennis player from Nepal focused on steady progress, disciplined training, and thoughtful performance across national and international stages.",
    image: "/hero.jpg",
  },
  about: {
    dob: "16th February 2008",
    nationality: "Nepali",
    languages: "Nepali, English & Hindi",
    countriesVisited: "India, China, Qatar",
    email: "susmii014@gmail.com",
    phone: "+977 9843345061",
    instagram: "@susmita_khadka4",
    location: "Rai Chowk, Nagarjun-02, Kathmandu, Nepal",
  },
  media: {
    hero: "/hero.jpg",
    about: "/susmita-action.jpg",
    contact: "/susmita-serve.jpg",
  },
  education: [
    { id: "1", level: "BLE (Basic Level Examination)", institution: "Bijeshwori Secondary School", gpa: "3.6" },
    { id: "2", level: "SEE (Secondary Education Examination)", institution: "Bijeswori Secondary School", gpa: "3.15" },
    { id: "3", level: "+2 Examinations", institution: "Prime College", gpa: "3.70" },
    { id: "4", level: "BBS (Running)", institution: "Reed Model College" },
  ],
  training: [
    { id: "t1", date: "28-30 Oct 2022", program: "ITTF Level II Course Training Camp – Olympic Solidarity & NOC Nepal" },
    { id: "t2", date: "17-24 Jun 2022", program: "National Hopes and Week Challenge – All Nepal Table Tennis Association" },
    { id: "t3", date: "20-29 Jan 2020", program: "\"AIMS FOR THE STARS\" Nepal Junior Team TT Camp, New Delhi, India" },
    { id: "t4", date: "25 Feb–2 Mar 2021", program: "ATTU \"AIMS FOR THE STARS\" Junior Table Tennis Training, Butwal, Nepal" },
    { id: "t5", date: "22-27 Jan 2019", program: "REGIONAL HOPES WEEK (SOUTH ASIA), Sonepat (Haryana), India" },
  ],
  achievements: [
    {
      id: "a1", date: "28 Jun–1 Jul 2025", type: "international",
      event: "2nd Yangtze River Cup 2025 – YueYang Olympic Sports Stadium, Hunan, China",
      result: "Participant"
    },
    {
      id: "a2", date: "17-22 Jul 2023", type: "international",
      event: "27th Asian Youth Championship, Doha, Qatar",
      result: "Participant"
    },
    {
      id: "a3", date: "14-17 May 2023", type: "international",
      event: "South Asian Youth Table Tennis Championship 2023, Itanagar, India",
      result: "U15 Girl's Doubles – Silver 🥈 | U15 Girl's Team – Bronze 🥉"
    },
    {
      id: "a4", date: "28-31 Jan 2024", type: "national",
      event: "9th Krishna Dhoj Memorial Table Tennis Tournament",
      result: "Women's Singles – Gold 🥇"
    },
    {
      id: "a5", date: "18-21 Oct 2023", type: "national",
      event: "3rd All Nepal Interward Table Tennis Championship",
      result: "Women's Singles – Gold 🥇"
    },
    {
      id: "a6", date: "18-20 Apr 2023", type: "national",
      event: "Madan Bhandari Sports Academy 1st National Open Junior TT Championship",
      result: "Cadet Girl's Singles – Gold 🥇"
    },
    {
      id: "a7", date: "31 Jan–5 Feb 2023", type: "national",
      event: "5th Samjhana Cup International TT Championships",
      result: "Women's Team – Bronze 🥉"
    },
    {
      id: "a8", date: "9-13 Mar 2023", type: "national",
      event: "12th Purna Man Bajracharya Memorial National Open TT Championship, Kathmandu",
      result: "Ladies Singles (College) – Gold 🥇 | Ladies Team (College) – Gold 🥇 | Women's Team – Bronze 🥉"
    },
    {
      id: "a9", date: "14-20 Oct 2022", type: "national",
      event: "9th National Games 41st National TT Championship, Pokhara",
      result: "Women's Team – Bronze 🥉"
    },
    {
      id: "a10", date: "20-24 Sep 2022", type: "national",
      event: "KKM-NRT Open Table Tennis Championships",
      result: "U19 Junior Girl's Singles – Bronze 🥉"
    },
    {
      id: "a11", date: "2-4 Sep 2022", type: "national",
      event: "1st Kalyan Pandey National Junior & Cadet TT Championship 2022, Lainchour",
      result: "Junior Girl's Singles – Gold 🥇"
    },
    {
      id: "a12", date: "19-21 Aug 2022", type: "national",
      event: "16th Late Hare Ram Joshi Memorial Open TT Tournament 2079, Kathmandu",
      result: "Women's Singles – Gold 🥇"
    },
    {
      id: "a13", date: "21-23 May 2022", type: "national",
      event: "1st Milan Memorial National Junior TT Championships",
      result: "Cadet Girl's Singles – Bronze 🥉"
    },
    {
      id: "a14", date: "16-18 Dec 2021", type: "national",
      event: "1st Nepal APM Open Table Tennis Championships",
      result: "U16 Girl's Singles – Silver 🥈 | Women's Singles – Bronze 🥉"
    },
    {
      id: "a15", date: "11 Sep 2021", type: "national",
      event: "15th Late Hare Ram Joshi Memorial Open TT Tournament 2078, Kathmandu",
      result: "Women's Open Singles – Gold 🥇"
    },
    {
      id: "a16", date: "1-8 Feb 2020", type: "national",
      event: "3rd Samjhana Cup Open Int'l TT Championships",
      result: "U12 Girl's Singles – Gold 🥇"
    },
    {
      id: "a17", date: "10-13 Apr 2019", type: "national",
      event: "8th National Games 40th National TT Championship, Dang, Nepal",
      result: "Women's Team – Bronze 🥉"
    },
    {
      id: "a18", date: "27-28 May 2019", type: "national",
      event: "Vice-President Children Games 2076",
      result: "Girl's Doubles – Gold 🥇 | Girl's Singles – Bronze 🥉"
    },
    {
      id: "a19", date: "1 Mar 2019", type: "national",
      event: "8th National Games Province Sports Tournament",
      result: "Women's Singles – Gold 🥇"
    },
    {
      id: "a20", date: "19-22 Jan 2019", type: "national",
      event: "1st ANTTA Cup National Junior TT Championship",
      result: "U12 Girl's Singles – Gold 🥇 | Girl's Team – Gold 🥇"
    },
    {
      id: "a21", date: "4-6 Jan 2019", type: "national",
      event: "First Valley Wide Inter School & Open TT Tournament 2075, Bhaktapur",
      result: "U12 Girl's Singles – Silver 🥈 | Girl's Team – Silver 🥈"
    },
    {
      id: "a22", date: "2-5 Feb 2019", type: "national",
      event: "2nd Samjhana Cup National Open TT Championship",
      result: "U12 Girl's Singles – Gold 🥇"
    },
    {
      id: "a23", date: "15-16 Jun 2018", type: "national",
      event: "7th SOPHES National Level Inter School Open TT Tournament, Lalitpur",
      result: "U12 Girl's Singles – Gold 🥇"
    },
    {
      id: "a24", date: "26 Nov–1 Dec 2018", type: "national",
      event: "10th Purna Man Bajracharya Memorial National Open TT Championship",
      result: "U12 Girl's Singles – Gold 🥇 | Girl's Team – Silver 🥈"
    },
    {
      id: "a25", date: "29 Sep 2018", type: "national",
      event: "Grand Children Day 2075",
      result: "Girl's Singles – Gold 🥇"
    },
    {
      id: "a26", date: "1-5 Aug 2017", type: "national",
      event: "9th Purna Man Bajracharya Memorial National Open TT Championship",
      result: "U12 Girl's Singles – Gold 🥇 | Girl's Team – Gold 🥇"
    },
    {
      id: "a27", date: "25-26 Aug 2017", type: "national",
      event: "6th SOPHES National Level Inter School Open TT Tournament, Kirtipur",
      result: "U12 Girl's Singles – Gold 🥇 | Girl's Team – Silver 🥈"
    },
    {
      id: "a28", date: "15-16 Nov 2017", type: "national",
      event: "1st Saurya Cup Inter-School TT Championship 2017",
      result: "U12 Girl's Singles – Gold 🥇 | Girl's Team – Silver 🥈"
    },
    {
      id: "a29", date: "27-29 Jul 2017", type: "national",
      event: "National Junior & Veterans TT Tournament, Dharan",
      result: "Cadet Girl's Singles – Bronze 🥉 | Girl's Team Event – Bronze 🥉"
    },
    {
      id: "a30", date: "26-28 Aug 2016", type: "national",
      event: "7th Lt. Krishna Dhoj Memorial Nationwide Inter School/College TT Championship",
      result: "Girl's Team – Bronze 🥉"
    },
    {
      id: "a31", date: "21-24 Feb 2016", type: "national",
      event: "8th Purna Man Bajracharya Memorial National Open TT Championship",
      result: "Girl's Team – Bronze 🥉"
    },
    {
      id: "a32", date: "6-9 Sep 2015", type: "national",
      event: "6th Lt. Krishna Dhoj Memorial Nationwide Inter School/College TT Championship",
      result: "Girl's Team – Bronze 🥉"
    },
  ],
};

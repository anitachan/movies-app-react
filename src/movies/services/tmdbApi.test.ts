import axios from "axios";
import { getMovies } from "./tmdbApi";

jest.mock('axios', () => ({
    get: jest.fn()
}));

const axiosMock = axios as jest.Mocked<typeof axios>;

describe('TmdbApi', () => {
    const movies = {
        "page": 1,
        "results": [
            {
                "backdrop_path": "/bZGAX8oMDm3Mo5i0ZPKh9G2OcaO.jpg",
                "first_air_date": "2021-06-09",
                "genre_ids": [18, 10765],
                "id": 84958,
                "name": "Loki",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "Loki",
                "overview": "After stealing the Tesseract during the events of “Avengers: Endgame,” an alternate version of Loki is brought to the mysterious Time Variance Authority, a bureaucratic organization that exists outside of time and space and monitors the timeline. They give Loki a choice: face being erased from existence due to being a “time variant” or help fix the timeline and stop a greater threat.",
                "popularity": 2720.439,
                "poster_path": "/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
                "vote_average": 8.2,
                "vote_count": 6837
            },
            {
                "backdrop_path": "/j7S4y12Bsz17fRrIVl4Tq0ICc78.jpg",
                "first_air_date": "2019-03-10",
                "genre_ids": [10764],
                "id": 87392,
                "name": "Quem Quer Namorar com o Agricultor?",
                "origin_country": ["PT"],
                "original_language": "pt",
                "original_name": "Quem Quer Namorar com o Agricultor?",
                "overview": "Five farmers look for love. The suitors will have to carry out various tests related to the world of agriculture in order to win the heart of each farmer.",
                "popularity": 1797.044,
                "poster_path": "/yoRTuyC2cYLXJzKct9Iql0gcCL1.jpg",
                "vote_average": 6.5,
                "vote_count": 8
            },
            {
                "backdrop_path": "/2748H9LoK2oQd9L7ofze8VjCGhS.jpg",
                "first_air_date": "2020-07-13",
                "genre_ids": [18, 10766],
                "id": 116479,
                "name": "Anupamaa",
                "origin_country": ["IN"],
                "original_language": "hi",
                "original_name": "अनुपमा",
                "overview": "Anupama had to sacrifice a lot to become an ideal wife, daughter-in-law, and mother. After a bitter realisation, she sets out to live on her own terms.",
                "popularity": 1546.097,
                "poster_path": "/9R4Qtm01pNh0CzdoIyvHKefe5RL.jpg",
                "vote_average": 8.7,
                "vote_count": 7
            },
            {
                "backdrop_path": "/aqvOIR4CzCQETw9pAuyXZYKd2Ni.jpg",
                "first_air_date": "2021-07-04",
                "genre_ids": [10764],
                "id": 128141,
                "name": "O Amor Acontece",
                "origin_country": ["PT"],
                "original_language": "pt",
                "original_name": "O Amor Acontece",
                "overview": "Originally from the Netherlands, Let Love Rule now has a Portuguese version. Each week, four new stories are shown, lived by different protagonists that we meet every Sunday. At the end of four days, a meeting dictates the participants' continuation as a couple - outside the experience - or their separation. In a ceremony, led by Maria Cerqueira Gomes and Pedro Teixeira, the couples evaluate their experience. Mafalda de Castro presents the diaries of this format, which is premised on helping singles find love.",
                "popularity": 1483.054,
                "poster_path": "/tmOZSTwDyQEeigmyWZw6CjcpBi8.jpg",
                "vote_average": 1,
                "vote_count": 1
            },
            {
                "backdrop_path": "/mDJoKd2clXx64ARI7WzpvV3ODg5.jpg",
                "first_air_date": "2021-03-22",
                "genre_ids": [10766],
                "id": 123190,
                "name": "Mulheres",
                "origin_country": ["PT"],
                "original_language": "pt",
                "original_name": "Mulheres",
                "overview": "The stories of seven women, whose destinies intersect. Seven Lisbon couples live different moments in their relationships. Everyone has problems to solve. The challenges that each couple face are different - some more serious, others more common and predictable... and some purely selfish.",
                "popularity": 1473.875,
                "poster_path": "/rlMHXRqFaViJSznN53VXv8VW3nq.jpg",
                "vote_average": 8.3,
                "vote_count": 3
            },
            {
                "backdrop_path": "/A9sCKnxgTTapzu307ybdXCJQEqD.jpg",
                "first_air_date": "2013-12-02",
                "genre_ids": [16, 35, 10765, 10759],
                "id": 60625,
                "name": "Rick and Morty",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "Rick and Morty",
                "overview": "Rick is a mentally-unbalanced but scientifically-gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes. Compounded with Morty's already unstable family life, these events cause Morty much distress at home and school.",
                "popularity": 1249.233,
                "poster_path": "/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg",
                "vote_average": 8.8,
                "vote_count": 4956
            },
            {
                "backdrop_path": "/f9y6v4AW5N52mleGutg0xleod5z.jpg",
                "first_air_date": "2018-06-18",
                "genre_ids": [10751],
                "id": 89491,
                "name": "America Says",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "America Says",
                "overview": "In this family-friendly game show, two teams face off to guess Americans' responses to questions covering a variety of topics.",
                "popularity": 1141.704,
                "poster_path": "/cNZTNrWxc02moLzn3NYZqowyJdU.jpg",
                "vote_average": 4.3,
                "vote_count": 4
            },
            {
                "backdrop_path": "/qXXILKf4o1BUYTlGVyHbBHvFOaj.jpg",
                "first_air_date": "2021-02-22",
                "genre_ids": [10766, 18],
                "id": 119448,
                "name": "A Serra",
                "origin_country": [],
                "original_language": "pt",
                "original_name": "A Serra",
                "overview": "",
                "popularity": 1075.966,
                "poster_path": "/gRLg1EvJ0a3JHa2fWzgUks4kb5f.jpg",
                "vote_average": 2.7,
                "vote_count": 7
            },
            {
                "backdrop_path": "/jJpyrPNvPTNK5Y3qdYWZ5BDeg0b.jpg",
                "first_air_date": "2009-01-12",
                "genre_ids": [18, 10751, 10766],
                "id": 16413,
                "name": "Yeh Rishta Kya Kehlata Hai",
                "origin_country": ["IN"],
                "original_language": "hi",
                "original_name": "ये रिश्ता क्या कहलाता है",
                "overview": "Naitik and Akshara Singhania live in a Marwari joint family in Udaipur. As a young married couple, they journey through adjustment issues, later as parents of young children, and they learn to love each other and their respective extended families while becoming mature members of their household.",
                "popularity": 1043.802,
                "poster_path": "/y9U6187kzOigTJiAezzYA875WGV.jpg",
                "vote_average": 2.2,
                "vote_count": 5
            },
            {
                "backdrop_path": "/eyG9srihv68ScRdEbJZj66WT4O0.jpg",
                "first_air_date": "2014-10-07",
                "genre_ids": [18, 10765],
                "id": 60735,
                "name": "The Flash",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "The Flash",
                "overview": "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only \"meta-human\" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash.",
                "popularity": 978.877,
                "poster_path": "/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg",
                "vote_average": 7.7,
                "vote_count": 8129
            },
            {
                "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
                "first_air_date": "2016-01-25",
                "genre_ids": [80, 10765],
                "id": 63174,
                "name": "Lucifer",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "Lucifer",
                "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
                "popularity": 926.037,
                "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg",
                "vote_average": 8.5,
                "vote_count": 9693
            },
            {
                "backdrop_path": "/uvtMBoNqaEfDy257oZ7SRlC9VYR.jpg",
                "first_air_date": "2015-06-07",
                "genre_ids": [10764],
                "id": 66636,
                "name": "Love Island",
                "origin_country": ["GB"],
                "original_language": "en",
                "original_name": "Love Island",
                "overview": "A stunning cast engages in the ultimate game of love, as they land in a sunshine paradise in search of passion and romance. Each of the glamorous members of the public will live like celebrities in a luxury villa, but in order to stay there, they will not only have to win over the hearts of each other, but also the hearts of the public.",
                "popularity": 909.039,
                "poster_path": "/6qwUvkopDFHQq4xYBVXJixYQIRp.jpg",
                "vote_average": 5.8,
                "vote_count": 67
            },
            {
                "backdrop_path": "/iDbIEpCM9nhoayUDTwqFL1iVwzb.jpg",
                "first_air_date": "2017-09-25",
                "genre_ids": [18],
                "id": 71712,
                "name": "The Good Doctor",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "The Good Doctor",
                "overview": "A young surgeon with Savant syndrome is recruited into the surgical unit of a prestigious hospital. The question will arise: can a person who doesn't have the ability to relate to people actually save their lives",
                "popularity": 802.196,
                "poster_path": "/6tfT03sGp9k4c0J3dypjrI8TSAI.jpg",
                "vote_average": 8.6,
                "vote_count": 8915
            },
            {
                "backdrop_path": "/9nBVkNBe4x9HKDAzxjxlIqecxCW.jpg",
                "first_air_date": "2021-06-25",
                "genre_ids": [35, 18],
                "id": 126280,
                "name": "Sex/Life",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "Sex/Life",
                "overview": "A woman's daring sexual past collides with her married-with-kids present when the bad-boy ex she can't stop fantasizing about crashes back into her life.",
                "popularity": 790.138,
                "poster_path": "/2ST6l4WP7ZfqAetuttBqx8F3AAH.jpg",
                "vote_average": 7.3,
                "vote_count": 447
            },
            {
                "backdrop_path": "/boPsYdMOZQj6FJy9xXmAkrEK7ry.jpg",
                "first_air_date": "1972-10-16",
                "genre_ids": [10766, 18],
                "id": 2527,
                "name": "Emmerdale",
                "origin_country": ["GB"],
                "original_language": "en",
                "original_name": "Emmerdale",
                "overview": "The lives of several families in the Yorkshire Dales revolve around a farm and the nearby village. With murders, affairs, lies, deceit, laughter and tears, it's all there in the village.",
                "popularity": 744.124,
                "poster_path": "/ualtuRRNYa9Fj61wSuBVcuvaVDP.jpg",
                "vote_average": 4,
                "vote_count": 55
            },
            {
                "backdrop_path": "/pnyT1foDmmXTsho2DfxN2ePI8ix.jpg",
                "first_air_date": "2018-06-12",
                "genre_ids": [18],
                "id": 80240,
                "name": "The Queen of Flow",
                "origin_country": ["CO"],
                "original_language": "es",
                "original_name": "La Reina del Flow",
                "overview": "After spending seventeen years in prison unfairly, a talented songwriter seeks revenge on the men who sank her and killed her family.",
                "popularity": 734.317,
                "poster_path": "/fuVuDYrs8sxvEolnYr0wCSvtyTi.jpg",
                "vote_average": 8,
                "vote_count": 964
            },
            {
                "backdrop_path": "/idiZ5I1H4bk5t5ZipOnTbxncI6a.jpg",
                "first_air_date": "2021-07-15",
                "genre_ids": [18, 9648, 10765],
                "id": 113036,
                "name": "American Horror Stories",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "American Horror Stories",
                "overview": "An anthology series of stand alone episodes delving into horror myths, legends and lore.",
                "popularity": 732.599,
                "poster_path": "/50AuXrycD7Q61o0Kppby5DTVOKP.jpg",
                "vote_average": 8.2,
                "vote_count": 153
            },
            {
                "backdrop_path": "/2O3ZRECju00Jod6LrVB3uRgZMXK.jpg",
                "first_air_date": "2021-07-07",
                "genre_ids": [10751, 35, 16],
                "id": 90461,
                "name": "Monsters at Work",
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "Monsters at Work",
                "overview": "Ever since he was a kid, Tylor Tuskmon has dreamed of becoming a Scarer just like his idol James P. Sullivan, and now that dream is about to come true... or not. The day he arrives at Monsters Incorporated to begin his dream job as a Scarer, he learns that scaring is out and laughter is in! After being reassigned to the Monsters, Inc. Facilities Team, Tylor sets his sights on a new goal: figuring out how to be funny and becoming a Jokester.",
                "popularity": 730.184,
                "poster_path": "/2gxgwhcuSmI5xtexb0t9zGj43FS.jpg",
                "vote_average": 7.2,
                "vote_count": 720
            },
            {
                "backdrop_path": "/pMkjcQEdqSlVSjngH5TLEBS2TN.jpg",
                "first_air_date": "2018-10-05",
                "genre_ids": [80, 9648, 18],
                "id": 76669,
                "name": "Elite",
                "origin_country": ["ES"],
                "original_language": "es",
                "original_name": "Élite",
                "overview": "When three working class kids enroll in the most exclusive school in Spain, the clash between the wealthy and the poor students leads to tragedy.",
                "popularity": 710.641,
                "poster_path": "/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg",
                "vote_average": 8.2,
                "vote_count": 7330
            },
            {
                "backdrop_path": "/oq0C4xBqhYqAqzt6FSZdXxn314f.jpg",
                "first_air_date": "2021-06-10",
                "genre_ids": [],
                "id": 124598,
                "name": "De Oranjezomer (Veronica Inside Oranje)",
                "origin_country": ["NL"],
                "original_language": "nl",
                "original_name": "De Oranjezomer (Veronica Inside Oranje)",
                "overview": "",
                "popularity": 696.332,
                "poster_path": null,
                "vote_average": 2.2,
                "vote_count": 5
            }
        ],
        "total_pages": 500,
        "total_results": 10000
    }
    const url = process.env.REACT_APP_API_URL;
    const key = process.env.REACT_APP_API_KEY

    test('should return the result data', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: movies, status: 200 });

        const result = await getMovies(1);

        expect(result).toEqual(movies.results);
        expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/now_playing`, { "params": { "api_key": key, "page": 1 } })
    });

    test('should return error when the status is not 200', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: {}, status: 400 });

        await expect(getMovies(1)).rejects.toThrow('Error fetching movies');
        expect(axiosMock.get).toHaveBeenCalledWith(`${url}movie/now_playing`, { "params": { "api_key": key, "page": 1 } })
    });
});

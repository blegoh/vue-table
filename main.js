import Vue from 'vue'
import Datatable from './src/plugin'

// Without options
Vue.use(Datatable);

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        users: [
            {
                "id": 0,
                "first_name": "Opal",
                "last_name": "Valenzuela"
            },
            {
                "id": 1,
                "first_name": "Duke",
                "last_name": "Stafford"
            },
            {
                "id": 2,
                "first_name": "Hillary",
                "last_name": "Griffin"
            },
            {
                "id": 3,
                "first_name": "Margret",
                "last_name": "Jefferson"
            },
            {
                "id": 4,
                "first_name": "Noemi",
                "last_name": "Ray"
            },
            {
                "id": 5,
                "first_name": "Britt",
                "last_name": "Cain"
            },
            {
                "id": 6,
                "first_name": "Jenna",
                "last_name": "Melton"
            },
            {
                "id": 7,
                "first_name": "Therese",
                "last_name": "Hays"
            },
            {
                "id": 8,
                "first_name": "Michelle",
                "last_name": "Castaneda"
            },
            {
                "id": 9,
                "first_name": "Willie",
                "last_name": "Lucas"
            },
            {
                "id": 10,
                "first_name": "Marsha",
                "last_name": "Sullivan"
            },
            {
                "id": 11,
                "first_name": "Parrish",
                "last_name": "Wise"
            },
            {
                "id": 12,
                "first_name": "Juliana",
                "last_name": "Gregory"
            },
            {
                "id": 13,
                "first_name": "Clarke",
                "last_name": "Mcleod"
            },
            {
                "id": 14,
                "first_name": "Leann",
                "last_name": "Duran"
            },
            {
                "id": 15,
                "first_name": "Madelyn",
                "last_name": "Nolan"
            },
            {
                "id": 16,
                "first_name": "Sexton",
                "last_name": "Mooney"
            },
            {
                "id": 17,
                "first_name": "Moody",
                "last_name": "Matthews"
            },
            {
                "id": 18,
                "first_name": "Ruthie",
                "last_name": "Hanson"
            },
            {
                "id": 19,
                "first_name": "Burke",
                "last_name": "Petty"
            },
            {
                "id": 20,
                "first_name": "Mclaughlin",
                "last_name": "Small"
            },
            {
                "id": 21,
                "first_name": "Keisha",
                "last_name": "Gallagher"
            },
            {
                "id": 22,
                "first_name": "Knight",
                "last_name": "Jimenez"
            },
            {
                "id": 23,
                "first_name": "Valarie",
                "last_name": "Villarreal"
            },
            {
                "id": 24,
                "first_name": "Lee",
                "last_name": "Meyer"
            },
            {
                "id": 25,
                "first_name": "Rita",
                "last_name": "Hammond"
            },
            {
                "id": 26,
                "first_name": "Betsy",
                "last_name": "Ramirez"
            },
            {
                "id": 27,
                "first_name": "Darla",
                "last_name": "Keller"
            },
            {
                "id": 28,
                "first_name": "Morales",
                "last_name": "Campbell"
            },
            {
                "id": 29,
                "first_name": "Imogene",
                "last_name": "Neal"
            },
            {
                "id": 30,
                "first_name": "Geneva",
                "last_name": "Baldwin"
            },
            {
                "id": 31,
                "first_name": "Blevins",
                "last_name": "Curtis"
            },
            {
                "id": 32,
                "first_name": "Christy",
                "last_name": "Wall"
            },
            {
                "id": 33,
                "first_name": "Ophelia",
                "last_name": "Kinney"
            },
            {
                "id": 34,
                "first_name": "Mullen",
                "last_name": "Mendez"
            },
            {
                "id": 35,
                "first_name": "Olive",
                "last_name": "Bartlett"
            },
            {
                "id": 36,
                "first_name": "Rose",
                "last_name": "Langley"
            },
            {
                "id": 37,
                "first_name": "Decker",
                "last_name": "Norris"
            },
            {
                "id": 38,
                "first_name": "Rosetta",
                "last_name": "Vaughn"
            },
            {
                "id": 39,
                "first_name": "Richards",
                "last_name": "Beasley"
            },
            {
                "id": 40,
                "first_name": "Melton",
                "last_name": "Thomas"
            },
            {
                "id": 41,
                "first_name": "Christian",
                "last_name": "Dotson"
            },
            {
                "id": 42,
                "first_name": "Marietta",
                "last_name": "Nichols"
            },
            {
                "id": 43,
                "first_name": "Daugherty",
                "last_name": "York"
            },
            {
                "id": 44,
                "first_name": "Bridgette",
                "last_name": "Bowers"
            },
            {
                "id": 45,
                "first_name": "Dana",
                "last_name": "Howard"
            },
            {
                "id": 46,
                "first_name": "Witt",
                "last_name": "Dawson"
            },
            {
                "id": 47,
                "first_name": "Blankenship",
                "last_name": "Rosa"
            },
            {
                "id": 48,
                "first_name": "Jordan",
                "last_name": "Walls"
            },
            {
                "id": 49,
                "first_name": "Meagan",
                "last_name": "Callahan"
            },
            {
                "id": 50,
                "first_name": "Tabitha",
                "last_name": "Ellison"
            },
            {
                "id": 51,
                "first_name": "Alisa",
                "last_name": "Pickett"
            },
            {
                "id": 52,
                "first_name": "Haley",
                "last_name": "Blackburn"
            },
            {
                "id": 53,
                "first_name": "Morin",
                "last_name": "Lara"
            },
            {
                "id": 54,
                "first_name": "Anderson",
                "last_name": "Price"
            },
            {
                "id": 55,
                "first_name": "Johnston",
                "last_name": "Aguirre"
            },
            {
                "id": 56,
                "first_name": "Tammie",
                "last_name": "Norton"
            },
            {
                "id": 57,
                "first_name": "Sampson",
                "last_name": "Lindsay"
            },
            {
                "id": 58,
                "first_name": "Concetta",
                "last_name": "Gould"
            },
            {
                "id": 59,
                "first_name": "Mcfarland",
                "last_name": "Browning"
            },
            {
                "id": 60,
                "first_name": "Francisca",
                "last_name": "Weber"
            },
            {
                "id": 61,
                "first_name": "Nikki",
                "last_name": "Lester"
            },
            {
                "id": 62,
                "first_name": "Stevens",
                "last_name": "Strong"
            },
            {
                "id": 63,
                "first_name": "Valentine",
                "last_name": "Winters"
            },
            {
                "id": 64,
                "first_name": "Isabel",
                "last_name": "Mcclure"
            },
            {
                "id": 65,
                "first_name": "Maritza",
                "last_name": "West"
            },
            {
                "id": 66,
                "first_name": "Meredith",
                "last_name": "Ballard"
            },
            {
                "id": 67,
                "first_name": "Gilda",
                "last_name": "Lindsey"
            },
            {
                "id": 68,
                "first_name": "Addie",
                "last_name": "Austin"
            },
            {
                "id": 69,
                "first_name": "Peck",
                "last_name": "Webster"
            },
            {
                "id": 70,
                "first_name": "Kristie",
                "last_name": "Taylor"
            },
            {
                "id": 71,
                "first_name": "Doreen",
                "last_name": "Mcdaniel"
            },
            {
                "id": 72,
                "first_name": "Maxwell",
                "last_name": "Pratt"
            },
            {
                "id": 73,
                "first_name": "Landry",
                "last_name": "Chavez"
            },
            {
                "id": 74,
                "first_name": "Wooten",
                "last_name": "Stout"
            },
            {
                "id": 75,
                "first_name": "Lorena",
                "last_name": "Mckenzie"
            },
            {
                "id": 76,
                "first_name": "Wendy",
                "last_name": "Kane"
            },
            {
                "id": 77,
                "first_name": "Stacy",
                "last_name": "Hodges"
            },
            {
                "id": 78,
                "first_name": "Eve",
                "last_name": "Clarke"
            },
            {
                "id": 79,
                "first_name": "Ronda",
                "last_name": "Henson"
            },
            {
                "id": 80,
                "first_name": "Mckenzie",
                "last_name": "Delgado"
            },
            {
                "id": 81,
                "first_name": "Monroe",
                "last_name": "Ferguson"
            },
            {
                "id": 82,
                "first_name": "Molly",
                "last_name": "Hendricks"
            },
            {
                "id": 83,
                "first_name": "Roberts",
                "last_name": "Mcmillan"
            },
            {
                "id": 84,
                "first_name": "Stone",
                "last_name": "Howell"
            },
            {
                "id": 85,
                "first_name": "Byers",
                "last_name": "Guy"
            },
            {
                "id": 86,
                "first_name": "Stewart",
                "last_name": "Sims"
            },
            {
                "id": 87,
                "first_name": "Whitney",
                "last_name": "Cardenas"
            },
            {
                "id": 88,
                "first_name": "Lucile",
                "last_name": "Valencia"
            },
            {
                "id": 89,
                "first_name": "Natasha",
                "last_name": "Lowery"
            },
            {
                "id": 90,
                "first_name": "Enid",
                "last_name": "Mcpherson"
            },
            {
                "id": 91,
                "first_name": "Abbott",
                "last_name": "Powell"
            },
            {
                "id": 92,
                "first_name": "Delores",
                "last_name": "Mathis"
            },
            {
                "id": 93,
                "first_name": "Leta",
                "last_name": "Avila"
            },
            {
                "id": 94,
                "first_name": "Tanisha",
                "last_name": "Wilcox"
            },
            {
                "id": 95,
                "first_name": "Barron",
                "last_name": "Warner"
            },
            {
                "id": 96,
                "first_name": "Nelson",
                "last_name": "Larson"
            },
            {
                "id": 97,
                "first_name": "Hopkins",
                "last_name": "Bryant"
            },
            {
                "id": 98,
                "first_name": "Forbes",
                "last_name": "Conrad"
            },
            {
                "id": 99,
                "first_name": "Margarita",
                "last_name": "Rowland"
            }
        ]
    }
})
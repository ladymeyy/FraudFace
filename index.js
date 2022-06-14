
const a = {"status":"success","result":"good","country":"United States", "Happy":false, "Buyer":true, "Mobile":"iphone", "Crime":"Stealing", "Item Purchased": "teddy bear", "Item stolen":"diamonds" }

const style= ["3D render", "oil painting", "photo", "cartoon", "bauhaus painting", "abstract painting", "oil pastel",
    "comic book cover", "digital art", "futuristic cyborg poster", "pencil and water color drawing" ]

/*List of 10 positive adjectives */
const adjectives= ["Cheerful", "Elegant", "Joyful", "Glorious", "Cute", "Funny", "Beautiful", "Radiant", "Exquisite"]

/*List of 40 famous painters from the past 1000 years */
const artists= ["Leonardo da Vinci", "Michelangelo", "Rembrandt", "Vincent va Gogh", "Johannes Vermeer",
    "Sandro Botticelli", "Diego Velázquez", "Pablo Picasso", "Édouard Manet", "Claude Monet", "Auguste Renoir",
    "Georges Seurat", "Paul Cézanne", "Henri Matisse", "Jackson Pollock", "Andy Warhol", "Mark Rothko",
    "Jasper Johns", "Joan Miró", "Barnett Newman", "Rothko", "Clyfford Still", "Frank Stella", "Robert Rauschenberg",
    "Ad Reinhardt", "Richard Diebenkorn", "David Hockney", "Lucian Freud", "Bruce Nauman", "Richard Serra", "Anselm Kiefer",
    "Bill Viola", "Gilbert & George", "Gerhard Richter", "Jeff Koons","Damien Hirst", "Cindy Sherman", "Paul Graham"]

const image_element_options = { "style": style, "adjectives": adjectives, "artists": artists }

const FORBIDDEN_WORDS = ['@', '_', '-', 'N/A', 'NA', 'None', 'null', 'full' ,'none',
    'unknown', 'mismatch', 'NaN', 'no', 'yes', 'True', 'False', 'scriptver', 'decline']

/*
Write a javascript function that takes an object and for each array in object values returns one random value
*/
function getRandomValuesFromEachArrayInObj(obj) {
    let result = {};
    for (let key in obj) {
        let randomIndex = Math.floor(Math.random() * obj[key].length);
        result[key]= obj[key][randomIndex];
    }
    return result;
}


function getPrimitive(obj) {
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
        return obj;
    }

    for (let key in obj) {
        let result = getPrimitive(obj[key]);
        if (result) {
            return result;
        }
    }
}


function randomValues(obj) {
    var values = [];
    for (var i = 0; i < 100; i++) {
        var keys = Object.keys(obj);
        var randomKey = keys[Math.floor(Math.random() * keys.length)];
        const keyValuePicked = obj[randomKey];
        values.push(getPrimitive(keyValuePicked));
    }


    return [...new Set(values
        .filter(a => typeof a === "string")
        .filter(a => !(/\d/.test(a)))
        .filter(a => !!a && a !== ' ')
        .filter(a => a.trim().length>=3 && a.trim().length <10)
        .filter(a => !check(FORBIDDEN_WORDS, a))
        .map(i => i?.toLowerCase().trim())
    )
    ];
}

function check(words, string) {
    for (const i in words) {
        if (string?.toLowerCase().indexOf(words[i].toLowerCase()) > -1) {
            return true;
        }
    }
    return false;
}


var obj = a.result[0];

//Generate a creative image description of the following words:
//'Distrito Especial', 'main', 'Telmex Colombia S.A.', 'decline', 'IrrelevantSite', 'live', 'SA', 'physical'
words_to_image_desc = randomValues(obj).slice(0, 6).join(',');
const image_description_query_prefix = "Generate a creative image description with the following words:"
const image_description_query = `${image_description_query_prefix} ${words_to_image_desc}`

console.log(image_description_query)


const OPENAI_API_KEY="Get this from your openai account"
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

;(async ()=>{
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: image_description_query,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const generated_description= response.data.choices[0].text.trim()

    const image_elements = getRandomValuesFromEachArrayInObj(image_element_options)
    const full_desc = `A ${image_elements["adjectives"]} ${image_elements["style"]} of ${generated_description} in style of ${image_elements["artists"]}`


    console.log(full_desc)
})();


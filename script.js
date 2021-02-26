const APIKEY = "a42f5bcf5338423d940201838938a60d0b006a13";

document.getElementById("wordSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("wordInput").value;
    if (value === "")
        return;

    let url = "https://owlbot.info/api/v4/dictionary/" + value;
    let params = {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + APIKEY
        }
    }
    fetch(url, params)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let results = "";

        if (json.word) {
            results += "<h1>" + json.word + "</h1><br>";
            results += "<p>" + json.pronunciation + "</p><br>";

            for (let i=0; i < json.definitions.length; i++) {
                results += "<div class='definition'>";
                results += "<p><em>" + json.definitions[i].type + "</em></p>";
                results += "<p>" + json.definitions[i].definition + "</p>";

                if (json.definitions[i].example) {
                    results += "<p>Example: " + json.definitions[i].example + "</p>";
                }

                if (json.definitions[i].image_url) {
                    results += "<img src='" + json.definitions[i].image_url + "'/>";
                }

                results += "</div><br>";
            }
        }
        else {
            results += "<h2>" + json[0].message + "</h2>";
        }
        document.getElementById("search-results").innerHTML = results;
      });


    let url2 = "https://wordsapiv1.p.rapidapi.com/words/" + value + "/synonyms";
    let params2 = {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "64648a3222mshccb088f2b3282f8p1bfbd9jsnd7d503c6c22e",
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "useQueryString": true
        }
    }
    fetch(url2, params2)
    .then(function(response) {
        return response.json();
    }).then(function(json2) {

        if (json2.word) {
            let results2 = "";

            results2 += "<h2>Synonyms:</h2>";

            for (let k=0; k < json2.synonyms.length; k++) {
                results2 += "<p>" + json2.synonyms[k] + "</p>";
            }

            document.getElementById("synonyms").innerHTML = results2;
        }
    });

    let url3 = "https://wordsapiv1.p.rapidapi.com/words/" + value + "/antonyms";
    fetch(url3, params2)
    .then(function(response) {
        return response.json();
    }).then(function(json3) {

        if (json3.word) {
            let results3 = "";

            results3 += "<h2>Antonyms:</h2>";

            if (json3.antonyms.length > 0) {
                for (let l=0; l < json3.antonyms.length; l++) {
                    results3 += "<p>" + json3.antonyms[l] + "</p>";
                }
            }
            else {
                results3 += "<p>No antonyms</p>";
            }

            document.getElementById("antonyms").innerHTML = results3;
        }
    });

    let url4 = "https://wordsapiv1.p.rapidapi.com/words/" + value + "/rhymes";
    fetch(url4, params2)
    .then(function(response) {
        return response.json();
    }).then(function(json4) {

        if (json4.word) {
            let results4 = "";

            results4 += "<h2>Rhyming words:</h2>";

            if (json4.rhymes.all.length > 0) {
                for (let m=0; m < json4.rhymes.all.length; m++) {
                    results4 += "<p>" + json4.rhymes.all[m] + "</p>";
                }
            }
            else {
                results4 += "<p>No rhyming words</p>";
            }

            document.getElementById("rhymes").innerHTML = results4;
        }
    });

});
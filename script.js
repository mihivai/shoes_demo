const url = "https://raw.githubusercontent.com/mihivai/shoes_demo/main/products_202112030250.csv"

const card = (product) => {
    return `<div class="col-md-4">
    <div class="card" style="width: 18rem;">
    <img src="${product[4]}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${product[1]}</h5>
    <p class="card-text">${product[3]}</p>
    <a href="#" class="btn btn-primary">${product[2]} €</a>
    </div>
    </div>
    </div>`
}

// const url = "https://raw.githubusercontent.com/Joz84/test_num_job/main/products.csv"
// 
// const card = (product) => {
//     return `<div class="col-md-4">
//     <div class="card" style="width: 18rem;">
//         <img src="${product[4]}" class="card-img-top" alt="...">
//         <div class="card-body">
//         <h5 class="card-title">${product[1]}</h5>
//         <p class="card-text">${product[3]}</p>
//         <a href="#" class="btn btn-primary">${product[2]} €</a>
//         </div>
//     </div>
//     </div>`
// }


function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

const productsContainer = document.querySelector("#products");

fetch(url)
  .then(response => response.text())
  .then((data) => {

      const products = CSVToArray( data, ',' )
      console.dir(products)
    let i = 0
    products.forEach((product) => {
        if (i > 0 && i < products.length - 1) {
            console.dir(product)
            productsContainer.insertAdjacentHTML("beforeend", card(product)) 
        }
        i += 1
    })
  });
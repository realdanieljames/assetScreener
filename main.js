// const fs = require('fs');

// const file = fs.readFileSync('./CSVdata/btc_aug22_test.csv', 'utf-8')
// const rows = file.split('\n')
// for (const row of rows) {
//     const cells = row.split(',')
//     console.log(cells[4])
// }
// console.log(file)


let rowData = []



// Load CSV onto WebPage
const assetScreener = function () {
    $(document).ready(function () {

        $.ajax({
            url: "./CSVdata/btc_aug22.csv",
            dataType: "text",
            success: function (data) {
                // split CSV rows
                let asset_data = data.split(/\r?\n|\r/);
                let table_data = '<table class="table table-bordered table-striped">';
                for (let count = 0; count < asset_data.length; count++) {
                    let cell_data = asset_data[count].split(",");

                    //create object for organization
                    let obj = {
                        ticker: cell_data[0],
                        last: cell_data[1],
                        RSI: cell_data[2],
                        EMA100: cell_data[3],
                        EMA200: cell_data[4],
                        exchange: cell_data[5],
                        tradedVolume: cell_data[6],
                    }

                    rowData.push(obj)


                    table_data += '<tr>';
                    for (let cell_count = 0; cell_count < cell_data.length; cell_count++) {
                        if (count === 0) {
                            table_data += '<th>' + cell_data[cell_count] + '</th>';
                        }
                        else {
                            table_data += '<td>' + cell_data[cell_count] + '</td>';
                        }
                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';
                $('#asset_table').html(table_data);


                // for(const row of rowData){

                //     console.log(row)
                // }


                // * make a function that can take every row out of your table. 
                //  You could do a `querySelectorAll` for each `tr` and then call its `.remove`, is one way! 
                //  Try calling it and see if it empties your table.
                const tableRows = document.querySelectorAll('tr');
                const removeRows = function () {
                    for (let row of tableRows) {
                        row.remove()
                    }
                }

                const collapseButton = document.querySelector('#collapse_data');
                collapseButton.addEventListener('click', removeRows)



                //  * make a separate function that can go through your array of objects and make a `<tr>` out of each, putting it on the DOM.
                //   Check the code for the basic format, it's totally great to steal from it!
                const makeTr = function (arrayOfObjects) {
                    let tRows = document.createElement('tr');
                    let tableBody = document.querySelector('tbody');
                    for (const item of arrayOfObjects) {
                        tRows.innerText = item
                        tableBody.appendChild(tRows)
                        // console.log(item)
                    }

                }
                // makeTr(rowData)

                //* make an event listener for each of the headings. 
                //  To test, try logging out the name of the heading when it's clicked
                const printHeading = function (object) {
                    console.log(object.target.innerText)
                }
        
                
                let sortArray = [];
                const sortData = function (object) {
                    
                    for (let item of object){
                        sortArray.push(item.exchange)
                        // console.log(item.exchange)
                    }
                    sortArray = sortArray.sort()
                    // console.log(sortArray)
                    
                }
                // let heading = object.target.innerText
                // sortArray.push(heading)
                // console.log(heading)
                // }
                sortData(rowData)
                
                const tableHeading = document.querySelectorAll('th')

                for(const item of tableHeading) {
                item.addEventListener('click', printHeading)

                // item.addEventListener('click', sortData)
                // console.log(item)
            }

            

            // console.log(sortArray)


        }
        });
})
};


// this allows is to load back the data after it has been removed by collapse button
const loadDataButton = document.querySelector('#load_data');
loadDataButton.addEventListener('click', assetScreener)
assetScreener()




//   the event listener for exchange can come first, see if you can, when it's clicked, 
//  sort the data alphabetically by its `.exchange` property. 
//  Then call your DOM functions and see if you get sorted data on your page.

const menu = document.getElementById("position")

//get applicants
let posis = []
fetch('/positions').then((response) => {
    if(response.status == 400){
        console.log('Error receiving positions')
    }
    response.json().then((data) => {
        posis = data
        console.log(posis)
        posis.forEach(element => {
            menu.innerHTML += 
              "<option value='"+element.name+"'>"+element.name+"</option>"
        });
    })
})
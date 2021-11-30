const posi = document.getElementById("position")
const button = document.getElementById("posButton")

button.addEventListener('click', (e) => {
    e.preventDefault()
    const name = posi.value
    console.log('click!')
    fetch('/position?name=' + name).then((response) => {
        if(response.status == 400){
            posi.textContent = "Invalid Position"
        }
    })
})
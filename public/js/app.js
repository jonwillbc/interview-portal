const pinForm = document.querySelector('form')
const search = document.querySelector('#auth')
const button = document.querySelector('button')
const messageOne = document.querySelector('#message-1')

button.addEventListener('click', (e) => {
    e.preventDefault()

    const pin = search.value

    messageOne.textContent = 'Authenticating...'

    fetch('/users?pin=' + pin).then((response) => {
        if(response.status == 400){
            messageOne.textContent = 'Invalid PIN'
        }
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Welcome!'
                window.location.href = '/interviewer'
            }
        })
    })
    messageOne.textContent = 'Invalid PIN' 
})
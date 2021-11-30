const list = document.getElementById("list")
const pdf = document.getElementsByTagName('embed')
//console.log(pdf)

let apps = []
fetch('/applicants').then((response) => {
    if(response.status == 400){
        messageOne.textContent = 'Error receiving applicants'
    }
    response.json().then((data) => {
        apps = data
        console.log(apps)
        let count = 0
        console.log(count.toString())
        apps.forEach(element => {
            let idStr = count.toString();
            list.innerHTML += 
              "<button type = 'submit' id = '"+idStr+"'>"+element.name+"</button><br><br>"
            count++
        });
        for (let i = 0; i < apps.length; i++) {
            document.getElementById(i).onclick = function() {
                const fp = 'applications/' + apps[i].filepath.replace('public\\applications\\','')
                //console.log(fp)
                pdf[0].setAttribute("src", fp)
                document.getElementById('name').innerHTML += apps[i].name
                document.getElementById('phone').innerHTML += apps[i].phone
                document.getElementById('email').innerHTML += apps[i].email
            }
        }
    })

    /*const buttons
    document.getElementsByTagName('button').onclick = function() {
        console.log('button: ' + this.id);
    }*/
    /*for (let i = 0; i < apps.length; i++) {
        document.getElementById(i).onclick = function() {
            alert(this.id)
        }
    } */
    

})


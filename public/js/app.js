const form = document.getElementById('f1')
const search = document.getElementById('search')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')
const p3 = document.querySelector('.p3')
const p4 = document.querySelector('.p4')
const p5 = document.querySelector('.p5')
const p6 = document.querySelector('.p6')

form.addEventListener('submit',  (e)=>{
    e.preventDefault()
    const location = search.value // without creating this variable and setting it to the value of the above search variable, the fetch API return undefined results
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                p1.textContent = 'Error: '+data.error
            }else{
                p1.textContent = `Place: ${data.Place}`
                p2.textContent = `Latitude: ${data.Latitude}`
                p3.textContent = `Longitude: ${data.Longitude}`
                p4.textContent = `Temperature: ${data.temperature}`
                p5.textContent = `Wind Speed: ${data.wind_speed}`
                p6.textContent = `Humidity: ${data.humidity}`
            }
            
        })
    })
})
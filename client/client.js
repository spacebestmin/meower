console.log('hello world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';
loadingElement.style.display = 'none'; 

form.addEventListener('submit', (event) => {
    event.preventDefault(); //it prevented reloading the whole page
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content,
    };

    form.style.display = 'none'; 
    loadingElement.style.display = ''; 
    //passing the url that we are sending the data
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew), 
        //turn it into something that the server can understand
        headers: {
            'content-type': 'application/JSON'
        }
    })
    .then(response => response.json())
    .then(createdMew => {
        console.log(createdMew);
    });
    
});


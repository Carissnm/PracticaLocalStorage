//variables
const textarea = document.querySelector('#tweet')
const botonAgregar = document.querySelector('.button');
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario')

let tweets = [];

//eventos
addEvents();
function addEvents() {
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        crearHTML(tweets);
    });
    
    formulario.addEventListener('submit', agregarTweet);

}




//functions
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;
    
    
    if(tweet === '') {
        mostrarError('El campo debe completarse');
        textarea.classList.add('borde-error');

        setTimeout(() => {
            textarea.classList.remove('borde-error');
        }, 3000)
        return; //evito que se siga ejecutando más línea de código
    } else {

        const tweetObj = {
            id: Date.now(),
            tweet
        };
        tweets = [...tweets, tweetObj];

        crearHTML(tweets);

        formulario.reset();
    }

    
}

function mostrarError(error) {
    const mensajeDeError = document.createElement('p');
    mensajeDeError.classList.add('error');

    mensajeDeError.textContent = error;

    formulario.appendChild(mensajeDeError);

    setTimeout(() => {
        mensajeDeError.remove();
    }, 3000)
};

function crearHTML() { 

    limpiarHTML();
    
    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet', 'borrar-tweet:hover');
            btnEliminar.innerText = "x";
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

function limpiarHTML() {
    while( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    };
}

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
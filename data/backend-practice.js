const xhr = new XMLHttpRequest(); //creates new object

//set-up event-listner first them sed request
xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev');  //set up request
xhr.send();  //sends request

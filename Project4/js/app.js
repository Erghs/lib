let todoList = [];

function saveInformation(){
    autoVladelecF=document.getElementById("name").value;
    autoVladelecI=document.getElementById("book").value;
    marka=document.getElementById("izd").value;

   
    
    var lastinp={
    "avtor":autoVladelecF,
    "book":autoVladelecI,
    "izdatelstvo":marka,
    
    }
   
    todoList.push(lastinp);

    localStorage.setItem ('lastinp', JSON.stringify(todoList));
    }
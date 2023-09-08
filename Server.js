const word = "Hello World";
let i = 0;
function typeWord() {
    if (i < word.length) {
        document.getElementById("word").innerHTML += word.charAt(i);
        i++;
        setTimeout(typeWord, 200);
    }
}
typeWord();

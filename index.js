import { onValue, ref, set, push, remove, db, app} from "./firebase.js";

// remove(ref(db, "/players/"));

const branch = ref(db, "/players");

let first = false;
let second = false;

// if(first || second)
// {
//     // remove(ref(db, "/players/"));
// }
// else{
//     remove(ref(db, "/players/"));
// }

let firstName;
let secondName;

let firstChoice;
let secondChoice;

let sender;

onValue(branch, () =>
{
    if(firstChoice != undefined && secondChoice != undefined)
    {
        determineWinner(firstChoice, secondChoice);
    }
});

onValue(ref(db, "/players/1"), (snapshot) =>
{
    let data = snapshot.val();
    if(data != null)
    {
        $("#player1-name").text(data.name);
        first = true;
        firstChoice = data.choice;
    }

    else{
        $("#player1-name").text("Waiting for player 1");
    }
});

onValue(ref(db, "/players/2"), (snapshot) =>
{
    let data = snapshot.val();
    if(data != null)
    {
        $("#player2-name").text(data.name);
        second = true;
        secondChoice = data.choice;
    }

    else{
        $("#player2-name").text("Waiting for player 2");
    }
});

let start = () =>
{
    if(!first)
    {
        firstName = $("#name").val() || "Player 1";
        set(ref(db, "/players/1"), {
            name: $("#name").val() || "Player 1"
        });
        
        sender = firstName;
        $(".buttons-1").show();       
    }

    else{
        secondName = $("#name").val() || "Player 2";
        set(ref(db, "/players/2"), {
            name: $("#name").val() || "Player 2"
        });
        
        sender = secondName;
        $(".buttons-2").show();
    }

    $("#name").val("");
    $("#start-button").hide();
    $("#name").hide();
}

let makeChoice = (button) =>
{
    if(button.classList.contains("player1-buttons"))
    {
        set(ref(db, "/players/1"), {
            name: firstName,
            choice: button.innerText
        });

        $("#player1-choice").html("<h1>" + button.innerText + "</h1>");
    }

    else if(button.classList.contains("player2-buttons"))
    {
        set(ref(db, "/players/2"), {
            name: secondName,
            choice: button.innerText
        });

        $("#player2-choice").html("<h1>" + button.innerText + "</h1>");
    }

    $(".buttons").hide();
}

let determineWinner = (first, second) =>
{
    if(first === second)
    {
        $("#result").html("");
        $("#result").append("<h1>" + "DRAW" + "</h1>");

        $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
        $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
    }

    else if(firstChoice == "Rock")
    {
        if(secondChoice == "Paper")
        {
            $("#result").html("");
            $("#result").append("<h1>" + "Paper wins" + "</h1>");

            $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
            $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
        }

        else{
            $("#result").html("");
            $("#result").append("<h1>" + "Rock wins" + "</h1>");

            $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
            $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
        }
    }

    else if(firstChoice == "Paper"){
        if(secondChoice == "Rock")
        {
            $("#result").html("");
            $("#result").append("<h1>" + "Paper wins" + "</h1>");

            $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
            $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
        }
        else{
            $("#result").html("");
            $("#result").append("<h1>" + "Scissors wins" + "</h1>");

            $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
            $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
        }
    }
    else if(firstChoice == "Scissors"){
        if(secondChoice == "Rock")
        {
            $("#result").html("");
            $("#result").append("<h1>" + "Rock wins" + "</h1>");

            $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
            $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
        }
        else{
            $("#result").html("");
            $("#result").append("<h1>" + "Scissors wins" + "</h1>");

            $("#player1-choice").html("<h1>" + firstChoice + "</h1>");
            $("#player2-choice").html("<h1>" + secondChoice + "</h1>");
        }
    }

    remove(ref(db, "/players"));
    remove(ref(db, "/gameMessages"));
}


let send = () =>
{
    let messagePush = push(ref(db, "/gameMessages"));
    let message = $("#message").val();
    $("#message").val("");
    set(messagePush, {
        sender,
        message
    })
}

onValue(ref(db, "/gameMessages"), (snapshot) =>
{
    let messages = Object.entries(snapshot.val());
    $("#chat").html("");
    for(let message of messages)
    {
        $("#chat").append("<div>" + message[1].sender + " says: " + message[1].message + "</div>");
        // console.log(message);
    }
})

window.start = start;
window.makeChoice = makeChoice;
window.send = send;
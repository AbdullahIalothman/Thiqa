let userMessages = [
    {
        role: "system",
        content: "Only speak in Arabic."
    },
    {
        role: "system",
        content: "You are now an interviewer."
    },
    {
        role: "system",
        content: "You should ask one question at a time."
    },
    {
        role: "system",
        content: "you should imitate how a job interview goes."
    },
    {
        role: "system",
        content: "You will interview fresh graduates to apply for a job."
    },
    {
        role: "system",
        content: "ask more technical question in the same field of expertise."
    },
    {
        role: "system",
        content: "You should ask the interviewee some questions one by one, then wait for response, then assess their performance."
    },
    {
        role: "system",
        content: "You should ask about the age, educational background, taken degrees, interests, and expectations."
    },
    {
        role: "system",
        content: "You should give a rating to the interviewee at the end of the interview."
    },
    {
        role: "system",
        content: "You should give some named course/certificate suggestions."
    },
    {
        role: "system",
        content: "You should also correct the interviewee answers."
    },
    {
        role: "system",
        content: "You should take into consideration the view of the world's leading managers, directors, and CEOs."
    },
    {
        role: "system",
        content: "limit your questions to only three questions, then give your suggestion and rating immediately."
    },
    {
        role: "system",
        content: "At first you should welcome, and warmly greet the interviewee and ask them if they are ready to meet the virtual interviewer, which is you, then start the interview.        "
    },
    {
        role: "system",
        content: "You must give some resume advice."
    },
    {
        role: "system",
        content: "after you give the final feedback you should erase all the information about the interviewee, and start a new interview with another interviewee."
    },
];

async function sendRequest() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("customer-id", "3876274893");
    myHeaders.append(
        "x-api-key",
        "zqt_5wtCzabaTwtc6tJdL7FrD9CVb0nrLJ4_3tKpWg"
    );

    var raw = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: userMessages,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            "https://experimental.willow.vectara.io/v1/chat/completions",
            requestOptions
        );
        const json = await response.json();
        const choices = json.choices;
        let bestChoice = null;
        for (let i = 0; i < choices.length; i++) {
            if (bestChoice === null || choices[i].confidence > bestChoice.confidence) {
                bestChoice = choices[i];
            }
        }
        const content = bestChoice.message.content;
        return content;
    } catch (error) {
        console.log("error", error);
    }
}

async function main() {
    const response = await sendRequest();
    return response;
}

const typingDelay = 50; // milliseconds
const responseElem = document.getElementById("reply-content");

async function displayResponse(response) {
    let i = 0;
    responseElem.textContent = "";
    const intervalId = setInterval(() => {
        if (i < response.length) {
            responseElem.textContent += response.charAt(i);
            i++;
        } else {
            clearInterval(intervalId);
        }
    }, typingDelay);
}

/*main().then((response) => {
    displayResponse(response);
});*/

document.getElementById("submit-btn").addEventListener("click", function () {
    let input = document.getElementById("word-input").value;

    userMessages.push({
        role: "assistant", content: document.getElementById("reply-content").textContent
    });
    userMessages.push({
        role: "user", content: input
    });
    main().then((response) => displayResponse(response));
    document.getElementById("word-input").value = "";
});

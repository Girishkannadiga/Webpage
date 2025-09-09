let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        const userMessage = event.results[0][0].transcript;
        appendMessage(userMessage, "user");
        document.getElementById("loading").style.display = 'block';

        const botResponse = getBotResponse(userMessage);
        appendMessage(botResponse, "bot");
        speakResponse(botResponse);
        document.getElementById("loading").style.display = 'none';
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error", event.error);
    };
} else {
    alert("Speech recognition is not supported in your browser.");
}

function startSpeechRecognition() {
    recognition.start();
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function speakResponse(botResponse) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(botResponse);
    utterance.lang = 'en-US';
    utterance.pitch = 1.2;
    utterance.rate = 1;
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.name.includes("Female")) || voices[0];

    speechSynthesis.speak(utterance);
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase().trim();

    const keywordResponses = {
        "hod": "The HOD of the CSE department is Dr. Pushpa.",
        "who created you": "I was created by Girish K C from the CSE section.",
        "location": "Akshaya Institute of Technology is located in Tumkur.",
        "fee": "Contact office or our official website for fee details.",
        "branches": "The branches available at AIT are: CSE, ISE, EC, ME, CIVIL, AGRI and SMART AGRI.",
        "fac

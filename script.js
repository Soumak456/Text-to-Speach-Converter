let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("#listenButton").addEventListener("click", () => {
    const text = document.querySelector("textarea").value;
    speech.text = text;
    window.speechSynthesis.speak(speech);

    // After the speech synthesis, generate a downloadable audio file
    speech.onend = () => {
        const audioBlob = new Blob([new Uint8Array(speech.audioBuffer)], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = "speech.wav";
        a.style.display = "none";
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(audioUrl);
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const readAloudBtn = document.getElementById('read-aloud-btn');
    const storyTextContainer = document.getElementById('story-text');
    let audio = null;

    readAloudBtn.addEventListener('click', async () => {
        if (readAloudBtn.disabled) {
            return;
        }

        readAloudBtn.disabled = true;
        readAloudBtn.textContent = 'Generating audio...';

        try {
            const storyText = storyTextContainer.innerText;
            
            const result = await websim.textToSpeech({
                text: storyText,
                voice: "en-female", 
            });

            readAloudBtn.textContent = 'Playing...';
            audio = new Audio(result.url);
            audio.play();

            audio.onended = () => {
                readAloudBtn.disabled = false;
                readAloudBtn.textContent = 'Read Aloud';
                audio = null;
            };

        } catch (error) {
            console.error('Error with text-to-speech:', error);
            readAloudBtn.disabled = false;
            readAloudBtn.textContent = 'Try Again';
            alert('Sorry, there was an error generating the audio. Please try again.');
        }
    });
});


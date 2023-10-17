document.addEventListener("DOMContentLoaded", () => {
    // Fetching character data from the server
    fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(charactersData => {
        // Displaying character names in the character bar
        const characterBar = document.getElementById("character-bar");
  
        charactersData.forEach(character => {
          const span = document.createElement("span");
          span.textContent = character.name;
          span.addEventListener("click", () => displayCharacterDetails(character));
          characterBar.appendChild(span);
        });
      });
  
    // Function to display character details in detailed-info
    function displayCharacterDetails(character) {
      
      const detailedInfo = document.getElementById("detailed-info");
      const name = document.getElementById("name");
      const image = document.getElementById("image");
      const voteCount = document.getElementById("vote-count");
      const votesForm = document.getElementById("votes-form");
      const resetButton = document.getElementById("reset-btn");
  
      name.textContent = character.name;
      image.src = character.image;
      voteCount.textContent = "Total Votes: " + character.votes;
  
      votesForm.onsubmit = event => {
        event.preventDefault();
        const votesInput = document.getElementById("votes");
        const votes = parseInt(votesInput.value, 10);
        if (!isNaN(votes)) {
          character.votes += votes;
          voteCount.textContent = "Total Votes: " + character.votes;
  
          // Updating the votes on the server
          updateVotesOnServer(character.id, character.votes);
  
          votesInput.value = "";
        }
      };
  
      resetButton.addEventListener("click", () => {
        character.votes = 0;
        voteCount.textContent = "Total Votes: 0";
  
        // Resetting the votes on the server
        updateVotesOnServer(character.id, 0);
      });
    }
  
    // Function to update character votes on the server
    function updateVotesOnServer(characterId, votes) {
      fetch(`http://localhost:3000/characters/${characterId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes }),
      });
    }
  
    // Adding a new character to the page and the server
    const characterForm = document.getElementById("character-form");
    characterForm.addEventListener("submit", event => {
      event.preventDefault();
      const nameInput = document.getElementById("name");
      const imageInput = document.getElementById("image-url");
  
      const newCharacter = {
        name: nameInput.value,
        image: imageInput.value,
        votes: 0,
      };
  
      // Adding the new character to the page
      addCharacterToPage(newCharacter);
  
      // Saving the new character to the server
      saveCharacterToServer(newCharacter);
  
      nameInput.value = "";
      imageInput.value = "";
    });
  
    function addCharacterToPage(character) {
      const characterBar = document.getElementById("character-bar");
      const span = document.createElement("span");
      span.textContent = character.name;
      span.addEventListener("click", () => displayCharacterDetails(character));
      characterBar.appendChild(span);
    }
  
    function saveCharacterToServer(character) {
      fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
      });
    }
  });

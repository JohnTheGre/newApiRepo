const fetchSquad = (teamId) => {
    let url = new URL('https://api-football-v1.p.rapidapi.com/v3/players/squads');
    url.search = new URLSearchParams({ team: teamId }).toString(); // Fetch squad by team ID

    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2c6eb7c7bbmshd99e3255770635dp18ffc8jsn14aabfbc8fd5',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(response => {
        const playersDomElement = document.getElementById("players");
        playersDomElement.innerHTML = ''; // Clear existing content

        if (response.response && response.response.length > 0) {
            const players = response.response[0].players; // Adjust based on actual API response structure

            players.forEach(player => {
                // Create container div
                const container = document.createElement("div");
                container.classList.add("relative", "p-4", "bg-white", "rounded-lg", "shadow-lg", "text-center");

                // Create paragraph for player name
                const paragraph = document.createElement("p");
                paragraph.classList.add("text-lg", "font-bold", "mt-4");
                paragraph.textContent = `${player.name}`;

                // Create image element
                const img = document.createElement("img");
                img.classList.add("w-24", "h-24", "object-cover", "rounded-full", "border-2", "border-white", "shadow-md");
                img.src = `${player.photo}`;

                // Append elements to container
                container.appendChild(img);
                container.appendChild(paragraph);

                // Append container to playersDomElement
                playersDomElement.appendChild(container);
            });
        } else {
            console.error('No players data available.');
        }
    })
    .catch(err => {
        console.log(err);
    });
};

// Extract teamId from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get('teamId');

if (teamId) {
    fetchSquad(teamId);
} else {
    console.error('No team ID provided in query parameters.');
}

function navigateToBack() {
    window.location.href = "index.html";
}

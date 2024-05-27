const fetchLeagues = () => {
    let url = new URL('https://api-football-v1.p.rapidapi.com/v3/leagues');

    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2c6eb7c7bbmshd99e3255770635dp18ffc8jsn14aabfbc8fd5',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.response && response.response.length > 0) {
            const leagues = response.response.slice(0, 20); // Get the first 29 leagues
            const leaguesDomElement = document.getElementById("leagues");

            leagues.forEach(leagueData => {
                const league = leagueData.league;

                // Create container div
                const container = document.createElement("div");
                container.classList.add("relative", "p-4", "bg-white", "rounded-lg", "shadow-lg", "text-center", "transition", "transform", "hover:scale-105");

                // Create paragraph for league name
                const paragraph = document.createElement("p");
                paragraph.classList.add("text-lg", "font-bold", "mt-4");
                paragraph.textContent = `${league.name}`;

                // Create image element
                const img = document.createElement("img");
                img.classList.add("hidden", "absolute", "top-0", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "w-24", "h-24", "object-cover", "rounded-full", "border-2", "border-white", "shadow-md");
                img.src = `${league.logo}`;

                // Add event listener for mouseover to show the image
                container.addEventListener("mouseover", () => {
                    img.classList.remove("hidden");
                });

                // Add event listener for mouseout to hide the image
                container.addEventListener("mouseout", () => {
                    img.classList.add("hidden");
                });

                // Append elements to container
                container.appendChild(paragraph);
                container.appendChild(img);

                // Append container to leaguesDomElement
                leaguesDomElement.appendChild(container);
            });
        } else {
            console.error('No response data available.');
        }
    })
    .catch(err => {
        console.log(err);
    });
};

// Fetch all leagues
fetchLeagues();

function toggleSidebar() {
    const sidebar = document.getElementById('mySidebar');
    const isOpen = sidebar.classList.toggle('hidden');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    sidebarToggle.setAttribute('aria-expanded', isOpen);
}

function menu_close() {
    document.getElementById("mySidebar").classList.add('hidden');
}

function navigateToBack() {
    window.history.back();
}
const fetchTeam = (params) => {
    let url = new URL('https://api-football-v1.p.rapidapi.com/v3/teams');
    url.search = new URLSearchParams(params).toString();

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
            const team = response.response[0].team;
            const footballDomElement = document.getElementById("football");

            // Create link element wrapping the entire container
            const link = document.createElement("a");
            link.href = `players.html?teamId=${team.id}`;
            link.classList.add("block", "relative", "p-4", "bg-white", "rounded-lg", "shadow-lg", "text-center", "transition", "transform", "hover:scale-105");

            // Create paragraph for team name
            const paragraph = document.createElement("p");
            paragraph.classList.add("text-lg", "font-bold", "mt-4");
            paragraph.textContent = `${team.name}`;

            // Create image element
            const img = document.createElement("img");
            img.classList.add("hidden", "absolute", "top-0", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "w-24", "h-24", "object-cover", "rounded-full", "border-2", "border-white", "shadow-md");
            img.src = `${team.logo}`;

            // Add event listener for mouseover to show the image
            link.addEventListener("mouseover", () => {
                img.classList.remove("hidden");
            });

            // Add event listener for mouseout to hide the image
            link.addEventListener("mouseout", () => {
                img.classList.add("hidden");
            });

            // Append elements to link
            link.appendChild(paragraph);
            link.appendChild(img);

            // Append link to footballDomElement
            footballDomElement.appendChild(link);
        } else {
            console.error('No response data available.');
        }
    })
    .catch(err => {
        console.log(err);
    });
};

// Fetch teams by IDs
const teamIds = [40, 541, 33, 50, 49, 42, 197];
teamIds.forEach(id => fetchTeam({ id }));

// Fetch team by name
fetchTeam({ name: 'barcelona' });

function toggleSidebar() {
    const sidebar = document.getElementById('mySidebar');
    const isOpen = sidebar.classList.toggle('hidden');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    sidebarToggle.setAttribute('aria-expanded', isOpen);
}

function menu_close() {
    document.getElementById("mySidebar").classList.add('hidden');
}
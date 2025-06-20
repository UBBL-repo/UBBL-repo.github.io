document.addEventListener("DOMContentLoaded", function () {
    fetch("cv.json")
        .then(response => response.json())
        .then(data => {
            displayPeople(data.members);
        })
        .catch(error => console.error("Error loading people.json:", error));
});

function displayPeople(members) {
    const container = document.getElementById("people-list");

    const categories = [
        "Principal Investigator",
        "Graduate Students",
        "Undergraduate Students",
        "Former Students"
    ];

    categories.forEach(category => {
        const sectionMembers = members.filter(m => m.category === category);
        if (sectionMembers.length === 0) return;

        // Section title
        const title = document.createElement("h2");
        title.textContent = category;
        container.appendChild(title);

        // Divider line
        const hr = document.createElement("hr");
        container.appendChild(hr);

        // Section container
        const sectionContainer = document.createElement("div");
        sectionContainer.classList.add("people-section");

        sectionMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("person-card");

            card.innerHTML = `
                <div class="person-left">
                    <img src="${member.image}" alt="${member.name}" class="person-image">
                </div>
                <div class="person-right">
                    <h3>${member.name}</h3>
                    <p><strong>${member.role}</strong></p>
                    <p>${member.bio}</p>
                </div>
            `;


            sectionContainer.appendChild(card);
        });

        container.appendChild(sectionContainer);
    });
}


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

            // Build social icons
            let linksHTML = '<div class="person-links">';
            if (member.website) {
                linksHTML += `<a href="${member.website}" target="_blank" title="Website"><i class="fas fa-globe"></i></a>`;
            }
            if (member.email) {
                linksHTML += `<a href="mailto:${member.email}" title="Email"><i class="fas fa-envelope"></i></a>`;
            }
            if (member.linkedin) {
                linksHTML += `<a href="${member.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
            }
            if (member.scholar) {
                linksHTML += `<a href="${member.scholar}" target="_blank" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>`;
            }
            linksHTML += '</div>';

            card.innerHTML = `
            <div class="person-left">
                <img src="${member.image}" alt="${member.name}" class="person-image">
                <div class="person-links">
                ${member.website ? `<a href="${member.website}" target="_blank" title="Website"><i class="fas fa-globe"></i></a>` : ''}
                ${member.email ? `<a href="mailto:${member.email}" title="Email"><i class="fas fa-envelope"></i></a>` : ''}
                ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
                ${member.scholar ? `<a href="${member.scholar}" target="_blank" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>` : ''}
                </div>
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


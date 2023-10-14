
const event_category = document.querySelectorAll('.event-category');

const events_container = document.querySelector('.events-list-wrapper');

// const category = document.querySelectorAll('.event-category p');

event_category.forEach((e) => {
    e.addEventListener('click', async (ele) => {
        let category = e.querySelector('p').innerText;

        if(e.classList.contains("selected")) {
            console.log("yes");

            e.style.backgroundColor="";
            category = "all";
            // removeSelected();
            e.classList.remove("selected");
        } else {
            removeSelected();
            e.classList.add("selected");
        }

        const events = await fetchEvents(category);

        if(!events.length) return displayEvents(`<h1 style="color: red;">No Event in this category !!!`);

       
        const events_html = getEventsHtml(events);
        displayEvents(events_html);

        
    })
})


const fetchEvents = async (category) => {
    const req = await fetch(`/events/category/${category}`);
    const data = await req.json();
    
    return data;
}

const getEventsHtml = (events) => {
    let html_structure = ""
    for(let event of events) {
        // console.log(event)
        const tag_html = getTagsHtml(event.tags);
        
        let dateObj = (new Date(event.date)).toString().split(" ");
        dateObj = dateObj[1] + " " + dateObj[2];
        // console.log(dateObj)
        
       html_structure += `<a class="event-item flex" href="/events/${event._id}">
            <img src="images/sample events/${event.image}" alt="" class="event-banner">
            <div class="event-content flex flex-column">
                <div class="event-title">
                    ${event.name}
                </div>
                <div class="event-tags flex flex-ai">
                    ${tag_html}
                </div>
                <div class="event-date">
                    ${dateObj}
                </div>
            </div>
        </a>`
    }
    return html_structure;
}


const getTagsHtml = (tags) => {
    let html_element = "";
    for(let tag of tags) {
        html_element += `<div class="event-tag">${tag}</div>`
    }
    return html_element;
}

const displayEvents = (events_html) => {
    events_container.innerHTML = events_html;
}

const removeSelected = () => {
    event_category.forEach((e) => {
        e.classList.remove("selected");
    })
}
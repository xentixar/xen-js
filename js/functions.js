export const drag = (element) => {
    element.style.cursor = "move";
    element.style.zIndex = "100000";
    element.setAttribute('draggable', 'true');
    element.setAttribute('id', 'draggable-' + Math.floor(Math.random() * 10000));
    element.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('draggedElementId', element.id);
    });

    document.body.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    document.body.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('draggedElementId');
        const draggedElement = document.getElementById(draggedElementId);
        const dropX = event.clientX - draggedElement.offsetWidth / 2;
        const dropY = event.clientY - draggedElement.offsetHeight / 2;
        draggedElement.style.position = 'absolute';
        draggedElement.style.left = dropX + 'px';
        draggedElement.style.top = dropY + 'px';
        event.target.appendChild(draggedElement);
    });
}

export const fetchData = (element) => {
    fetch(`${element.getAttribute('xen-fetch')}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

export const checkVariable = (element) => {
    const variableName = element.getAttribute('xen-if')
    const nextElement = element.nextElementSibling;

    if (variableName in window && (window[variableName] != null || window[variableName] != "")) {
        element.style.display = "block"
        if (nextElement && nextElement.hasAttribute('xen-else'))
            nextElement.style.display = "none"
    } else {
        element.style.display = "none"
        if (nextElement && nextElement.hasAttribute('xen-else')) {
            nextElement.style.display = "block"
        }
    }
}
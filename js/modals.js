// Function to open a modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.getElementsByTagName("body")[0].style.overflow = "hidden"
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.getElementsByTagName("body")[0].style.overflow = ""
}

// Close modal when user clicks outside the modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = ""
    }
}

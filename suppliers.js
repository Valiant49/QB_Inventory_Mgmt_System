function showForm() {
    const modal = document.getElementById("supplier-modal");
    modal.showModal();
}

function hideForm() {
    const modal = document.getElementById("supplier-modal");
    modal.close();
}

function showWarning() {
    const warningPopup = document.getElementById("supplier-warning");
    warningPopup.showModal();
}

function hideWarning() {
    const warningPopup = document.getElementById("supplier-warning");
    warningPopup.close();
}
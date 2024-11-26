var bookmarkNameInput = document.getElementById('bookmarkName');
var websiteUrlInput = document.getElementById('websiteUrl');

var bookmarks = [];

if (localStorage.getItem('allBookmarks') != null) {
    bookmarks = JSON.parse(localStorage.getItem('allBookmarks'));
    display();
}

function getInputsValue() {
    var bookmarkName = bookmarkNameInput.value.trim();
    var websiteUrl = websiteUrlInput.value.trim();

    // Validation checks
    var errorMessages = [];
    // Validates URLs starting with http/https
    var urlRegex = /^https?:\/\/[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}/;

    if (bookmarkName.length < 3) {
        errorMessages.push("Site name must contains at least 3 characters");
    }

    if (!urlRegex.test(websiteUrl)) {
        errorMessages.push("Site URL must be valid and starts with http or https");
    }

    if (bookmarks.some(bookmark => bookmark.name.toLowerCase() === bookmarkName.toLowerCase())) {
        errorMessages.push("Site name must be unique");
    }

    // If there are validation errors, show them and return
    if (errorMessages.length > 0) {
        displayValidationErrors(errorMessages);
        return;
    }

    // If valid, add bookmark
    var bookmark = {
        name: bookmarkName,
        url: websiteUrl
    };
    bookmarks.push(bookmark);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    display();

    // Clear inputs after successful submition
    bookmarkNameInput.value = "";
    websiteUrlInput.value = "";
}

function displayValidationErrors(errors) {
    document.getElementById('errorBox').style.visibility = "visible";
    var errorHtml = `
    ${errors.map(error => `<li><i class="fa-regular fa-circle-right p-2"></i>${error}</li>`).join('')}
    `;
    document.getElementById('errorRules').innerHTML = errorHtml;
}

function display() {
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarks[i].name}</td>
            <td>
                <button class="btn btn-outline-primary visit">
                    <a target="_blank" href="${bookmarks[i].url}"><i class="fa-solid fa-eye pe-2"></i> Visit</a>
                </button>
            </td>
            <td>
                <button onclick="deleteBookmark(${i})" class="btn delete btn-outline-danger pe-2">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </td>
        </tr>
        `;
    }
    document.getElementById('tableContent').innerHTML = cartona;
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    display();
}

function closeErrorBox() {
    document.getElementById('errorBox').style.visibility = "hidden";
}
function saveURLToLocalStorage(array: Array<Object>) {
    localStorage.setItem('urlList', JSON.stringify(array));
}
function getURLFromLocalStorage() {
    const urlListData = localStorage.getItem('urlList');
    return urlListData ? JSON.parse(urlListData) : [];
}
const MessageHandler = {
    saveURLToLocalStorage,
    getURLFromLocalStorage
}
export default MessageHandler
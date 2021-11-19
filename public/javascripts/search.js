window.addEventListener('DOMContentLoaded', (e) => {
    const serachButton = document.querySelector('.fa-search')
    const input = document.querySelector('.search-input')
    serachButton.addEventListener('click', e => {
        sendReq(input.value)
    })
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendReq(input.value)
        }
    })
    const sendReq = async (value) => {
        const data = { value }
        const res = await fetch(`/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
})

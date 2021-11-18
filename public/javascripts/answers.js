window.addEventListener('DOMContentLoaded', (e) => {
    const button = document.querySelector('.create-answer')
    const container = document.querySelector('.container')
    button.addEventListener('click', async (e) => {
        const form = document.querySelector('#answer-form')
        form.addEventListener("submit", (e) => {
            e.preventDefault()
        })
        e.preventDefault()
        console.log('hello')
        const formData = new FormData(form)
        const content = formData.get('content')
        let questionId = e.target.id
        console.log(questionId)
        const data = {
            content
        }
        const res = await fetch(`/questions/${questionId}/answer`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let resData = await res.json();
        let answersDiv = generateAnswerHtml(resData.message, content)
        insertAnswerTop(answersDiv, container)
        // const data = await res.json()
        // console.log(data)
        // if (data.message === "user created") {
        //     console.log('we did it')
        // }
    })
    const generateAnswerHtml = (id, content) => {
        const answersDiv = document.createElement('div')
        answersDiv.className = 'answers'
        const answersButtionDiv = document.createElement('div')
        answersButtionDiv.className = 'answers-button-container'
        const span = document.createElement('span')
        const aEdit = document.createElement('a')
        const aDelete = document.createElement('a')
        aEdit.href = `/answers/${id}/edit`
        aDelete.href = `/answers/${id}/delete`
        aEdit.className = "update-button"
        aDelete.className = "delete-button"
        aEdit.innerText = "Edit"
        aDelete.innerText = "Delete"
        span.innerText = content
        answersDiv.appendChild(span)
        span.appendChild(answersButtionDiv)
        answersButtionDiv.appendChild(aEdit)
        answersButtionDiv.appendChild(aDelete)
        return answersDiv
        // container.appendChild(answersDiv)
    }
    const insertAnswerTop = (answer, container) => {
        let newContainer = Array.from(container.children)
        newContainer.splice(2, 0, answer)
        container.innerHTML = ''
        newContainer.forEach(element => {
            container.appendChild(element)
        });
    }
})

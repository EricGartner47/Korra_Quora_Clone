window.addEventListener('DOMContentLoaded', (e) => {
    const addAnswerButton = document.querySelector('.create-comment')
    const container = document.querySelector('.container')
    const answersText = document.querySelector('#answers-Test')
    const form = document.querySelector('#comment-form')
    form.addEventListener("submit", (e) => {
        e.preventDefault()
    })
    // console.log(addAnswerButton)
    addAnswerButton.addEventListener('click', async (e) => {
        console.log(form)
        e.preventDefault()
        e.stopImmediatePropagation()
        // console.log('hello')
        const formData = new FormData(form)
        const content = formData.get('content')
        const answerId = e.target.id
        // console.log(questionId)
        const data = {
            content
        }
        const res = await fetch(`/answers/${answerId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        let commentsDiv = generateAnswerHtml(resData.message, content)
        insertAnswerTop(commentsDiv, container)
        const deleteCommentButton = document.querySelectorAll('.answer-delete-button')
        console.log(deleteCommentButton)
        deleteCommentButton.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault()
                const commentId = e.target.id
                const res = await fetch(`/comments/${commentId}/delete`, {
                    method: 'DELETE'
                })
                let resData = await res.json()
                const container = document.getElementsByClassName(resData.message)
                let arrayContainer = Array.from(container)
                arrayContainer[0].remove()
            })
        })
        answersText.value = ''
        // const data = await res.json()
        // console.log(data)
        // if (data.message === "user created") {
        //     console.log('we did it')
        // }
    })
    const generateAnswerHtml = (id, content) => {
        const answersDiv = document.createElement('div')
        answersDiv.classList.add('answers', id);
        const answersButtonDiv = document.createElement('div')
        answersButtonDiv.className = 'answers-button-container'
        const span = document.createElement('span')
        const aEdit = document.createElement('a')
        const aDelete = document.createElement('a')
        const aComment = document.createElement('a')
        aDelete.href = `/answers/${id}/delete`
        aDelete.className = "answer-delete-button"
        aDelete.id = id
        aDelete.innerText = "Delete"
        span.innerText = content
        answersDiv.appendChild(span)
        span.appendChild(answersButtonDiv)
        answersButtonDiv.appendChild(aDelete)
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

    const deleteCommentButton = document.querySelectorAll('.answer-delete-button')
    console.log(deleteCommentButton)
    deleteCommentButton.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault()
            const commentId = e.target.id
            const res = await fetch(`/comments/${commentId}/delete`, {
                method: 'DELETE'
            })
            let resData = await res.json()
            const container = document.getElementsByClassName(resData.message)
            let arrayContainer = Array.from(container)
            arrayContainer[0].remove()
        })
    })

})

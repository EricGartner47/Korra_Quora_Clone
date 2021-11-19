window.addEventListener('DOMContentLoaded', (e) => {
    const addAnswerButton = document.querySelector('.create-answer')
    const container = document.querySelector('.container')
    const answeresText = document.querySelector('#answers-Test')
    addAnswerButton.addEventListener('click', async (e) => {
        const form = document.querySelector('#answer-form')
        form.addEventListener("submit", (e) => {
            e.preventDefault()
        })
        e.preventDefault()
        // console.log('hello')
        const formData = new FormData(form)
        const content = formData.get('content')
        const questionId = e.target.id
        // console.log(questionId)
        const data = {
            content
        }
        const res = await fetch(`/questions/${questionId}/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        let answersDiv = generateAnswerHtml(resData.message, content)
        insertAnswerTop(answersDiv, container)
        const deleteAnswerButton = document.querySelectorAll('.answer-delete-button')
        deleteAnswerButton.forEach(button => {
            button.addEventListener('click', async (e)=> {
                e.preventDefault()
                const answerId = e.target.id
                const res = await fetch(`/answers/${answerId}/delete`, {
                    method: 'DELETE'
                })
                let resData = await res.json()
                const container = document.getElementsByClassName(resData.message)
                let arrayContainer = Array.from(container)
                arrayContainer[0].remove()

            })
        })
        answeresText.value = ''
        // const data = await res.json()
        // console.log(data)
        // if (data.message === "user created") {
            //     console.log('we did it')
            // }
        })
        const generateAnswerHtml = (id, content) => {
            const answersDiv = document.createElement('div')
            // answersDiv.className = ('answers', id)
            answersDiv.classList.add('answers', id);

            // answersDiv.className = 'answers'
            const answersButtionDiv = document.createElement('div')
            answersButtionDiv.className = 'answers-button-container'
            const span = document.createElement('span')
            const aEdit = document.createElement('a')
            const aDelete = document.createElement('a')
            const aComment = document.createElement('a')
            aComment.href = `/answers/${id}/comment`
            aEdit.href = `/answers/${id}/edit`
            aDelete.href = `/answers/${id}/delete`
            aEdit.className = "answer-update-button"
            aDelete.className = "answer-delete-button"
            aComment.className = "answer-comment-button"
            aEdit.id = id
            aDelete.id = id
            aComment.id = id
            aEdit.innerText = "Edit"
            aDelete.innerText = "Delete"
            span.innerText = content
            aComment.innerText = "Comment"
            answersDiv.appendChild(span)
            span.appendChild(answersButtionDiv)
            answersButtionDiv.appendChild(aComment)
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
    const deleteAnswerButton = document.querySelectorAll('.answer-delete-button')
    deleteAnswerButton.forEach(button => {
        button.addEventListener('click', async (e)=> {
            e.preventDefault()
            const answerId = e.target.id
            const res = await fetch(`/answers/${answerId}/delete`, {
                method: 'DELETE'
            })
            let resData = await res.json()
            const container = document.getElementsByClassName(resData.message)
            let arrayContainer = Array.from(container)
            arrayContainer[0].remove()
        })
    })

})

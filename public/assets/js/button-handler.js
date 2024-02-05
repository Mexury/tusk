const buttons = document.querySelectorAll('button')

const buttonCallbacks = new Map([
    ['modals/open/new_board', async (button, e) => {
        // const json = await response.json()
        // if (json.success) window.location.replace('/')
    }]
])

if (buttons) {
    buttons.forEach((button, index) => {
        button.addEventListener('click', e => {
            if (button.hasAttribute('@click')) {
                let atClick = button.getAttribute('@click')
                console.log(atClick)
            }
            if (button.hasAttribute('@click:eval')) {
                let atClickEval = button.getAttribute('@click:eval')
                try {
                    eval(atClickEval)
                } catch (error) {
                    console.error(error)
                }
            }
        })
    })
}
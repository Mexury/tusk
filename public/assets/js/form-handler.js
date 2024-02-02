const forms = document.querySelectorAll('form')

JSON.parseFormData = (formData) => {
    let jsonObject = {}

    formData.forEach((value, key) => {
        jsonObject[key] = jsonObject[key] ? [...[].concat(jsonObject[key]), value] : value
    })

    return jsonObject
}

const formNames = new Map()

const formCallbacks = new Map([
    ['login_form', async (form, response) => {
        const json = await response.json()
        if (json.success) window.location.replace('/')
    }],
    ['register_form', async (form, response) => {
        const json = await response.json()
        if (json.success) window.location.replace('/login')
    }]
])

if (forms) {
    forms.forEach((form, index) => {

        let formName = (form.getAttribute('name') ?? `form`)
        while (formNames.has(formName) || formName === 'form') {
            formName = `${formName}_${Array.from(formNames.keys()).filter(name => name === formName).length}`
        }
        formNames.set(formName, form)
        
        form.onsubmit = async e => {
            e.preventDefault()
            
            const type = (form.getAttribute('type') ?? 'form-data').toLowerCase()
            const method = (form.getAttribute('method') ?? 'get').toLowerCase()
            const action = (form.getAttribute('action') ?? '/').toLowerCase()
            
            // The data that will be posted is
            // always form-data by default.
            let body = new FormData(form)

            if (type == 'json') {
                // If the provided type is json, it will take the
                // existing form-data and turn it into json data.
                body = JSON.parseFormData(body)
            }

            const response = await fetch(action, {
                method,
                headers: {
                    'Content-Type': type == 'json' ? 'application/json' : 'multipart/form-data',
                    credentials: 'same-origin'
                },
                body: type == 'json' ? JSON.stringify(body) : body
            })

            if (formCallbacks.has(formName)) formCallbacks.get(formName)(form, response)
        }
    })
}
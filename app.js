const form = document.querySelector('.form-container')
const displayInfos = document.querySelectorAll('.form-container p')
const inputs = document.querySelectorAll('input')
const passwordStrength = [...document.querySelectorAll('.password-strength div')]
const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)

form.addEventListener('submit', handleForm)

function handleForm(e) {
    e.preventDefault()
    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const confirmPassword = e.target[3].value

    const logInfo = []
    
    const checkDisplay = (arr, type, text, value, color) => {
        e.target[arr].nextElementSibling.style.visibility = 'visible'
        e.target[arr].nextElementSibling.src = `ressources/${type}.svg`
        displayInfos[arr].innerText = `${text}`
        value ? logInfo.push(value) : ''
        color ? displayInfos[arr].style.color = `${color}` : ''
    }

    username.length < 3 ? checkDisplay(0, 'error', `Votre nom d'utilisateur ne contient pas assez de caractères`) : checkDisplay(0, 'check', '', username)
    
    !regexEmail.test(email) ? checkDisplay(1, 'error', `Email invalide.`) : checkDisplay(1, 'check', '', email)
    
    !regexPassword.test(password) || password.length < 6 ? checkDisplay(2, 'error', 'Au moins un symbole, un chiffre ainsi que 6 caractères minimum', null, 'red') : checkDisplay(2, 'check', '', password, ' ')
    
    password !== confirmPassword || !confirmPassword || !regexPassword.test(password) ? checkDisplay(3, 'error', `Les mots de passes doivent être identique`) : checkDisplay(3, 'check', '', confirmPassword)
    
    logInfo.length === 4 ? alert('Les données on été envoyés') : ''
}

inputs[2].addEventListener('input', handlePasswordStrength)
function handlePasswordStrength(e) {
    e.target.value.length > 0 ? passwordStrength[0].style.opacity = '1' : passwordStrength[0].style.opacity = '0.3'
    e.target.value.length > 6 ? passwordStrength[1].style.opacity = '1' : passwordStrength[1].style.opacity = '0.3'
    e.target.value.length > 9 ? passwordStrength[2].style.opacity = '1' : passwordStrength[2].style.opacity = '0.3'
}
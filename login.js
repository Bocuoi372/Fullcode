const morph = document.getElementById("morph")
const loginBtn = document.getElementById("loginBtn")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

// Toggle Morph Card to Active State
morph.addEventListener("click", (e) => {
    if (!morph.classList.contains("active")) {
        createParticles(e)
        setTimeout(() => {
            morph.classList.add("active")
            usernameInput.focus()
        }, 200)
    }
})

// Close Form
function closeForm(e) {
    e.stopPropagation()
    morph.classList.remove("active")
    // Clear inputs on close
    usernameInput.value = ""
    passwordInput.value = ""
}

// Handle Login Submission
if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        handleLogin()
    })
}

// Press Enter to Login
[usernameInput, passwordInput].forEach(input => {
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleLogin()
            }
        })
    }
})

function handleLogin() {
    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (username === "" || password === "") {
        // Simple shake effect
        morph.style.animation = "shake 0.5s ease-in-out"
        setTimeout(() => {
            morph.style.animation = ""
        }, 500)
        
        // Custom warning status
        loginBtn.innerText = "Missing Fields!"
        loginBtn.style.background = "#ef4444"
        loginBtn.style.color = "#fff"
        
        setTimeout(() => {
            loginBtn.innerText = "Login"
            loginBtn.style.background = ""
            loginBtn.style.color = ""
        }, 1500)
        return
    }

    // Check credentials
    if (username !== "admin" || password !== "123") {
        // Simple shake effect
        morph.style.animation = "shake 0.5s ease-in-out"
        setTimeout(() => {
            morph.style.animation = ""
        }, 500)
        
        // Custom warning status
        loginBtn.innerText = "Sai thông tin!"
        loginBtn.style.background = "#ef4444"
        loginBtn.style.color = "#fff"
        
        // Clear password
        passwordInput.value = ""
        passwordInput.focus()
        
        setTimeout(() => {
            loginBtn.innerText = "Login"
            loginBtn.style.background = ""
            loginBtn.style.color = ""
        }, 1500)
        return
    }

    localStorage.setItem("loggedIn", "true")
    localStorage.setItem("username", username)

    // Premium transition on success
    loginBtn.innerText = "Logging in..."
    loginBtn.style.background = "#10b981" // Green success color
    loginBtn.style.color = "#fff"

    // Optional: particle explosion on success
    const fakeEvent = {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    }
    createParticles(fakeEvent)

    setTimeout(() => {
        window.location.href = "index.html"
    }, 1000)
}

/* PARTICLE BURST */
function createParticles(e) {
    let rect = morph.getBoundingClientRect()
    let x = e.clientX || (rect.left + rect.width / 2)
    let y = e.clientY || (rect.top + rect.height / 2)

    for (let i = 0; i < 50; i++) {
        let particle = document.createElement("div")
        particle.className = "particle"

        let angle = Math.random() * 360
        let radius = Math.random() * 200

        let xMove = Math.cos(angle * Math.PI / 180) * radius
        let yMove = Math.sin(angle * Math.PI / 180) * radius

        particle.style.left = x + "px"
        particle.style.top = y + "px"

        particle.style.setProperty("--x", xMove + "px")
        particle.style.setProperty("--y", yMove + "px")

        document.body.appendChild(particle)

        setTimeout(() => {
            particle.remove()
        }, 1000)
    }
}

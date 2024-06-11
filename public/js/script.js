const showpassword = document.querySelector("#showpassword");

showpassword.addEventListener("click", function() {
    const passwordinput = document.getElementById("regpassword");
    const type = passwordinput.getAttribute("type");
    if (type == "regpassword1") {
        passwordinput.setAttribute("type", "text");
        showpassword.innerHTML = "Hide Password";
    } else {
        passwordinput.setAttribute("type", "password");
        showpassword.innerHTML = "Show Password";
    }
});
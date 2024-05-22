const handleReg= (event)=>{

    event.preventDefault()

   const username = document.getElementById('username').value
   const  email = document.getElementById('email').value
   const first_name = document.getElementById('first_name').value
   const last_name  = document.getElementById('last_name').value
   const owner  = document.getElementById('owner').checked;
    const  password = document.getElementById('password').value
    const  confirm_password = document.getElementById('confirm_password').value
    

   
    const info = {
        username,email,first_name,last_name,owner,password,confirm_password
    }
    console.log(JSON.stringify(info))

    if (password === confirm_password){
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){

            fetch("https://propsmart.onrender.com/register/",{
                method : "POST",
                headers:{"content-type": "application/json"},
                body: JSON.stringify(info)
                
            })
            .then((res)=> res.json())
            .then((data)=>alert('Check email for confirmation'))
        }
        else{
            alert("pass must contain Minimum eight characters, at least one letter, one number and one special character")
        }
    }
    else {
        alert('Password and confirm password doesnot match')
    }

}

const handleLogin = (event)=>{

    event.preventDefault()
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value

    fetch('https://propsmart.onrender.com/login/',{

    method: "POST",
    headers: {"content-type" : "application/json"},
    body : JSON.stringify({username,password})
    })
    .then ((res)=> res.json())
    .then ((data)=>{
        
        if(data.token && data.user_id){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id",data.user_id);
            window.location = "/index.html"
            console.log('working')
        }
        else {
            alert("Incorrect Username or password")
        }
    })
}

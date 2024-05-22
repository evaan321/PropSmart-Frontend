

if (localStorage.getItem('user_id')){

    document.getElementById('loginbtn').style.display='none';

}
else{
    document.getElementById('profilebtn').style.display='none';
    document.getElementById('logoutbtn').style.display='none';
}


const handleLogout = () =>{
    const token = localStorage.getItem("token")
      fetch("https://propsmart.onrender.com/logout/",{
  
      method:"POST",
      headers: {
          Authorization : `Token ${token}`,
          "Content-Type" : "application/json",
      },
      }
     )
     .then ((res) => res.json)
     .then ((data) => {
      console.log(data)
      localStorage.removeItem("token");
      localStorage.removeItem("user_id")
      alert('Logout Successful')
      window.location = "#"
     })
  }


  function addPost() {
    const title = document.getElementById('Title').value;
    const imageInput = document.getElementById('image-upload');
    const selectedImage = imageInput.files[0];
    const userId = localStorage.getItem('user_id');
    const Address = document.getElementById('Address').value;
    const Area = document.getElementById('Area').value;
    const Rent = document.getElementById('Rent').value;
    const room = document.getElementById('room').value;
    const description = document.getElementById('description').value;

//    const user = {
//       id: userId,
     
//     };
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('picture', selectedImage);
    formData.append('location',Address);
    formData.append('desc',description);
    formData.append('rent',Rent);
    formData.append('number_of_rooms',room);
    formData.append('renter',userId);
    formData.append('area',Area);

  
    
    
  
    fetch("https://propsmart.onrender.com/Post/", {
      method: "POST",
      body: formData,
      
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location = 'properties.html'
    })
    .catch(error => {
      console.log('Error adding meme:', error);
      alert('Error adding')
    });
  }
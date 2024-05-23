function myfetch() {
  fetch(`https://propsmart.onrender.com/Home/`)
    .then((res) => res.json())
    .then((data) => {
      yo(data);
    })
    .catch((error) => console.error('Error fetching properties:', error));
}

myfetch();

const yo = (data) => {
  console.log(data);
  const parent = document.getElementById('parent');
  parent.innerHTML = '';

  data.forEach((data) => {
    const div = document.createElement('div');
    div.classList = 'col-md-4 col-sm-6 col-xs-12';
    div.innerHTML = `
      <div class="service-widget">
        <div class="property-main">
          <div class="property-wrap">
            <figure class="post-media wow fadeIn">
              <a href="${data.picture}" data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i class="flaticon-unlink"></i></a>
              <img src="${data.picture}" style="height: 200px;" alt="" class="img-responsive">
              <div class="label-inner">
                <span class="label-status label">${data.rent} Taka</span>
              </div>
              <div class="price">
                <span class="item-sub-price">${data.area} sq-ft</span>
              </div>
            </figure>
            <div class="item-body">
              <h3>${data.title}</h3>
              <div class="info">
                <h4>Total Rooms - ${data.number_of_rooms}</h4>
              </div>
              <div class="adderess">
                <i class="fa fa-map-pin" aria-hidden="true"></i>
                ${data.location}
              </div>
              <div class="adderess">
                <button class='btn-radius btn-brd grd1 btn-block btn btn-light' style="width: 100%;" onclick="bookAppointment(${data.id})">Book Appointment</button>
                <button class='btn-radius btn-brd grd1 btn-block btn btn-light' style="width: 100%; margin-top: 10px;" onclick="bookmarkProperty(${data.id})"><i class="gg-bookmark"></i> Bookmark</button>
              </div>
            </div>
          </div>
          <div class="item-foot">
            <div class="pull-left">
              <span class="prop-user-agent">
                <i class="fa fa-user" aria-hidden="true"></i>
                ${data.renter.first_name} ${data.renter.last_name}
              </span>
            </div>
            <div class="pull-right">
              <span class="prop-date">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                ${formatDate(data.posted)}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    parent.appendChild(div);
  });
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleString('en-US', options);
}

function bookAppointment(propertyId) {
  const bookingDate = prompt("Please enter the booking date (YYYY-MM-DD):");

  if (bookingDate) {
    const bookingDateObj = new Date(bookingDate);
    const today = new Date();

    if (bookingDateObj < today.setHours(0, 0, 0, 0)) {
      alert("The booking date cannot be before today.");
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert("You need to be logged in to book an appointment.");
      return;
    }

    const bookingData = {
      property: propertyId,
      client: userId,
      bookingForDate: bookingDate,
    };

    fetch('https://propsmart.onrender.com/booking/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          alert('Booking confirmed!');
        } else {
          alert('Booking failed. Please try again.');
        }
      })
      .catch(error => console.error('Error:', error));
  }
}

function bookmarkProperty(propertyId) {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    alert("You need to be logged in to bookmark a property.");
    return;
  }

  const bookmarkData = {
    property: propertyId,
    user: userId,
  };

  fetch('https://propsmart.onrender.com/bookmark/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookmarkData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        alert('Property bookmarked!');
      } else {
        alert('Bookmarking failed. Please try again.');
      }
    })
    .catch(error => console.error('Error:', error));
}

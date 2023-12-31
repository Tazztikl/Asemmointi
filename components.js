
const restaurantRow = restaurant => {
  const { name, address, company } = restaurant;
  const tr = document.createElement('tr');
  
  const restaurantCell = document.createElement('td');
  restaurantCell.innerText = `${name} │ ${address} │ ${company}`;
  tr.appendChild(restaurantCell);

  return tr;
};

  const restaurantModal = (restaurant, menu) => {
    const {name, address, city, postalCode, phone, company} = restaurant;
   
    let html = `
    <button class="box2" id="sulje" >Close</button>
    <h3>${name}</h3>
    <p>${company}</p>
    <p>Osoite: ${address} ${postalCode} ${city}</p>
    <p>Puhelin: ${phone}</p>
    <button class="box2" id="button2" >Päivän Menu</button>
    <table id="viikko" >
      <tr>
        <th id="day">Course</th>
        <th id="day">diets</th>
        <th id="day">price</th>
      </tr>
    `;
  
    menu.days.forEach(days => {
      const {courses, date} = days;
      html += `
          <tr>
            <td class="paiva">${date ?? ' - '}</td>
            <td class="paiva"></td>
            <td class="paiva"></td>
          </tr>
          `;
  
    courses.forEach(course => {
        const name = course.name
        const diets = course.diets
        const price = course.price
            html += `
          <tr>
          <td>${name ?? ' - '}</td>
          <td>${diets ?? ' - '}</td>
          <td>${price ?? ' - '}</td>
          </tr>
          `;
      })
  
    });
  
    html += '</table>';
    return html;
  };
  

  const showTodaysMenu  = (restaurant, menuday) => {
    const {name, address, city, postalCode, phone, company} = restaurant;
    let html = `
    <table>
      <tr>
        <th id="day">Course</th>
        <th id="day">Diet</th>
        <th id="day">Price</th>
      </tr>
    `;
    menuday.courses.forEach(course => {
      const {name, diets, price} = course;
      html += `
          <tr>
            <td> ${name}</td>
            <td>${diets ?? ' - '}</td>
            <td>${price ?? ' - '}</td>
          </tr>
          `;
    });
    html += '</table>';
    return html;
  };

  const errorModal = message => {
    const html = `
        <h3>Error</h3>
        <p>${message}</p>
        `;
    return html;
  };

  export {restaurantRow, restaurantModal, showTodaysMenu, errorModal };
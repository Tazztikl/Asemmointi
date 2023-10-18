import { errorModal, restaurantModal, restaurantRow, showTodaysMenu } from './components.js';
import { fetchData } from './functions.js';
import { apiUrl, positionOptions } from './variables.js';

const modal2 = document.querySelector('dialog');

// const calculateDistance = (x1, y1, x2, y2) =>
//   Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const createTable = restaurants => {
  document.querySelector('table').innerHTML = '';
  restaurants.forEach(restaurant => {
    const tr = restaurantRow(restaurant);
    document.querySelector('table').appendChild(tr);
    tr.addEventListener('click', async () => {
      try {
        // remove all highlights
        const allHighs = document.querySelectorAll('.highlight');
        allHighs.forEach(high => {
          high.classList.remove('highlight');
        });
        // add highlight
        tr.classList.add('highlight');
        // add restaurant data to modal2
        modal2.innerHTML = '';

        // fetch  weekly menu 
        const menu = await fetchData(
          apiUrl + `/restaurants/weekly/${restaurant._id}/fi`
        );
        // console.log(menu);

        // fetch daily menu
        const menuday = await fetchData(
          apiUrl + `/restaurants/daily/${restaurant._id}/fi`);
        // console.log(menuday);


        const menuHtml = restaurantModal(restaurant, menu);
        modal2.insertAdjacentHTML('beforeend', menuHtml);

        const button2 =
          document.getElementById("button2");
        button2.addEventListener("click", ShowDay);

        const sulje = document.getElementById('sulje')
        sulje.addEventListener('click', () => {
          modal2.close();
        });

        function ShowDay() {
          modal2.removeChild(document.getElementById("viikko"))
          const menuHtml = showTodaysMenu(restaurant, menuday);
          modal2.insertAdjacentHTML('beforeend', menuHtml);
        }

        modal2.showModal();
      } catch (error) {
        modal2.innerHTML = errorModal(error.message);
        modal2.showModal();
      }
    });
  });
};

const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};









// const success = async pos => {
//   try {
//     const crd = pos.coords;
const restaurants = await fetchData(apiUrl + '/restaurants');
//     console.log(restaurants);
//     restaurants.sort((a, b) => {
//       const x1 = crd.latitude;
//       const y1 = crd.longitude;
//       const x2a = a.location.coordinates[1];
//       const y2a = a.location.coordinates[0];
//       const distanceA = calculateDistance(x1, y1, x2a, y2a);
//       const x2b = b.location.coordinates[1];
//       const y2b = b.location.coordinates[0];
//       const distanceB = calculateDistance(x1, y1, x2b, y2b);
//       return distanceA - distanceB;
//     });
createTable(restaurants);
// buttons for filtering
const sodexoBtn = document.querySelector('#sodexo');
const compassBtn = document.querySelector('#compass');
const resetBtn = document.querySelector('#reset');

sodexoBtn.addEventListener('click', () => {
  const sodexoRestaurants = restaurants.filter(
    restaurant => restaurant.company === 'Sodexo'
  );
  console.log(sodexoRestaurants);
  createTable(sodexoRestaurants);
});

compassBtn.addEventListener('click', () => {
  const compassRestaurants = restaurants.filter(
    restaurant => restaurant.company === 'Compass Group'
  );
  console.log(compassRestaurants);
  createTable(compassRestaurants);
});

resetBtn.addEventListener('click', () => {
  createTable(restaurants);
});

// } catch (error) {
//   modal2.innerHTML = errorModal(error.message);
// modal2.showModal2();
  // }
// };


// navigator.geolocation.getCurrentPosition(success, error, positionOptions);







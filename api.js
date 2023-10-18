import { errorModal, restaurantModal, restaurantRow, showTodaysMenu } from './components.js';
import { fetchData } from './functions.js';
import { apiUrl, positionOptions } from './variables.js';

const modal2 = document.querySelector('dialog');

const createTable = restaurants => {
  document.querySelector('table').innerHTML = '';
  restaurants.forEach(restaurant => {
    const tr = restaurantRow(restaurant);
    document.querySelector('table').appendChild(tr);
    tr.addEventListener('click', async () => {
      try {

        const allHighs = document.querySelectorAll('.highlight');
        allHighs.forEach(high => {
          high.classList.remove('highlight');
        });

        tr.classList.add('highlight');

        modal2.innerHTML = '';

        const menu = await fetchData(
          apiUrl + `/restaurants/weekly/${restaurant._id}/fi`
        );
        
        const menuday = await fetchData(
          apiUrl + `/restaurants/daily/${restaurant._id}/fi`);
        
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

const restaurants = await fetchData(apiUrl + '/restaurants');

createTable(restaurants);

const sodexoBtn = document.querySelector('#sodexo');
const compassBtn = document.querySelector('#compass');
const resetBtn = document.querySelector('#reset');

sodexoBtn.addEventListener('click', () => {
  const sodexoRestaurants = restaurants.filter(
    restaurant => restaurant.company === 'Sodexo'
  );
  
  createTable(sodexoRestaurants);
});

compassBtn.addEventListener('click', () => {
  const compassRestaurants = restaurants.filter(
    restaurant => restaurant.company === 'Compass Group'
  );
  
  createTable(compassRestaurants);
});

resetBtn.addEventListener('click', () => {
  createTable(restaurants);
});








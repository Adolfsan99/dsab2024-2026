document.addEventListener('DOMContentLoaded', () => {
  const dateList = document.getElementById('dateList');
  const startDate = new Date(2024, 0, 24); // January 24, 2024
  const numberOfDates = 20; // Generate 20 dates
  const referenceDate = new Date(2024, 0, 18); // January 18, 2024

  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  function formatDate(date) {
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} de ${month}`;
  }

  function isDateInPast(date) {
    referenceDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < referenceDate;
  }

  function updateDateStatus() {
    const dateElements = document.querySelectorAll('.date-item');
    dateElements.forEach(element => {
      const dateText = element.textContent;
      const [day, , month] = dateText.split(' ');
      const monthIndex = months.indexOf(month);
      const currentDate = new Date(2024, monthIndex, parseInt(day));
      
      if (isDateInPast(currentDate)) {
        element.classList.add('crossed', 'past-date');
        element.classList.remove('future-date');
      } else {
        element.classList.remove('crossed', 'past-date');
        element.classList.add('future-date');
      }
    });
  }

  function createDateElements() {
    for (let i = 0; i < numberOfDates; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (i * 9));
      
      const dateElement = document.createElement('div');
      dateElement.className = 'date-item future-date';
      dateElement.textContent = formatDate(currentDate);
      
      dateElement.addEventListener('click', () => {
        dateElement.classList.toggle('crossed');
      });
      
      dateList.appendChild(dateElement);
    }
    
    // Initial update of date statuses
    updateDateStatus();
  }

  createDateElements();
  
  // Update date statuses every day at midnight
  setInterval(() => {
    updateDateStatus();
  }, 1000 * 60 * 60); // Check every hour
});
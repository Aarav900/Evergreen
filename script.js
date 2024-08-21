const deviceTable = document.getElementById('device-table');
const deviceNameInput = document.getElementById('deviceName');
const devicePowerInput = document.getElementById('devicePower');
const deviceHoursInput = document.getElementById('deviceHours');
const addDeviceBtn = document.getElementById('addDevice');
const energyGoalInput = document.getElementById('energyGoal');
const totalConsumptionDisplay = document.getElementById('totalConsumption');
const goalStatusDisplay = document.getElementById('goalStatus');

let devices = [];

function addDeviceRow() {
  const deviceName = deviceNameInput.value;
  const devicePower = parseFloat(devicePowerInput.value);
  const deviceHours = parseFloat(deviceHoursInput.value);

  if (deviceName && devicePower && deviceHours) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${deviceName}</td>
      <td>${devicePower} W</td>
      <td>${deviceHours} hours</td>
    `;
    deviceTable.appendChild(newRow);

    devices.push({ name: deviceName, power: devicePower, hours: deviceHours });

    calculateTotalConsumption();
    deviceNameInput.value = '';
    devicePowerInput.value = '';
    deviceHoursInput.value = '';
  }
}

function calculateTotalConsumption() {
  let totalConsumption = 0;
  devices.forEach(device => {
    totalConsumption += (device.power * device.hours) / 1000; // Convert to kWh
  });
  totalConsumptionDisplay.textContent = `Total Consumption: ${totalConsumption.toFixed(2)} kWh`;
  checkGoal();
}

function checkGoal() {
  const energyGoal = parseFloat(energyGoalInput.value);
  const totalConsumption = parseFloat(totalConsumptionDisplay.textContent.split(':')[1]);
  if (totalConsumption <= energyGoal) {
    goalStatusDisplay.textContent = 'Goal Achieved!';
  } else {
    goalStatusDisplay.textContent = 'Goal Not Achieved.';
  }
}

addDeviceBtn.addEventListener('click', addDeviceRow);
import { useState } from "react";
import "./App.css";

function App() {
  const [charge, setCharge] = useState(100);
  const [weight, setWeight] = useState(70);
  const [rideStyle, setRideStyle] = useState("moderate");

  const batteryWh = 1100;
  const voltage = 84;
  const chargerAmps = 5;
  const batteryAh = batteryWh / voltage;

  const styleMap = {
    smooth: 20,
    moderate: 25,
    aggressive: 30
  };

  const consumptionWhPerKm = styleMap[rideStyle] + (weight - 70) * 0.3;
  const availableWh = (charge / 100) * batteryWh;
  const range = (availableWh / consumptionWhPerKm).toFixed(1);

  const missingAh = ((100 - charge) / 100) * batteryAh;
  const chargeTime = (missingAh / chargerAmps) * 60 * 1.1;

  return (
    <div className="container">
      <h2>🔋 Калькулятор Begode A5</h2>

      <div className="input-group">
        <label>Уровень заряда: {charge}%</label>
        <input type="range" min={0} max={100} value={charge} onChange={e => setCharge(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label>Вес райдера: {weight} кг</label>
        <input type="range" min={40} max={120} value={weight} onChange={e => setWeight(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label>Стиль езды:</label>
        <select value={rideStyle} onChange={e => setRideStyle(e.target.value)}>
          <option value="smooth">Плавный (эконом)</option>
          <option value="moderate">Умеренный (город)</option>
          <option value="aggressive">Агрессивный</option>
        </select>
      </div>

      <div className="result">
        <p>🚴 Пробег: <strong>{range} км</strong></p>
        <p>🔌 Время зарядки до 100%: <strong>{Math.round(chargeTime)} мин</strong></p>
      </div>
    </div>
  );
}

export default App;

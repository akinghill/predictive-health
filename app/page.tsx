'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    age: 64,
    sex: 0,
    chestPain: 0,
    restingBloodPressure: 120,
    fastingBloodSugar: 120,
    restingECG: 0,
    maxHeartRate: 150,
    exerciseInducedAngina: 0,
    stDepression: 0.0,
  });

  const [results, setResults] = useState<undefined | string>();

  const handleBloodSugarChange = (event: any) => {
    const { name, value } = event.target;
    let bloodSugar = value > 120 ? 1 : 0;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: bloodSugar,
    }));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = Object.values(formData).map((value) => {
      const num = Number(value);
      if (Number.isNaN(num)) {
        throw new Error('Invalid input');
      }
      return num;
    });

    console.log(JSON.stringify(data));

    fetch('http://ec2-3-145-56-228.us-east-2.compute.amazonaws.com/predict', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setResults(data);
      });
  };

  return (
    <main className="prose max-w-md m-auto p-4">
      <h1>
        Welcome to <br />
        <span className="text-red-400"> Predictive Health</span>
      </h1>

      <p>
        Enter your details below to view the performance of our machine learning
        models.
      </p>
      <p>
        For more information on how the model was trained visit:{' '}
        <a href="https://github.com/akinghill/predictive-health-ml/blob/main/heart_disease.py.ipynb">
          Predictive Health Training
        </a>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <label className="input-group">
            <input
              className="input input-bordered"
              type="number"
              placeholder="64"
              name="age"
              min={0}
              max={100}
              value={formData.age}
              onChange={handleChange}
            />
            <span>years</span>
          </label>
        </div>

        <div className="form-control w-full flex flex-row flex-wrap pt-6">
          <label className="label w-full">
            <span className="label-text">Sex</span>
          </label>

          <div>
            <input
              type="radio"
              name="sex"
              className="radio"
              id="female"
              value={0}
            />
            <label className="form-check-label pl-2 pr-4" htmlFor="female">
              Female
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="sex"
              className="radio"
              id="male"
              value={1}
              defaultChecked
            />
            <label className="form-check-label pl-2" htmlFor="male">
              Male
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <label className="label w-full">
            <span className="label-text">Chest Pain</span>
          </label>
          <select
            style={{ marginTop: '0px' }}
            className="select select-bordered w-full max-w-xs"
            defaultValue={'Typical Angina'}
            name="chestPain"
          >
            <option disabled>Chest Pain</option>
            <option value="3">Typical Angina</option>
            <option value="2">Atypical Angina</option>
            <option value="1">Non-Anginal Pain</option>
            <option value="0">Asymptomatic</option>
          </select>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resting Blood Pressure</span>
            </label>
            <label className="input-group">
              <input
                className="input input-bordered"
                type="number"
                placeholder="120"
                name="restingBloodPressure"
                min={0}
                max={200}
                value={formData.restingBloodPressure}
                onChange={handleChange}
              />
              <span>mm Hg</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fasting Blood Sugar</span>
            </label>
            <label className="input-group">
              <input
                className="input input-bordered"
                type="number"
                placeholder="120"
                name="fastingBloodSugar"
                min={0}
                max={600}
                onChange={handleBloodSugarChange}
              />
              <span>mg/dl</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Max Heart Rate</span>
            </label>
            <label className="input-group">
              <input
                className="input input-bordered"
                type="number"
                placeholder="150"
                name="maxHeartRate"
                min={0}
                max={300}
                value={formData.maxHeartRate}
                onChange={handleChange}
              />
              <span>bpm</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <label className="label">
            <span className="label-text">Resting ECG</span>
          </label>
          <select
            style={{ marginTop: '0px' }}
            className="select select-bordered w-full max-w-xs"
            defaultValue={'Normal'}
            name="restingECG"
          >
            <option disabled>Resting ECG</option>
            <option value={0}>Normal</option>
            <option value={1}>ST-T Wave Abnormality</option>
            <option value={2}>Left Ventricular Hypertrophy</option>
          </select>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <div className="form-control w-full flex flex-row flex-wrap">
            <label className="label w-full">
              <span className="label-text">Exercise Induced Angina</span>
            </label>

            <div>
              <input
                type="radio"
                name="exerciseInducedAngina"
                className="radio"
                id="no"
                value={0}
              />
              <label className="form-check-label pl-2 pr-4" htmlFor="no">
                No
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="exerciseInducedAngina"
                className="radio"
                id="yes"
                value={1}
                defaultChecked
              />
              <label className="form-check-label pr-4 pl-2" htmlFor="yes">
                Yes
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">ST Depression</span>
            </label>
            <label className="input-group">
              <input
                className="input input-bordered"
                type="number"
                placeholder="0.0"
                name="stDepression"
                min={-3}
                max={10}
                value={formData.stDepression}
                onChange={handleChange}
              />
              <span>mm</span>
            </label>
          </div>
        </div>

        <button
          onClick={(e) => handleSubmit(e)}
          className="m-4 btn w-64 rounded-full"
          type="submit"
        >
          Predict
        </button>
      </form>

      <div>
        <span>Results:</span>
        {results == undefined ? (
          <span> Predict to see results.</span>
        ) : results == '0' ? (
          <span> Heart Disease Not Predicted</span>
        ) : (
          <span> Heart Disease Predicted</span>
        )}
      </div>
    </main>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Step 2: Halaman Video Tutorial
function OnboardingTutorial() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/register/info'); // Arahkan ke step 3 (Info Toko)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Selamat Datang! Tonton Tutorial Singkat Ini
        </h2>
        <p className="text-gray-600">
          Pelajari cara mengatur toko Anda dalam 1 menit.
        </p>

        {/* Placeholder Video */}
        <div className="w-full bg-gray-300 aspect-video rounded-md flex items-center justify-center">
          <span className="text-gray-500">(Placeholder untuk Video Tutorial Anda)</span>
        </div>

        <div>
          <button
            onClick={handleNext}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
          >
            Mulai (Lanjut ke Step 3)
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingTutorial;
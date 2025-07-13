"use client";

import { useState } from "react";

export const WizardForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Dados enviados:\nNome: ${formData.nomeCompleto}\nEmail: ${formData.email}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Indicador de progresso */}
      <div className="flex items-center mb-6">
        <div className={`flex-1 h-1 ${step >= 1 ? "bg-blue-500" : "bg-gray-300"}`}></div>
        <div className={`w-6 h-6 text-sm ${step >= 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"} rounded-full text-center`}>
          1
        </div>
        <div className={`flex-1 h-1 ${step >= 2 ? "bg-blue-500" : "bg-gray-300"}`}></div>
        <div className={`w-6 h-6 text-sm ${step >= 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"} rounded-full text-center`}>
          2
        </div>
      </div>

      {/* Formulário por etapa */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm mb-1">Nome Completo</label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
            <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
              Próximo
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
                Voltar
              </button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Enviar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

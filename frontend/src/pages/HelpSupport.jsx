import React, { useState } from 'react';

function HelpSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // E-Mail-Betreff und Nachricht vorbereiten
    const emailSubject = encodeURIComponent(formData.subject);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `E-Mail: ${formData.email}\n\n` +
      `${formData.message}`
    );

    // Mail-Link erstellen und öffnen
    const mailtoLink = `mailto:vitali.mack@tn.techstarter.de?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-8 mx-auto max-w-4xl">
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            -webkit-text-fill-color: white;
            -webkit-box-shadow: 0 0 0px 1000px rgb(55 65 81) inset;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>
      <h2 className="text-3xl font-bold mb-8 text-white">Hilfe & Support</h2>
      
      <div className="mb-8">
        <p className="text-white text-lg leading-relaxed">
          Haben Sie Fragen oder benötigen Unterstützung bei der Nutzung unserer Anwendung? 
          Wir helfen Ihnen gerne weiter! Füllen Sie einfach das folgende Formular aus, 
          und unser Support-Team wird sich so schnell wie möglich bei Ihnen melden.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
        <div>
          <label htmlFor="name" className="block text-white mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white mb-2">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-white mb-2">Betreff</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-white mb-2">Nachricht</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Absenden
        </button>
      </form>
    </div>
  );
}

export default HelpSupport;
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this up to your backend or email service
    console.log('Contact form submitted:', form);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <div className="contact-hero">
        <div className="container text-center">
          <h2 className="contact-title">Get in touch</h2>
          <p className="contact-subtitle">
            Questions, feedback or a bug to report. We would love to hear from you.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="contact-info-card">
              <i className="bi bi-geo-alt-fill"></i>
              <h6>Address</h6>
              <p>221B Food Street, Hyderabad, Telangana, India</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-info-card">
              <i className="bi bi-telephone-fill"></i>
              <h6>Phone</h6>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-info-card">
              <i className="bi bi-envelope-fill"></i>
              <h6>Email</h6>
              <p>support@foodcode.com</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-md-7">
            <div className="contact-form-card">
              <h4 className="mb-3">Send us a message</h4>

              {sent && (
                <div className="alert-success-custom">
                  <i className="bi bi-check-circle-fill"></i> Message sent. We will get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control custom-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control custom-input"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    className="form-control custom-input"
                    rows="5"
                    placeholder="Your message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send message <i className="bi bi-send-fill ms-1"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
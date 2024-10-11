import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState<{
    name: string;
    message: string;
    email: string;
  }>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value }: any = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);

    setFormData({ name: "", email: "", message: "" });
    alert("Thank you for contacting us!");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

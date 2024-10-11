import React from "react";

const About = () => {
  return (
    <div className="about">
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1>About Us</h1>
          <p className="lead">Your go-to platform for knowledge sharing.</p>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=500"
                className="card-img-top"
                alt="Mission"
              />
              <div className="card-body">
                <h5 className="card-title">Our Mission</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  pharetra, felis eget feugiat tristique, lectus ligula vehicula
                  libero, a viverra massa felis in tortor.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <img
                src="https://www.pascotata.com/uploads/cache/cms/3699as-900x500.jpg"
                className="card-img-top"
                alt="Vision"
              />
              <div className="card-body">
                <h5 className="card-title">Our Vision</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  pharetra, felis eget feugiat tristique, lectus ligula vehicula
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  libero, a viverra massa felis in tortor.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feel free to reach out to us at
            <a href="mailto:info@example.com"> info@example.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

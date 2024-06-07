import React, { useState, useRef } from "react";

export default function () {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    message: "",
    queryType: "",
  };

  const [formFields, setFormFields] = useState(initialFormValues);

  const [errors, setErrors] = useState({});

  const [isChecked, setIsChecked] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleQueryChange = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      queryType: e.target.value,
    }));
  };

  const errorHandler = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const displayError = {};

    if (formFields.firstName === "") {
      displayError.firstName = "This field is required";
    }
    if (formFields.lastName === "") {
      displayError.lastName = "This field is required";
    }
    if (formFields.emailAddress === "") {
      displayError.emailAddress = "This field is required";
    } else if (!formFields.emailAddress.match(emailRegex)) {
      displayError.emailAddress = "Please enter a valid email address";
    }
    if (formFields.message === "") {
      displayError.message = "This field is required";
    }
    if (!isChecked) {
      displayError.consent =
        "To submit this form, please consent to being contacted";
    }
    if (formFields.queryType === "") {
      displayError.queryType = "Please select a query type";
    }

    setErrors(displayError);

    if (Object.keys(displayError).length === 0) {
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }
  };

  const resetForm = () => {
    setFormFields(initialFormValues);
  };

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          errorHandler();
          resetForm();
        }}
      >
        <h1>Contact us</h1>
        <div className="name-container">
          <div>
            <label htmlFor="firstName">
              first name<span>*</span>
            </label>
            <input
              className={errors.firstName ? "input-err" : "input"}
              name="firstName"
              id="firstName"
              value={formFields.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="paragraph-err">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName">
              last name<span>*</span>
            </label>
            <input
              className={errors.firstName ? "input-err" : "input"}
              name="lastName"
              id="lastName"
              value={formFields.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="paragraph-err">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="email-box">
          <label htmlFor="emailAddress">
            email<span>*</span>
          </label>
          <input
            className={errors.firstName ? "input-err" : "input"}
            name="emailAddress"
            id="emailAddress"
            value={formFields.emailAddress}
            onChange={handleChange}
          />
          {errors.emailAddress && (
            <p className="paragraph-err">{errors.emailAddress}</p>
          )}
        </div>
        <div className="query-selection">
          <label>
            query type<span>*</span>
          </label>
          <div className="query-options-container">
            <div className="query-options">
              <input
                type="radio"
                id="general-enquiry"
                name="radio"
                value="general"
                checked={formFields.queryType === "general"}
                onChange={handleQueryChange}
              />
              <label htmlFor="general-enquiry">general enquiry</label>
            </div>
            <div className="query-options">
              <input
                type="radio"
                id="support-request"
                name="radio"
                value="support"
                checked={formFields.queryType === "support"}
                onChange={handleQueryChange}
              />
              <label htmlFor="support-request">support request</label>
            </div>
          </div>
          {errors.queryType && (
            <p className="paragraph-err">{errors.queryType}</p>
          )}
        </div>
        <div className="message-box">
          <label htmlFor="message">
            message<span>*</span>
          </label>
          <textarea
            className={errors.firstName ? "input-err" : "input"}
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={formFields.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="paragraph-err">{errors.message}</p>}
        </div>
        <div className="consent-tag">
          <div>
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={isChecked}
              onChange={handleCheckbox}
            />
            <label htmlFor="consent">
              I consent to being contacted by the team<span>*</span>
            </label>
          </div>
          {errors.consent && <p className="paragraph-err">{errors.consent}</p>}
        </div>
        <button>submit</button>
      </form>

      {isSuccess && (
        <div className="success-msg">
          <div>
            <img src="./icon-success-check.svg" alt="icon-check" />
            <strong>Message sent!</strong>
          </div>
          <p>Thanks for completing the form. We'll be in touch soon!</p>
        </div>
      )}
    </main>
  );
}

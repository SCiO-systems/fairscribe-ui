import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import React, { useRef, useState } from 'react';
import { Logo } from '../components/Logo';

export const Register = () => {
  const [acceptanceDialogOpen, setAcceptanceDialogOpen] = useState(false);
  const [legalChecked, setLegalChecked] = useState(false);
  const userImage = useRef(null);

  return (
    <div className="register-page">
      <Logo />
      <div className="layout-content">
        <div className="p-grid">
          <div className="p-col-12 p-md-8">
            <div className="card p-fluid p-shadow-4 rounded">
              <h5 className="p-text-center">New User Registration</h5>
              <div className="p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="firstname">First name</label>
                  <InputText id="firstname" type="text" required />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="lastname">Last name</label>
                  <InputText id="lastname" type="text" required />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="email">Email</label>
                  <InputText id="email" type="email" required />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="confirmEmail">Repeat email</label>
                  <InputText id="confirmEmail" type="email" required />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="password">Password</label>
                  <InputText id="password" type="password" />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="confirmPassword">Repeat password</label>
                  <InputText id="confirmPassword" type="password" />
                </div>
              </div>
              <div className="p-formgrid p-grid p-justify-start p-mt-2">
                <div className="p-field p-col-12 p-md-6">
                  <Button
                    label="Acceptance of request pending"
                    icon="pi pi-id-card"
                    className="p-button-secondary p-mr-2 p-mb-2"
                    onClick={() =>
                      setAcceptanceDialogOpen(!acceptanceDialogOpen)
                    }
                  ></Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-4">
            <div className="card p-fluid p-shadow-4 rounded p-text-center">
              <h5>Profile picture</h5>
              <div className="p-formgrid p-grid">
                <div className="p-field p-col-12 p-text-center">
                  <img
                    src="https://picsum.photos/350/350"
                    height="215px"
                    className="rounded"
                    alt="Avatar"
                  />
                </div>
                <div className="p-field p-col-12">
                  <Button
                    label="Select image"
                    icon="pi pi-image"
                    className="p-button-secondary p-mr-2 p-mb-2"
                    onClick={() => {
                      userImage.current.click();
                    }}
                  ></Button>
                </div>
                <form>
                  <input
                    type="file"
                    id="file"
                    ref={userImage}
                    style={{ display: 'none' }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-col-12 p-text-left p-mt-2"
          style={{ paddingLeft: '0' }}
        >
          <Button
            label="Register"
            icon="pi pi-user-plus"
            className="p-button-big p-mr-2 p-mb-2"
          ></Button>
        </div>
      </div>
      {/* TODO: Make this reusable. */}
      <Dialog
        header="Please describe"
        visible={acceptanceDialogOpen}
        style={{ width: '400px' }}
        modal
        onHide={() => setAcceptanceDialogOpen(false)}
      >
        <div className="p-fluid">
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12">
              <label htmlFor="organization">Your organization</label>
              <InputText id="organization" type="text" required />
            </div>
            <div className="p-field p-col-12">
              <label htmlFor="role">Your role</label>
              <InputText id="role" type="text" required />
            </div>
            <div className="p-field p-col-12">
              <div className="p-field-checkbox p-text-center">
                <Checkbox
                  inputId="legalCheck"
                  name="option"
                  value="Chicago"
                  checked={legalChecked}
                  onChange={() => {
                    setLegalChecked(!legalChecked);
                  }}
                />
                <label htmlFor="legalCheck">Legal Notice</label>
              </div>
            </div>
            <div className="p-field p-col-12 p-text-center">
              <Button
                label="Make request"
                icon="pi pi-reply"
                className="p-mr-2 p-mb-2"
                onClick={() => setAcceptanceDialogOpen(false)}
              ></Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ccLicenses from '../../data/licenses/cc.json';
import softwareLicenses from '../../data/licenses/software.json';
import CreativeCommonsLicense from '../licenses/CreativeCommonsLicense';
import SoftwareLicense from '../licenses/SoftwareLicense';

const findCCLicenseIndex = (attribution, commercial, derivative, sharing) => {
  if (attribution === false) {
    // CC0 1.0
    return 0;
  }

  if (commercial === true) {
    if (derivative === true && sharing === false) {
      // CC BY-SA 4.0
      return 2;
    }
    if (derivative === false) {
      // CC BY-ND 4.0
      return 3;
    }
    // CC BY 4.0
    return 1;
  }

  if (commercial === false) {
    if (derivative === false) {
      // CC BY-NC-ND 4.0
      return 6;
    }
    if (derivative === true && sharing === false) {
      // CC BY-NC-SA 4.0
      return 5;
    }
    if (derivative === true && sharing === true) {
      // CC BY-NC 4.0
      return 4;
    }
  }

  // CC BY 4.0
  return 1;
};

const LicenseWizardDialog = ({ dialogOpen, setDialogOpen, setLicense }) => {
  const { t } = useTranslation();
  const [software, setSoftware] = useState(null);
  const [attribution, setAttribution] = useState(null);
  const [commercialUse, setCommercialUse] = useState(null);
  const [derivativeWorks, setDerivativeWorks] = useState(null);
  const [shareAdaptations, setShareAdaptations] = useState(null);
  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const resetState = () => {
    setSoftware(null);
    setAttribution(null);
    setCommercialUse(null);
    setDerivativeWorks(null);
    setShareAdaptations(null);
    setStep(0);
    setActiveIndex(0);
  };

  const closeDialog = () => {
    resetState();
    setDialogOpen(false);
  };

  const NavigationButtons = () => (
    <div className="p-mt-4 p-d-flex p-jc-between">
      <Button
        label="Previous"
        onClick={() => {
          setStep(step - 1);
          setActiveIndex(activeIndex - 1);
        }}
        style={{ width: '125px' }}
      />
      <Button
        label="Next"
        onClick={() => {
          setStep(step + 1);
          setActiveIndex(activeIndex + 1);
        }}
        style={{ width: '125px' }}
      />
    </div>
  );

  const Choices = ({
    value,
    setValue,
    choice1Text,
    choice2Text,
    choice1Value,
    choice2Value,
  }) => (
    <>
      <div className="p-my-3">
        <label htmlFor="choice1">
          <RadioButton
            name="choice1"
            onChange={() => setValue(choice1Value)}
            checked={value === choice1Value}
          />
          <span className="p-ml-2">{choice1Text}</span>
        </label>
      </div>
      <div className="p-my-3">
        <label htmlFor="choice2">
          <RadioButton
            name="choice2"
            onChange={() => setValue(choice2Value)}
            checked={value === choice2Value}
          />
          <span className="p-ml-2">{choice2Text}</span>
        </label>
      </div>
    </>
  );

  return (
    <Dialog
      header={t('LICENSE_WIZARD')}
      visible={dialogOpen}
      style={{ width: '800px' }}
      draggable={false}
      modal
      onHide={closeDialog}
    >
      <div className="p-fluid p-formgrid p-grid p-pt-1">
        <div className="p-col-12">
          {(step === 0 || (step === 1 && !software) || step > 1) && (
            <Accordion
              onTabChange={(e) => setActiveIndex(step)}
              activeIndex={activeIndex}
            >
              <AccordionTab
                disabled={activeIndex !== 0}
                header="What is the license about?"
              >
                <Choices
                  value={software}
                  setValue={setSoftware}
                  choice1Value
                  choice2Value={false}
                  choice1Text="Software"
                  choice2Text="Non-software"
                />
                <div className="p-mt-4 p-d-flex p-jc-end">
                  <Button
                    label="Next"
                    onClick={() => {
                      setStep(1);
                      if (!software) {
                        setActiveIndex(activeIndex + 1);
                      }
                    }}
                    style={{ width: '150px' }}
                  />
                </div>
              </AccordionTab>
              <AccordionTab
                disabled={activeIndex !== 1}
                header="Do you want attribution for your work?"
              >
                <Choices
                  value={attribution}
                  setValue={setAttribution}
                  choice1Value
                  choice2Value={false}
                  choice1Text="Yes. Anyone using my work must include proper attribution."
                  choice2Text="No. Anyone can use my work, even without giving me
                  attribution."
                />
                <NavigationButtons />
              </AccordionTab>
              <AccordionTab
                disabled={activeIndex !== 2}
                header="Do you want to allow others to use your work commercially?"
              >
                <Choices
                  value={commercialUse}
                  setValue={setCommercialUse}
                  choice1Value
                  choice2Value={false}
                  choice1Text="Yes. Others can use my work, even for commercial purposes."
                  choice2Text="No. Others can not use my work for commercial purposes."
                />
                <NavigationButtons />
              </AccordionTab>
              <AccordionTab
                disabled={activeIndex !== 3}
                header="Do you want to allow others to remix, adapt, or build upon your work?"
              >
                <Choices
                  value={derivativeWorks}
                  setValue={setDerivativeWorks}
                  choice1Value
                  choice2Value={false}
                  choice1Text="Yes. Others can remix, adapt, or build upon my work."
                  choice2Text="No. Others may only use my work in unadapted form."
                />
                <NavigationButtons />
              </AccordionTab>
              <AccordionTab
                disabled={activeIndex !== 4}
                header="Do you want to allow others to share adaptations of your work under any terms?"
              >
                <Choices
                  value={shareAdaptations}
                  setValue={setShareAdaptations}
                  choice1Value
                  choice2Value={false}
                  choice1Text="Yes. Others can share adaptations of my work under any terms."
                  choice2Text="No. Others must use the same CC license if they adapt my work."
                />
                <NavigationButtons />
              </AccordionTab>
            </Accordion>
          )}
          {step === 1 && software && (
            <div>
              <div className="p-d-flex p-jc-start p-ai-center p-mb-5">
                <Button
                  label="Go back"
                  icon="pi pi-arrow-left"
                  onClick={() => {
                    resetState();
                  }}
                  style={{ width: '150px' }}
                />
              </div>
              {softwareLicenses.map((l) => (
                <SoftwareLicense
                  setLicense={setLicense}
                  closeDialog={closeDialog}
                  key={l.name}
                  license={l}
                />
              ))}
            </div>
          )}
          {software === false && (
            <CreativeCommonsLicense
              setLicense={setLicense}
              closeDialog={closeDialog}
              license={
                ccLicenses[
                  findCCLicenseIndex(
                    attribution,
                    commercialUse,
                    derivativeWorks,
                    shareAdaptations
                  )
                ]
              }
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default LicenseWizardDialog;

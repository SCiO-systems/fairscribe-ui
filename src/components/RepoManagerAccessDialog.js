import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/primereact.min.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RepoAccessManagerDialog = ({ dialogOpen, setDialogOpen }) => {
  const { t } = useTranslation();
  const [legalChecked, setLegalChecked] = useState(false);
  return (
    <Dialog
      header={t('REPO_MANAGER_DIALOG_TITLE')}
      visible={dialogOpen}
      style={{ width: '400px' }}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-col-12">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              aliquet ipsum at finibus maximus. Aenean pharetra ullamcorper est
              id placerat. Proin vitae tortor non neque rutrum luctus sed vel
              ipsum. Fusce ullamcorper quam nunc. Quisque porttitor ex a magna
              condimentum egestas. Etiam nec rhoncus nibh. Duis eu vehicula
              dolor. Vestibulum nec aliquet nisl, a auctor eros. Mauris
              hendrerit ex augue, quis finibus enim vehicula id. Aliquam non
              ante eu neque tincidunt hendrerit auctor sit amet lectus.
            </p>
            <p>
              Mauris viverra nibh sit amet nulla suscipit bibendum. Nullam ut
              scelerisque dolor. Nullam sit amet mi eu metus vestibulum
              fermentum. Cras auctor, felis id maximus consequat, lorem dolor
              dignissim purus, non tempor nulla libero eu est. Sed sollicitudin
              sem porttitor vehicula molestie. Curabitur vulputate tortor risus,
              nec blandit diam scelerisque eu. Pellentesque et eros quis metus
              tincidunt hendrerit. Donec euismod condimentum purus. Nam pulvinar
              malesuada ultricies. In in iaculis lectus, vel laoreet nisi.
              Quisque convallis fringilla neque, et fermentum sapien. Aliquam
              massa tortor, ullamcorper id ante et, tincidunt aliquet justo.
              Cras erat tortor, ultricies eu varius porta, dignissim in tortor.
              Morbi sed tincidunt leo, vitae posuere ex.
            </p>
            <p>
              In hac habitasse platea dictumst. Quisque sed velit a tortor
              tristique pharetra sed eu ex. Fusce scelerisque ullamcorper
              varius. Nullam quis viverra urna. Maecenas rhoncus ultrices eros.
              Sed sit amet elit nisi. Fusce tellus augue, eleifend non auctor a,
              iaculis ac odio. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Duis efficitur, enim
              varius placerat vestibulum, odio felis ullamcorper nulla, non
              efficitur diam dui nec velit. Duis pretium, diam a scelerisque
              iaculis, odio metus pellentesque metus, id fringilla tortor lacus
              id nibh. Donec mauris orci, commodo a mauris ac, laoreet pharetra
              eros. Vivamus efficitur, dolor in faucibus sodales, magna felis
              laoreet purus, sed dignissim urna felis vitae est. Nulla lobortis
              lectus non velit accumsan, in congue urna luctus. Duis dolor
              nulla, sodales non efficitur vel, viverra vitae ligula. Fusce
              molestie dapibus felis eget sodales.
            </p>
            <p>
              Sed cursus ullamcorper est, et gravida tortor rhoncus ac. Praesent
              ornare, nisi a placerat tempus, felis tortor lacinia sapien,
              lobortis pulvinar mi magna eget ante. Sed justo quam, porttitor ac
              nisi ac, ultrices gravida erat. Nam egestas ut orci ac convallis.
              In vel vehicula dolor. Vivamus vitae urna dui. Integer molestie
              nunc sed fermentum cursus. Suspendisse molestie mauris sed quam
              mattis pharetra. Phasellus accumsan pharetra lacus, ut facilisis
              dolor consequat at. Nullam euismod sit amet lectus ut hendrerit.
              Pellentesque maximus sodales elit, vel pulvinar magna fermentum
              eu. Aliquam faucibus nisl congue, aliquam lectus non, congue nisl.
              Etiam pellentesque, ante eu molestie ultricies, lectus purus
              vehicula risus, vitae dignissim nisl nisi eu quam. Nam fermentum
              est eget nisl vehicula rutrum. Sed eu congue dui, vel pulvinar mi.
              Fusce porta malesuada dignissim. Pellentesque sed sollicitudin
              lorem. Nunc velit leo, eleifend at sapien vestibulum, consequat
              imperdiet purus. Maecenas scelerisque lacinia tellus sed iaculis.
              Nullam vitae ex turpis. Integer ultrices enim justo, ut molestie
              ex dapibus eu. Praesent maximus lacus id erat molestie, et viverra
              ante pulvinar. Nam accumsan ante felis, in condimentum ligula
              congue et.
            </p>
            <p>
              In hac habitasse platea dictumst. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos.
              Aliquam iaculis odio id euismod hendrerit. Nullam quis efficitur
              lorem. Donec finibus, enim ut blandit posuere, nisi eros congue
              urna, eu finibus odio felis non odio. Mauris lacinia tincidunt
              porttitor. Donec ac blandit ipsum. Nunc fermentum ipsum et sapien
              pulvinar, sed condimentum sem suscipit. Aenean eu luctus felis.
              Donec et convallis lacus, et dignissim sem. Nam ornare quam dolor,
              ac bibendum tortor consectetur ultricies. Fusce vitae nisl vel
              tellus pretium imperdiet ut ac augue. Praesent feugiat non turpis
              id dictum. Suspendisse in dapibus velit, non posuere felis. Donec
              semper fringilla leo, eget iaculis nisi fringilla in. Maecenas
              eget bibendum arcu, ac rutrum purus. Curabitur elementum imperdiet
              nulla ut placerat. Nulla facilisi. Proin aliquet at velit nec
              viverra. Integer purus nisi, auctor sed tristique in, luctus eu
              arcu. Pellentesque dapibus ut metus ac aliquet. Nam ac rutrum
              magna, eget lacinia dui. Interdum et malesuada fames ac ante ipsum
              primis in faucibus.
            </p>
          </div>
          <div className="p-col-12">
            <div className="d-flex p-ai-center p-jc-center p-text-center p-my-4">
              <Checkbox
                inputId="legalCheck"
                name="option"
                value="Chicago"
                checked={legalChecked}
                className="p-mr-2"
                onChange={() => {
                  setLegalChecked(!legalChecked);
                }}
              />
              <label htmlFor="legalCheck">{t('TERMS_ACCEPT')}</label>
            </div>
          </div>
          <div className="p-col-12 p-text-center">
            <div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
              <Button
                label="Make request"
                icon="pi pi-reply"
                className="p-mr-2 p-mb-2"
                disabled={!legalChecked}
                onClick={() => setDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RepoAccessManagerDialog;

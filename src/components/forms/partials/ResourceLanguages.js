import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languagesList = [
  { value: 'aa', label: 'Afar' },
  { value: 'ab', label: 'Abkhazian' },
  { value: 'ae', label: 'Avestan' },
  { value: 'af', label: 'Afrikaans' },
  { value: 'ak', label: 'Akan' },
  { value: 'am', label: 'Amharic' },
  { value: 'an', label: 'Aragonese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'as', label: 'Assamese' },
  { value: 'av', label: 'Avaric' },
  { value: 'ay', label: 'Aymara' },
  { value: 'az', label: 'Azerbaijani' },
  { value: 'ba', label: 'Bashkir' },
  { value: 'be', label: 'Belarusian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'bh', label: 'Bihari languages' },
  { value: 'bi', label: 'Bislama' },
  { value: 'bm', label: 'Bambara' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bo', label: 'Tibetan' },
  { value: 'br', label: 'Breton' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'ca', label: 'Catalan; Valencian' },
  { value: 'ce', label: 'Chechen' },
  { value: 'ch', label: 'Chamorro' },
  { value: 'co', label: 'Corsican' },
  { value: 'cr', label: 'Cree' },
  { value: 'cs', label: 'Czech' },
  {
    value: 'cu',
    label:
      'Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic',
  },
  { value: 'cv', label: 'Chuvash' },
  { value: 'cy', label: 'Welsh' },
  { value: 'da', label: 'Danish' },
  { value: 'de', label: 'German' },
  { value: 'dv', label: 'Divehi; Dhivehi; Maldivian' },
  { value: 'dz', label: 'Dzongkha' },
  { value: 'ee', label: 'Ewe' },
  { value: 'el', label: 'Greek, Modern (1453-)' },
  { value: 'en', label: 'English' },
  { value: 'eo', label: 'Esperanto' },
  { value: 'es', label: 'Spanish; Castilian' },
  { value: 'et', label: 'Estonian' },
  { value: 'eu', label: 'Basque' },
  { value: 'fa', label: 'Persian' },
  { value: 'ff', label: 'Fulah' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fj', label: 'Fijian' },
  { value: 'fo', label: 'Faroese' },
  { value: 'fr', label: 'French' },
  { value: 'fy', label: 'Western Frisian' },
  { value: 'ga', label: 'Irish' },
  { value: 'gd', label: 'Gaelic; Scomttish Gaelic' },
  { value: 'gl', label: 'Galician' },
  { value: 'gn', label: 'Guarani' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'gv', label: 'Manx' },
  { value: 'ha', label: 'Hausa' },
  { value: 'he', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ho', label: 'Hiri Motu' },
  { value: 'hr', label: 'Croatian' },
  { value: 'ht', label: 'Haitian; Haitian Creole' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'hy', label: 'Armenian' },
  { value: 'hz', label: 'Herero' },
  {
    value: 'ia',
    label: 'Interlingua (International Auxiliary Language Association)',
  },
  { value: 'id', label: 'Indonesian' },
  { value: 'ie', label: 'Interlingue; Occidental' },
  { value: 'ig', label: 'Igbo' },
  { value: 'ii', label: 'Sichuan Yi; Nuosu' },
  { value: 'ik', label: 'Inupiaq' },
  { value: 'io', label: 'Ido' },
  { value: 'is', label: 'Icelandic' },
  { value: 'it', label: 'Italian' },
  { value: 'iu', label: 'Inuktitut' },
  { value: 'ja', label: 'Japanese' },
  { value: 'jv', label: 'Javanese' },
  { value: 'ka', label: 'Georgian' },
  { value: 'kg', label: 'Kongo' },
  { value: 'ki', label: 'Kikuyu; Gikuyu' },
  { value: 'kj', label: 'Kuanyama; Kwanyama' },
  { value: 'kk', label: 'Kazakh' },
  { value: 'kl', label: 'Kalaallisut; Greenlandic' },
  { value: 'km', label: 'Central Khmer' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ko', label: 'Korean' },
  { value: 'kr', label: 'Kanuri' },
  { value: 'ks', label: 'Kashmiri' },
  { value: 'ku', label: 'Kurdish' },
  { value: 'kv', label: 'Komi' },
  { value: 'kw', label: 'Cornish' },
  { value: 'ky', label: 'Kirghiz; Kyrgyz' },
  { value: 'la', label: 'Latin' },
  { value: 'lb', label: 'Luxembourgish; Letzeburgesch' },
  { value: 'lg', label: 'Ganda' },
  { value: 'li', label: 'Limburgan; Limburger; Limburgish' },
  { value: 'ln', label: 'Lingala' },
  { value: 'lo', label: 'Lao' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'lu', label: 'Luba-Katanga' },
  { value: 'lv', label: 'Latvian' },
  { value: 'mg', label: 'Malagasy' },
  { value: 'mh', label: 'Marshallese' },
  { value: 'mi', label: 'Maori' },
  { value: 'mk', label: 'Macedonian' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'mn', label: 'Mongolian' },
  { value: 'mr', label: 'Marathi' },
  { value: 'ms', label: 'Malay' },
  { value: 'mt', label: 'Maltese' },
  { value: 'my', label: 'Burmese' },
  { value: 'na', label: 'Nauru' },
  {
    value: 'nb',
    label: 'Bokmål, Norwegian; Norwegian Bokmål',
  },
  { value: 'nd', label: 'Ndebele, North; North Ndebele' },
  { value: 'ne', label: 'Nepali' },
  { value: 'ng', label: 'Ndonga' },
  { value: 'nl', label: 'Dutch; Flemish' },
  { value: 'nn', label: 'Norwegian Nynorsk; Nynorsk, Norwegian' },
  { value: 'no', label: 'Norwegian' },
  { value: 'nr', label: 'Ndebele, South; South Ndebele' },
  { value: 'nv', label: 'Navajo; Navaho' },
  { value: 'ny', label: 'Chichewa; Chewa; Nyanja' },
  { value: 'oc', label: 'Occitan (post 1500)' },
  { value: 'oj', label: 'Ojibwa' },
  { value: 'om', label: 'Oromo' },
  { value: 'or', label: 'Oriya' },
  { value: 'os', label: 'Ossetian; Ossetic' },
  { value: 'pa', label: 'Panjabi; Punjabi' },
  { value: 'pi', label: 'Pali' },
  { value: 'pl', label: 'Polish' },
  { value: 'ps', label: 'Pushto; Pashto' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'qu', label: 'Quechua' },
  { value: 'rm', label: 'Romansh' },
  { value: 'rn', label: 'Rundi' },
  { value: 'ro', label: 'Romanian; Moldavian; Moldovan' },
  { value: 'ru', label: 'Russian' },
  { value: 'rw', label: 'Kinyarwanda' },
  { value: 'sa', label: 'Sanskrit' },
  { value: 'sc', label: 'Sardinian' },
  { value: 'sd', label: 'Sindhi' },
  { value: 'se', label: 'Northern Sami' },
  { value: 'sg', label: 'Sango' },
  { value: 'si', label: 'Sinhala; Sinhalese' },
  { value: 'sk', label: 'Slovak' },
  { value: 'sl', label: 'Slovenian' },
  { value: 'sm', label: 'Samoan' },
  { value: 'sn', label: 'Shona' },
  { value: 'so', label: 'Somali' },
  { value: 'sq', label: 'Albanian' },
  { value: 'sr', label: 'Serbian' },
  { value: 'ss', label: 'Swati' },
  { value: 'st', label: 'Sotho, Southern' },
  { value: 'su', label: 'Sundanese' },
  { value: 'sv', label: 'Swedish' },
  { value: 'sw', label: 'Swahili' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'tg', label: 'Tajik' },
  { value: 'th', label: 'Thai' },
  { value: 'ti', label: 'Tigrinya' },
  { value: 'tk', label: 'Turkmen' },
  { value: 'tl', label: 'Tagalog' },
  { value: 'tn', label: 'Tswana' },
  { value: 'to', label: 'Tonga (Tonga Islands)' },
  { value: 'tr', label: 'Turkish' },
  { value: 'ts', label: 'Tsonga' },
  { value: 'tt', label: 'Tatar' },
  { value: 'tw', label: 'Twi' },
  { value: 'ty', label: 'Tahitian' },
  { value: 'ug', label: 'Uighur; Uyghur' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'ur', label: 'Urdu' },
  { value: 'uz', label: 'Uzbek' },
  { value: 've', label: 'Venda' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'vo', label: 'Volapük' },
  { value: 'wa', label: 'Walloon' },
  { value: 'wo', label: 'Wolof' },
  { value: 'xh', label: 'Xhosa' },
  { value: 'yi', label: 'Yiddish' },
  { value: 'yo', label: 'Yoruba' },
  { value: 'za', label: 'Zhuang; Chuang' },
  { value: 'zh', label: 'Chinese' },
  { value: 'zu', label: 'Zulu' },
];

const ResourceLanguages = ({ languages, setLanguages, header, mode }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(languagesList[0]);

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-col-12">
          <DataTable
            header={header}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={languages}
            dataKey="value"
          >
            <Column header="Language" field="label" />
            <Column header="Language code" field="value" />
            {mode === 'edit' && (
              <Column
                className="p-text-right"
                body={(rowData) => (
                  <Button
                    className="p-button-danger"
                    icon="pi pi-trash"
                    onClick={() => {
                      setLanguages(
                        languages.filter((item) => item.value !== rowData.value)
                      );
                    }}
                  />
                )}
              />
            )}
          </DataTable>
        </div>
      </div>
      {mode === 'edit' && (
        <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
          <div className="p-col-10">
            <Dropdown
              id="language"
              value={language.value}
              placeholder={t('RESOURCE_LANGUAGE')}
              options={languagesList}
              onChange={(e) => {
                setLanguage(
                  languagesList.filter((item) => item.value === e.value)[0]
                );
              }}
            />
          </div>
          <div className="p-col-2 p-text-right">
            <Button
              label={t('COLLECTION_TITLE_ADD')}
              icon="pi pi-plus"
              className="p-button-sm p-component"
              onClick={() => {
                setLanguages(
                  languages
                    .filter((item) => item.value !== language.value)
                    .concat(language)
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceLanguages;

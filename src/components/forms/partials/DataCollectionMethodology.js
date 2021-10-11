/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleTextField from '../../fields/SimpleTextField';
import MultipleTextEntriesTable from '../../tables/MultipleTextEntriesTable';

const DataCollectionMethodology = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [unitsOfAnalysis, setUnitsOfAnalysis] = useState([]);
  const [universe, setUniverse] = useState([]);
  const [frequency, setFrequency] = useState('');
  const [method, setMethod] = useState('');
  const [instrument, setInstrument] = useState('');
  const [samplingProcedure, setSamplingProcedure] = useState('');

  useEffect(() => {
    setter(unitsOfAnalysis, universe, frequency, method, instrument, samplingProcedure);
  }, [unitsOfAnalysis, universe, frequency, method, instrument, samplingProcedure]);

  return (
    <Fieldset
      legend={t('DATA_COLLECTION_METHODOLOGY')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <MultipleTextEntriesTable
        header={t('UNITS_OF_ANALYSIS')}
        help
        helpText="Basic unit of analysis or observation that this Dataset describes, such as individuals, families/households, groups, institutions/organizations, administrative units, and more. For information about the DDI's controlled vocabulary for this element, please refer to the DDI web page at http://www.ddialliance.org/controlled-vocabularies."
        mode={mode}
        data={unitsOfAnalysis}
        onDeleteItem={(e) => {
          setUnitsOfAnalysis(unitsOfAnalysis.filter((u) => u.value !== e.value));
        }}
        onAddItem={(entry) => setUnitsOfAnalysis([...unitsOfAnalysis, { value: entry }])}
        className="p-mb-4"
      />
      <SimpleTextField
        mode={mode}
        title={t('COLLECTION_FREQUENCY')}
        text={frequency}
        setText={setFrequency}
        className="p-mb-4"
        helpText="If the data collected includes more than one point in time, indicate the frequency with which the data was collected; that is, monthly, quarterly, or other."
      />
      <MultipleTextEntriesTable
        header={t('POPULATION_COVERED')}
        help
        helpText="Description of the population covered by the data in the file; the group of people or other elements that are the object of the study and to which the study results refer. Age, nationality, and residence commonly help to  delineate a given universe, but any number of other factors may be used, such as age limits, sex, marital status, race, ethnic group, nationality, income, veteran status, criminal convictions, and more.
        The universe may consist of elements other than persons, such as housing units, court cases, deaths, countries, and so on. In general, it should be possible to tell from the description of the universe whether a given individual or element is a member of the population under study. Also known as the universe of interest, population of interest, and target population."
        mode={mode}
        data={universe}
        onDeleteItem={(e) => setUniverse(universe.filter((u) => u.value !== e.value))}
        onAddItem={(entry) => setUniverse([...universe, { value: entry }])}
        className="p-mb-4"
      />
      <SimpleTextField
        mode={mode}
        title={t('COLLECTION_METHOD')}
        text={method}
        setText={setMethod}
        className="p-mb-4"
        helpText="Method used to collect the data; instrumentation characteristics (e.g., telephone interview, mail questionnaire, or other)."
      />
      <SimpleTextField
        mode={mode}
        title={t('COLLECTION_INSTRUMENT')}
        text={instrument}
        setText={setInstrument}
        className="p-mb-4"
        helpText="Type of data collection instrument used. Structured indicates an instrument in which all respondents are asked the same questions/tests, possibly with precoded answers. If a small portion of such a questionnaire includes open-ended questions, provide appropriate comments. Semi-structured indicates that the research instrument contains mainly open-ended questions. Unstructured indicates that in-depth interviews were conducted."
      />
      <SimpleTextField
        mode={mode}
        title={t('SAMPLING_PROCEDURE')}
        text={samplingProcedure}
        setText={setSamplingProcedure}
        className="p-mb-2"
        helpText="Type of sample and sample design used to select the survey respondents to represent the population. May include reference to the target sample size and the sampling fraction."
      />
    </Fieldset>
  );
};

export default DataCollectionMethodology;

import React from 'react';
import './styles.css';

const About = () => {
	return (
		<div className="about">
			<h2>
				About
			</h2>
			<p>
				FAIRscribe is a free and open-source software that implements a workflow for publishing FAIR research outputs (publications, datasets, and other assets). This workflow has several user-friendly features including working in teams of data managers and researchers, for example.
			</p>
			<p>
				To ease data annotation, the tool suggests standard terms from ontologies and controlled vocabularies automatically mapped to keywords that are auto-extracted from the data.
			</p>
			<p>
				The tool extracts geolocations and place names from data assets and map them to  ontologies.
			</p>
			<p>
				As many research materials include personally-identifiable information (PII) such as names that should not be published to preserve privacy of people surveyed, FAIRscribe auto-checks data assets for the presence of personally-identifiable information and notifies users if any PII is still present in the asset.
			</p>
			<p>
				FAIRScribe enables users to easily choose and add appropriate licenses to their data assets via a short yes/no workflow.
			</p>
			<p>
				Finally, as FAIRscribe is in conformance with <a href="https://www.dublincore.org/specifications/dublin-core/" target="_blank" rel="noopener noreferrer">Dublin Core</a> and <a href="https://github.com/AgriculturalSemantics/cg-core" target="_blank" rel="noopener noreferrer">CG Core</a> schemas, at the end of the data annotation process, the data assets can be submitted to several repository platforms, appropriately interpreting the provided metadata to the schemas supported by each platform.
			</p>
			<p className="footer-text">
				FAIRScribe has been developed by <a href="https://www.scio.systems/" target="_blank" rel="noopener noreferrer">SCiO</a> working with the <a href="https://scalingagronomy.org/" target="_blank" rel="noopener noreferrer">Excellence in Agronomy Initiative</a> of <a href="https://cgiar.org/" target="_blank" rel="noopener noreferrer">CGIAR</a>.
			</p>
		</div>
	);
};

export default About;

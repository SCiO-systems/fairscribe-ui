import React from 'react';
import collaborative from '../../../../assets/loginpage/collaborative.png';
import fairscore from '../../../../assets/loginpage/fairsocre.png';
import goeKey from '../../../../assets/loginpage/geoKey.png';
import license from '../../../../assets/loginpage/license.png';
import pii from '../../../../assets/loginpage/pii.png';
import semAnnot from '../../../../assets/loginpage/semAnnot.png';
import smetadata from '../../../../assets/loginpage/smetadata.png';
import repos from '../../../../assets/loginpage/repos.png';
import laptopdisplay from '../../../../assets/loginpage/laptopdisplay.png';
import './styles.css';

const Home = () => {
	const displayedData = [
		{
			img: collaborative,
			title: 'Collaborative',
			text: 'Work with your specified team of data managers & researchers',
		},
		{
			img: semAnnot,
			title: 'Semantic annotation',
			text: 'Annotate dataset variables using ontologies and controlled vocabularies',
		},
		{
			img: license,
			title: 'License',
			text: 'Easily choose and add appropriate licenses via a short yes/no workflow',
		},
		{
			img: smetadata,
			title: 'Standard metadata',
			text: 'Automatically conform to Dublin Core metadata schema',
		},
		{
			img: goeKey,
			title: 'Geolocation & keywords',
			text: 'Extract country names and keywords from ontologies',
		},
		{
			img: fairscore,
			title: 'FAIR score',
			text: 'Calculate your FAIR score and improve it at any point in the process',
		},
		{
			img: pii,
			title: 'PII',
			text: 'Auto-check data assets for the presence of personally-identifiable information',
		},
		{
			img: repos,
			title: 'Repositories',
			text: 'Submit annotated assets to institutional repositories',
		},
	];

	const renderCards = () => {
		return displayedData.map((item) => {
			return (
				<div className="home-card">
					<img src={item.img} />
					<p className="title">{item.title}</p>
					<p>{item.text}</p>
				</div>
			);
		});
	};

	return (
		<div className="home">
			<div className="upper">
				<h2>
					FAIRscribe: Standardize and publish any digital asset
				</h2>
				<img src={laptopdisplay} />
			</div>
			<div className="down">
				<h3>Main features of FAIRscribe</h3>
				<div className="cards">
					{renderCards()}
				</div>
			</div>
		</div>
	);
};

export default Home;

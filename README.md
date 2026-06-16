Urban Pulse Risk Analytics

Urban Pulse Risk Analytics is a data-driven web application that analyzes and visualizes urban risk across Delhi districts using environmental, demographic, and healthcare indicators.

The platform combines Air Quality Index (AQI), population, population density, literacy rate, and healthcare infrastructure data to generate a composite Urban Pulse Risk Score. The results are presented through an interactive analytics dashboard and GIS-based heat map.

## Features
1.Interactive district-level risk heat map
2.Urban Pulse Risk Score calculation
3.AQI trend analysis
4.District risk ranking
5.KPI dashboard
6.District-level statistics and insights
7.Responsive dark-themed UI

## Technology Stack:
Frontend: Next.js, React, TypeScript
Data Processing: Python, Pandas
Visualization: Recharts
Mapping: Leaflet.js, React-Leaflet
Data Storage: CSV

## Dataset Attributes:
1.District
2.Year
3.Average AQI
4.Population
5.Population Density
6.Literacy Rate
7.Healthcare Facilities
8.Urban Pulse Risk Score

## Risk Categories:
Risk Score   	Category
0 – 20	        Low Risk
21 – 40	        Medium Risk
41 – 60	        High Risk
60+	            Critical Risk

Key Insights:
1.Identifies high-risk urban districts.
2.Visualizes district-level environmental and demographic challenges.
3.Supports data-driven urban planning and decision-making.

## Limitations

1.The project uses historical/static datasets and does not currently support real-time data updates.
2.Risk scores are calculated using predefined weighting and normalization techniques rather than machine learning models.
3.The analysis is limited to selected districts of Delhi and does not represent all administrative regions.
4.Some districts are mapped using approximated relationships due to differences between available datasets and GeoJSON district boundaries.
5.Healthcare infrastructure is represented by facility counts only and does not account for capacity, quality, or service availability.
6.The Urban Pulse Risk Score is intended for comparative analysis and visualization purposes and should not be interpreted as an official government risk index.
7.Data quality and accuracy depend on the reliability of the source datasets used during preprocessing.

## Future Enhancements
1.Real-time AQI integration
2.Machine learning-based risk prediction
3.Multi-city support
4.PDF report generation
5.Forecasting and trend analysis
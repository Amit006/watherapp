import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import iconCodeMapping from '../../WeatherIcon';

/**
 * Render a primary display of the current forecast, including a date time, a weather icon,
 * current temperature, humidity, cloud density and wind
 *
 * @param {object} forecastNow the current forecast
 * @param {string} unit the unit format for figures, only accepting 'metric' for now
 * @param {locale} locale locale for time formating
 */

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const WeatherBanner = ({ forecastNow, unit, locale }) => (
  <div>
    <span>
      {`${moment(forecastNow.p_date).format('dddd MMM Do')}`}
      {/* {forecastNow.p_date} */}
      <br></br>
    </span>
    
    <span> {` ${
        capitalize(forecastNow.desc)
      }`}s</span>
    <BannerContainer>
      <BannerIcon src={iconCodeMapping[forecastNow.icon]} />
      <Temperature>{Math.round(forecastNow.temp * 10) / 10}</Temperature>
      <Unit>
        &deg;
        {unit === 'metric' ? 'C' : 'F'}
      </Unit>
      <div style={{ flex: '1' }} />
      <DetailContainer>
        <InfoText>
          Precipitation:{' '} 
          {forecastNow.clouds}%
        </InfoText>
        <InfoText>
          Humidity:{' '} {forecastNow.humidity}%
        </InfoText>
        <InfoText>
          Wind:{' '}
          
            {forecastNow.wind + " kph " + forecastNow.w_direction}
            {/* {unit === 'metric' ? 'm/s' : 'mph'} */}
          
        </InfoText>
        Pollen Count:{' '}
        
          {forecastNow.pollen_count }
        
        <InfoText>
          </InfoText>
      </DetailContainer>
    </BannerContainer>
  </div>
);

WeatherBanner.defaultProps = {
  unit: 'metric',
  locale: 'zh-tw',
};

WeatherBanner.propTypes = {
  forecastNow: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
    temp_max: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
  }).isRequired,
  unit: PropTypes.string,
  locale: PropTypes.string,
};

export default WeatherBanner;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;

`;

const BannerIcon = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Temperature = styled.div`
  font-size: 3rem;
  margin-left: 0.5rem;
`;

const Unit = styled.div`
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: x-large;
  margin-right: 350px
`;

const InfoText = styled.div`
  text-align: left;
`;

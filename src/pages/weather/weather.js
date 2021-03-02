
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import WeatherBannerTab from './WeatherBannerTab';
import MiniWeatherCard from './MiniWeatherCard';

// const WeatherBannerTab = import("./WeatherBannerTab");
// const MiniWeatherCard = import("./MiniWeatherCard");

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
          margin: theme.spacing(0),
          width: theme.spacing(600),
          height: theme.spacing(60)
        }
    },
    ContentContainer:{
      display: "block",
      margin: "10px 5px",
      'text-align': "left",
      border: "1px solid #dddddd",
      'box-shadow': "3px 3px 3px #aaaaaa",
      padding: "1rem 1rem"
    },
    Next5Container:{
      display: 'flex',
      'flex-direction': 'row',
      'margin-top': '1rem',
      'justify-content': 'space-around'
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));




const  Weather = ({ config, forecast }) =>  {
    const classes = useStyles();

    const [forecastIdx, setForecastIdx] = useState(0);

    if (forecast !== undefined && forecast.length > 0) {
      let firstMomentOfDay;
      let forecastOfDay = [];
      const forecastOfDayList = [];
      /* eslint-disable no-param-reassign */
      forecast.forEach((item, index) => {
        if (firstMomentOfDay === undefined) {
          firstMomentOfDay = moment.unix(item.dt);
          forecast[index].moment = firstMomentOfDay;
          forecastOfDay.push(item);
        } else {
          const currentMoment = moment.unix(item.dt);
          forecast[index].moment = currentMoment;
          if (firstMomentOfDay.isSame(currentMoment, 'day')) {
            forecastOfDay.push(item);
          } else {
            forecastOfDayList.push(forecastOfDay);
            forecastOfDay = [];
            forecastOfDay.push(item);
            firstMomentOfDay = currentMoment;
          }
        }
      });
      /* eslint-enable no-param-reassign */
      const forecastList = forecastOfDayList;
      return (
        <div className={classes.ContentContainer}>
          <WeatherBannerTab
            className=""
            location={config.location}
            forecastOfDay={forecastList[forecastIdx]}
            unit={config.unit}
            locale={config.locale}
            onLocationClick={config.onLocationClick}
          />
          <div className={classes.Next5Container}>
            <MiniWeatherCard
              onClick={() => setForecastIdx(0)}
              forecastList={forecastList[0]}
              isSelected={forecastIdx === 0}
              unit={config.unit}
              locale={config.locale}
            />
            <MiniWeatherCard
              onClick={() => setForecastIdx(1)}
              forecastList={forecastList[1]}
              isSelected={forecastIdx === 1}
              unit={config.unit}
              locale={config.locale}
            />
            <MiniWeatherCard
              onClick={() => setForecastIdx(2)}
              forecastList={forecastList[2]}
              isSelected={forecastIdx === 2}
              unit={config.unit}
              locale={config.locale}
            />
            <MiniWeatherCard
              onClick={() => setForecastIdx(3)}
              forecastList={forecastList[3]}
              isSelected={forecastIdx === 3}
              unit={config.unit}
              locale={config.locale}
            />
            <MiniWeatherCard
              onClick={() => setForecastIdx(4)}
              forecastList={forecastList[4]}
              isSelected={forecastIdx === 4}
              unit={config.unit}
              locale={config.locale}
            />
          </div>
        </div>
      );
    }
  
    return (
      <div>
        <h3>No forecast data available!</h3>
      </div>
    );

}

export default Weather;
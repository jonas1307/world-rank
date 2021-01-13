import Link from 'next/link';
import { KeyboardArrowUpRounded, KeyboardArrowDownRounded } from '@material-ui/icons';
import { useState } from 'react';
import styles from './CountriesTable.module.css';

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
  }

  return countries;
}

const SortArrow = ({direction}) => {
  if (!direction) return <></>;
  if (direction === 'asc') return <KeyboardArrowDownRounded color="inherit" />
  else return <KeyboardArrowUpRounded color="inherit" />
};

const CountriesTable = ({countries}) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        
        <div className={styles.heading_flag}>
          
        </div>

        <button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
          <div>Name</div>
          <div className={styles.heading_arrow}>
            {value === 'name' && <SortArrow direction={direction} />}
          </div>
        </button>

        <button className={styles.heading_population} onClick={() => setValueAndDirection('population')}>
          <div>Population</div>
          <div className={styles.heading_arrow}>
            {value === 'population' && <SortArrow direction={direction} />}
          </div>
        </button>

        <button className={styles.heading_area} onClick={() => setValueAndDirection('area')}>
          <div>Area (km <sup style={{fontSize: ".5rem"}}>2</sup>)</div>
          <div className={styles.heading_arrow}>
            {value === 'area' && <SortArrow direction={direction} />}
          </div>
        </button>

        <button className={styles.heading_gini} onClick={() => setValueAndDirection('gini')}>
          <div>Gini</div>
          <div className={styles.heading_arrow}>
            {value === 'gini' && <SortArrow direction={direction} />}
          </div>
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
          <div className={styles.row}>
            
            <div className={styles.flag}>
              <img src={country.flag} alt={`${country.name} flag`} />
            </div>

            <div className={styles.name}>
              {country.name}
            </div>

            <div className={styles.population}>
              {country.population}
            </div>

            <div className={styles.area}>
              {country.area || 0}
            </div>

            <div className={styles.gini}>
              {country.gini || 0} %
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
};

export default CountriesTable;

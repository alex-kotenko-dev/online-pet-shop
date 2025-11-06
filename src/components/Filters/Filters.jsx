import { useDispatch, useSelector } from 'react-redux';
import { setSort, setPriceFrom, setPriceTo, setDiscounted, resetFilters } from '../../redux/slices/filtersSlice';
import styles from './Filters.module.css';

export const Filters = () => {
  const dispatch = useDispatch();
  const { sort, priceFrom, priceTo, discounted } = useSelector(state => state.filters)

  const handleReset = () => {
    dispatch(resetFilters())
  }

  return (
    <div className={styles.filters}>
      <label>
        Price
        <input 
        type="number" 
        value={priceFrom} 
        onChange={e => dispatch(setPriceFrom(e.target.value))} 
        className={styles.priceFormInput}
        placeholder="from"/>

        <input 
        type="number" 
        value={priceTo} 
        onChange={e => dispatch(setPriceTo(e.target.value))} 
        className={styles.priceFormInput}
        placeholder="to"/>
      </label>

      <label className={styles.discountedLabel}>
        Discounted
        <input 
        type="checkbox" 
        checked={discounted} onChange={e => dispatch(setDiscounted(e.target.checked))} 
        className={styles.discountedInput}/>
      </label>

      <label className={styles.sortLabel}>
        Sort
        <select value={sort} onChange={e => dispatch(setSort(e.target.value))}>
          <option value="">Default</option>
          <option value="high">price: high-Low</option>
          <option value="low">price: low-High</option>
        </select>
      </label>

      <button className={styles.resetButton} onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  )
}
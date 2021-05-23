import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

interface DataInput {
  getData: any;
  loadData: any;
}
export const useLoadData = ({ getData, loadData }: DataInput): any => {
  const dispatch = useDispatch();
  const data = useSelector(getData);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch])

  return data;
}
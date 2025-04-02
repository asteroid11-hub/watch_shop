import React, { useState, useEffect } from 'react';
import CardInfo from '../ui/CardInfo/CardInfo';
import { useParams } from 'react-router';
import axiosinstance from '../../config/axiosInstance';

export default function CardPage() {
  const [watch, setWatch] = useState([]);
  const { id } = useParams();
  console.log(id, 'id');
  

  useEffect(() => {
    axiosinstance.get(`/watch/1`).then((res) => {
      setWatch(res.data);
    });
  }, []);

  return <CardInfo watch={watch}/>;
}

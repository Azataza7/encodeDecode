'use client';

import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import axiosApi from '../axiosApi';
import {useMutation} from '@tanstack/react-query';
import {textPost, textRes} from '../../types';

export default function Home() {
  const [encodedMessage, setEncodedMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');
  const [password, setPassword] = useState('');

  const encodeMutation = useMutation<textRes, Error, textPost>({
    mutationFn: async (data: textPost) => {
      const response = await axiosApi.post('/encode', data);
      return response.data;
    },
    onSuccess: (data: textRes) => {
      setDecodedMessage(data.encoded);
    },
    onError: (error) => {
      console.error('Error encoding: ', error);
    },
  });

  const decodeMutation = useMutation<textRes, Error, textPost>({
    mutationFn: async (data: textPost) => {
      const response = await axiosApi.post('/decode', data);
      return response.data;
    },
    onSuccess: (data: textRes) => {
      setEncodedMessage(data.decoded);
    },
    onError: (error) => {
      console.error('Error decoding:', error);
    },
  });

  const handleEncode = async () => {
    try {
      await encodeMutation.mutateAsync({message: encodedMessage, password});
      setEncodedMessage('');
    } catch (error) {
      console.error('Error encoding:', error);
    }
  };

  const handleDecode = async () => {
    try {
      await decodeMutation.mutateAsync({message: decodedMessage, password});
      setDecodedMessage('');
    } catch (error) {
      console.error('Error decoding:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Encoded message"
        multiline
        rows={4}
        value={encodedMessage}
        onChange={(e) => setEncodedMessage(e.target.value)}

      />
      <TextField
        label="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" onClick={ handleEncode }>
        Encode
      </Button>
      <Button variant="contained" onClick={ handleDecode }>
        Decode
      </Button>
      <TextField
        label="Decoded Message"
        multiline
        rows={4}
        value={decodedMessage}
        onChange={(e) => setDecodedMessage(e.target.value)}
      />
    </div>
  );
}

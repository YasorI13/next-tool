import { MantineColorsTuple, createTheme } from '@mantine/core';
import { sarabun } from './fonts';

const myEgatyellow: MantineColorsTuple = [
    '#fffbe1',
    '#fff6cc',
    '#ffeb9b',
    '#ffe064',
    '#ffd738',
    '#ffd11c',
    '#ffce09',
    '#e3b600',
    '#c9a100',
    '#ae8b00'
  ];

const myEgatblue: MantineColorsTuple = [
    '#edf2fd',
  '#d8e2f4',
  '#acc2eb',
  '#7ea0e4',
  '#5983dd',
  '#4271d9',
  '#3668da',
  '#2a58c1',
  '#224eac',
  '#154399'
  ];

export const theme = createTheme({
    fontFamily: sarabun.style.fontFamily,
    primaryColor: "egat-blue",
    defaultRadius: 'md',
    colors :{
        "egat-blue" : myEgatblue ,
        "yellow" : myEgatyellow
    }
});
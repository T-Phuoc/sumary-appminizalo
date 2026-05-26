import React from 'react';
import { useVisaTest } from '.././context/VisaTestContext';
import StartScreen from '../components/StartScreen';
import UserInfoForm from '../components/UserInfoForm';
import VisaTypeSelect from '../components/VisaTypeSelect';
import CountrySelect from '../components/CountrySelect';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';

function VisaTest() {
  const { step } = useVisaTest();

  switch (step) {
    case 'user_info':
      return <UserInfoForm />;
    case 'visa_type':
      return <VisaTypeSelect />;
    case 'country':
      return <CountrySelect />;
    case 'quiz':
      return <QuizScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <StartScreen />;
  }
}

export default VisaTest;

import React, { createContext, useContext, useState } from 'react';

const VisaTestContext = createContext();

export function VisaTestProvider({ children }) {
  const [step, setStep] = useState('start');
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  // Zalo SDK data (persists across navigation)
  const [zaloData, setZaloData] = useState({ name: '', phone: '', avatar: '', id: '', fetched: false });

  const setAnswer = (index, points) => {
    setAnswers(prev => ({ ...prev, [index]: points }));
  };

  const resetAll = () => {
    setStep('start');
    setUserInfo(null);
    setSelectedCountry('');
    setSelectedVisaType(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setZaloData({ name: '', phone: '', avatar: '', id: '', fetched: false });
  };

  return (
    <VisaTestContext.Provider
      value={{
        step,
        setStep,
        userInfo,
        setUserInfo,
        selectedCountry,
        setSelectedCountry,
        selectedVisaType,
        setSelectedVisaType,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswer,
        setAnswers,
        result,
        setResult,
        resetAll,
        zaloData,
        setZaloData,
      }}
    >
      {children}
    </VisaTestContext.Provider>
  );
}

export function useVisaTest() {
  const context = useContext(VisaTestContext);
  if (!context) {
    throw new Error('useVisaTest must be used within a VisaTestProvider');
  }
  return context;
}

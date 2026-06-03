import React, { useMemo, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import "react/jsx-runtime";

import { useQuizLogic } from "../hooks/useQuizLogic";
import WelcomeScreen from "../components/WelcomeScreen";
import ProductSelectionScreen from "../components/ProductSelectionScreen";
import FormScreen from "../components/FormScreen";
import CharacterScreen from "../components/CharacterScreen";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import { NumerologyDemo } from "../components/numerology";
import { fetchZaloUserName } from "../components/numerology/api";
import { NumerologyFormValues } from "../components/numerology/types";
import { globalFormMemory } from "../hooks/useFormState";

function HomePagecareer() {
  const navigate = useNavigate();
  const quizState = useQuizLogic();
  const [fetchedPhone, setFetchedPhone] = useState("");
  const [activeProduct, setActiveProduct] = useState<"hub" | "future-map" | "numerology">("hub");
  const [isNumerologyOpen, setIsNumerologyOpen] = useState(false);
  const [numerologyPrefill, setNumerologyPrefill] = useState<Partial<NumerologyFormValues>>({});

  const storedSurveyData = useMemo(() => {
    try {
      const raw = localStorage.getItem("global_citizen_user_v1");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const futureMapApplicantData = useMemo(
    () => ({
      fullname:
        storedSurveyData?.fullName ||
        storedSurveyData?.fullname ||
        globalFormMemory["q1_name"] ||
        "",
      phone:
        storedSurveyData?.phoneNumber ||
        storedSurveyData?.phone ||
        storedSurveyData?.phone_number ||
        globalFormMemory["user_phone"] ||
        fetchedPhone ||
        "",
      email:
        storedSurveyData?.userEmail ||
        storedSurveyData?.email ||
        globalFormMemory["q1_email"] ||
        "",
      agree:
        typeof storedSurveyData?.phoneConsent === "boolean"
          ? storedSurveyData.phoneConsent
          : Boolean(globalFormMemory["q1_agreed"]),
    }),
    [storedSurveyData, fetchedPhone],
  );

  const handleOpenNumerology = async () => {
    try {
      const accessToken = await getAccessToken({});
      const { token } = await getPhoneNumber({});
      const [phoneResponse, fullName] = await Promise.all([
        fetch("https://survey-api.hto.edu.vn/get-phone-new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
            code: token,
          }),
        }),
        fetchZaloUserName(accessToken).catch(() => ""),
      ]);

      const phoneData = await phoneResponse.json();
      const phone =
        phoneData?.data?.number ||
        phoneData?.phoneNumber ||
        phoneData?.data?.phone_number ||
        phoneData?.number ||
        "";

      console.log("[Numerology] get-phone-new response", phoneData);

      setNumerologyPrefill((current) => ({
        ...current,
        fullName: fullName || current.fullName || "",
        phone: phone || current.phone || "",
      }));
    } catch (error) {
      const zaloError = error as { code?: number; message?: string };

      console.error("[Numerology] Khong lay duoc so dien thoai tu Zalo.", {
        code: zaloError?.code,
        message: zaloError?.message,
        error,
      });
    }

    setIsNumerologyOpen(true);
    setActiveProduct("numerology");
  };

  return (
    <Page className="font-['Montserrat'] text-white bg-[#0a1930]">
      <div className="relative w-full max-w-md min-h-screen mx-auto">
        {activeProduct === "hub" ? (
          <ProductSelectionScreen
            onBackToExplore={() => navigate("/more")}
            onOpenFutureMap={() => setActiveProduct("future-map")}
            onOpenNumerology={handleOpenNumerology}
          />
        ) : isNumerologyOpen ? (
          <NumerologyDemo
            initialValues={numerologyPrefill}
            onExit={() => {
              setIsNumerologyOpen(false);
              setActiveProduct("hub");
            }}
          />
        ) : activeProduct === "future-map" && quizState.currentScreen === "welcome" && (
          <WelcomeScreen 
            onStart={(phone) => {
              setFetchedPhone(phone || "");
              quizState.navigate("form");
            }}
            onBack={() => setActiveProduct("hub")}
          />
        )}

        {activeProduct === "future-map" && !isNumerologyOpen && quizState.currentScreen === "form" && (
          <FormScreen
            initialPhone={fetchedPhone}
            initialData={futureMapApplicantData}
            onSubmit={quizState.saveUserData}
            onBack={() => quizState.navigate("welcome")}
          />
        )}

        {activeProduct === "future-map" && !isNumerologyOpen && quizState.currentScreen === "char" && (
          <CharacterScreen
            onSelect={quizState.selectCharacter}
            selectedChar={quizState.character}
            onStart={() => quizState.navigate("game")}
          />
        )}

        {activeProduct === "future-map" && !isNumerologyOpen && quizState.currentScreen === "game" && (
          <Quiz
            character={quizState.character}
            currentQIndex={quizState.currentQIndex}
            questions={quizState.questions}
            exp={quizState.totalExp}
            stats={quizState.stats}
            maxStat={quizState.maxStat}
            onAnswer={quizState.answerQuestion}
            onNext={quizState.nextQuestion}
          />
        )}

        {activeProduct === "future-map" && !isNumerologyOpen && quizState.currentScreen === "result" && (
          <Result
            stats={quizState.stats}
            maxStat={quizState.maxStat}
            exp={quizState.totalExp}
            onReplay={quizState.resetGame}
          />
        )}
      </div>
    </Page>
  );
}

export default HomePagecareer;
